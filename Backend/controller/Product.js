const Product = require('../models/Product');
const User = require('../models/User');

// fetchUserHistory
const fetchUserSavedProducts = async (req, res) => {
  try {
    const  email  = req.body.email;
    // console.log(email);
    const user = await User.findOne({email});
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // console.log(user);
    res.json({ savedProducts: user.savedProducts });

  } catch (error) {
    console.error('Error fetching saved products:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

//save Product
const saveProduct = async (req, res) => {
  try {
    const { email, barcodeNumber, productName, severityScore, image_url } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent duplicates
    const alreadySaved = user.savedProducts.some(
      (item) => item.barcodeNumber === barcodeNumber
    );
    if (alreadySaved) {
      return res.status(200).json({ message: "Product already saved", status: false });
    }

    // Push product object with severityScore
    user.savedProducts.push({ barcodeNumber, productName, severityScore, image_url });
    await user.save();

    return res.status(200).json({ message: "Product saved successfully", status: true });
  } catch (error) {
    console.error("Error saving product:", error);
    return res.status(500).json({ message: "Error saving product", error: error.message });
  }
};

// delete Saved Product
const deleteProduct = async (req, res) => { try { const { email, barcodeNumber } = req.body; if (!email || !barcodeNumber) { return res.status(400).json({ message: "Missing required fields" }); } const updatedUser = await User.findOneAndUpdate({ email }, { $pull: { savedProducts: { barcodeNumber } } }, { new: true }); if (!updatedUser) { return res.status(404).json({ message: "User not found or product not in list" }); } res.status(200).json({ message: "Product deleted successfully", savedProducts: updatedUser.savedProducts, }); } catch (error) { console.error("Error deleting product:", error); res.status(500).json({ message: "Server error" }); } };


module.exports = {  saveProduct, deleteProduct, fetchUserSavedProducts };