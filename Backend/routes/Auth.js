const router = require("express").Router();
const {
  login,
  signup,
  deleteUser,
  getUser,
  updateUser,
  logout,
  
} = require("../controller/Auth");
router.route("/login").post(login);
router.route("/signup").post(signup);
router.route("/getuser").post(getUser);
router.route("/deleteuser").delete(deleteUser);
router.route("/updateuser").put(updateUser);
router.route("/logout").post(logout);
module.exports = router;
