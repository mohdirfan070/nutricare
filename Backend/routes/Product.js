const router = require("express").Router();
const {
  fetchUserSavedProducts,
  deleteProduct,
  saveProduct
} = require("../controller/Product.js");

// Delete a product by ID
router.route("/savedproducts").post(fetchUserSavedProducts);

router.route("/saveproduct").post(saveProduct);

router.route("/deletesavedproduct").delete(deleteProduct);

module.exports = router;
