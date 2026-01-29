const router = require("express").Router();
const {
  login,
  signup,
  deleteUser,
  getUser,
  updateUser,
} = require("../controller/Auth");
router.route("/login").post(login);
router.route("/signup").post(signup);
router.route("/getuser").post(getUser);
router.route("/deleteuser").delete(deleteUser);
router.route("/updateUser").put(updateUser);
module.exports = router;
