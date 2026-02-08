// controllers/authController.js
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

// =======================
// Signup
// =======================
const signup = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      age,
      gender,
      height,
      weight,
      dietaryPreferences,
      goals,
      language,
      allergens,
    } = req.body;

    console.log({
      name,
      email,
      password,
      age,
      gender,
      height,
      weight,
      dietaryPreferences,
      goals,
      language,
      allergens,
    });
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists", user: null });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      age,
      gender,
      height,
      weight,
      dietaryPreferences,
      goals,
      language,
      allergens,
    });

    // Issue JWT token
    const token = jwt.sign({ id: user._id, name: user.name }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
    });

    return res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: err.message });
  }
};

// =======================
// Login
// =======================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await User.findOne({ email });
    if (!result) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", user: null });
    }

    if (result.password !== password) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", user: null });
    }

    const token = jwt.sign({ id: result._id, name: result.name }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production (https)
      sameSite: "lax",
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        name: result.name,
        email: result.email,
        age: result.age,
        gender: result.gender,
        height: result.height,
        weight: result.weight,
        dietaryPreferences: result.dietaryPreferences,
        goals: result.goals,
        language: result.language,
        allergens: result.allergens,
      },
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: err.message, user: null });
  }
};

//Get user
const getUser = async (req, res) => {
  try {
    // Get token from headers or cookies
    // const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;
    // if (!token) {
    //   return res.status(401).json({ error: "No token provided" });
    // }

    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from DB
    const user = await User.findById(decoded.id).select(
      "-password  -createdAt -updatedAt -__v  -_id",
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// =======================
// Delete User
// =======================
const deleteUser = async (req, res) => {
  try {
    const { email } = req.body;

    // Correct usage: pass a filter object, not just the email string
    const result = await User.findOneAndDelete({ email });

    if (!result) {
      return res.status(400).json({ message: "Email does not exist!" });
    }

    res.cookie("token", null, {
      httpOnly: true,
      secure: false,
    });

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
};

// =======================
// Update User
// =======================
const updateUser = async (req, res) => {
  try {
    // Get token from cookies
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    const userId = decoded.id;

    // Fields allowed to update
    const allowedUpdates = [
      "name",
      "age",
      "gender",
      "height",
      "weight",
      "dietaryPreferences",
      "goals",
      "language",
      "allergens",
    ];

    // Filter only allowed fields
    const updates = {};
    Object.keys(req.body).forEach((key) => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    // Update user
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    }).select("-password -__v -createdAt -updatedAt");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// logoutUser
const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
    secure: false,
    sameSite: "lax",
  });

  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { signup, login, deleteUser, getUser, updateUser, logout };
