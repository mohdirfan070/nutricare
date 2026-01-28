// middleware/auth.js
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET

const authentication = async (req, res, next)=>{
  const token = req.cookies.token; // read from cookie
  if (!token) return res.status(401).json({ message: "No token, authorization denied", user: null });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userToken = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid", user: null });
  }
};

export default authentication;