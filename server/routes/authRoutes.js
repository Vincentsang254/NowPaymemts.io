const express = require("express");
const router = express.Router();
const {
  register,
  login,
  loadUser,
  logout,
  verifyEmail,
  resendVerificationCode,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");
const { verifyToken } = require("../middlewares/authMiddleware");

router.post("/register", register);
router.post("/signup", register);
router.post("/login", login);
router.post("/verify-email", verifyEmail);
router.post("/resend-verification", resendVerificationCode);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/me", verifyToken, loadUser);
router.post("/logout", verifyToken, logout);
router.get("/refresh-token", verifyToken, loadUser);

module.exports = router;
