const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { Users } = require("../models");
const generateAuthToken = require("../utils/generateAuthToken");

const generateVerificationCode = () => Math.floor(100000 + Math.random() * 900000).toString();
const generatePasswordResetToken = () => crypto.randomBytes(32).toString("hex");

const register = async (req, res) => {
  try {
    const { name, email, phoneNumber, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required.",
        data: null,
      });
    }

    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "A user with that email already exists.",
        data: null,
      });
    }

    const verificationCode = generateVerificationCode();

    const user = await Users.create({
      name,
      email,
      phoneNumber,
      password,
      userType: "customer",
      verified: false,
      verificationCode,
    });

    const token = generateAuthToken(user);

    return res.status(201).json({
      success: true,
      message: "Operation completed successfully.",
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          userType: user.userType,
          verified: user.verified,
        },
        token,
        verificationCode,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Operation failed.",
      data: null,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
        data: null,
      });
    }

    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
        data: null,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password.",
        data: null,
      });
    }

    const token = generateAuthToken(user);

    return res.status(200).json({
      success: true,
      message: "Operation completed successfully.",
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          userType: user.userType,
        },
        token,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Operation failed.",
      data: null,
    });
  }
};

const loadUser = async (req, res) => {
  try {
    const user = await Users.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Operation completed successfully.",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Operation failed.",
      data: null,
    });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({
        success: false,
        message: "Email and verification code are required.",
        data: null,
      });
    }

    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
        data: null,
      });
    }

    if (user.verified) {
      return res.status(200).json({
        success: true,
        message: "Email already verified.",
        data: null,
      });
    }

    if (user.verificationCode !== code) {
      return res.status(400).json({
        success: false,
        message: "Invalid verification code.",
        data: null,
      });
    }

    user.verified = true;
    user.verificationCode = null;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully.",
      data: null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Operation failed.",
      data: null,
    });
  }
};

const resendVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
        data: null,
      });
    }

    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
        data: null,
      });
    }

    if (user.verified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified.",
        data: null,
      });
    }

    user.verificationCode = generateVerificationCode();
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Verification code resent successfully.",
      data: { verificationCode: user.verificationCode },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Operation failed.",
      data: null,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
        data: null,
      });
    }

    const user = await Users.findOne({ where: { email } });
    const passwordResetToken = generatePasswordResetToken();
    const expires = new Date(Date.now() + 60 * 60 * 1000);

    if (user) {
      user.passwordResetToken = passwordResetToken;
      user.passwordResetExpires = expires;
      await user.save();
    }

    return res.status(200).json({
      success: true,
      message: "If that email is registered, a password reset token has been generated.",
      data: { passwordResetToken: user ? passwordResetToken : null },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Operation failed.",
      data: null,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        success: false,
        message: "Token and new password are required.",
        data: null,
      });
    }

    const user = await Users.findOne({ where: { passwordResetToken: token } });
    if (!user || !user.passwordResetExpires || new Date(user.passwordResetExpires) < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired password reset token.",
        data: null,
      });
    }

    user.password = password;
    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    await user.save();

    const authToken = generateAuthToken(user);

    return res.status(200).json({
      success: true,
      message: "Password reset successfully.",
      data: { token: authToken },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Operation failed.",
      data: null,
    });
  }
};

const logout = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Operation completed successfully.",
    data: null,
  });
};

module.exports = {
  register,
  login,
  loadUser,
  logout,
  verifyEmail,
  resendVerificationCode,
  forgotPassword,
  resetPassword,
};
