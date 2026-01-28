const router = require("express").Router();
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
} = require("../controller/Product.js");

// Create a new product
router.route("/createproduct").post(createProduct);

//Get all products
router.route("/all").get(getProducts);

// Get a single product by ID
router.route("/barcodenumber").get(getProduct);

// Update a product by ID
router.route("/:barcodenumber").put(updateProduct);

// Delete a product by ID
router.route("/:barcodenumber").delete(deleteProduct);

module.exports = router;
