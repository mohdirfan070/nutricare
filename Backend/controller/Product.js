const Product = require('../models/Product');

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, brandName, category, nutrition, allergens, attentions, caution, quantity, barcodeNumber } = req.body;

    const product =  new Product({
      name,
      brandName,
      category,
      nutrition,
      allergens,
      attentions,
      caution,
      quantity,
      barcodeNumber,
      image: req.file ? {
        data: req.file.buffer,
        contentType: req.file.mimetype
      } : undefined,
      imageName: req.file ? req.file.originalname : undefined
    });

    await product.save();
    return res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

// Get single product by ID
const getProduct = async (req, res) => {
  try {
    const product = await Product.findOne(req.params.barcodenumber);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const updates = { ...req.body };

    if (req.file) {
      updates.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype
      };
      updates.imageName = req.file.originalname;
    }

    const product = await Product.findOnedAndUpdate(req.params.barcodenumber, updates, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete(req.params.barcodeNumber);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};






module.exports = { createProduct , deleteProduct , getProduct , updateProduct , getProducts};