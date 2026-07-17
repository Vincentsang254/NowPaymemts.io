const express = require("express");
const matchingController = require("../controllers/matchingController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Like a user
router.post("/like", matchingController.likeUser);

// Unlike a user
router.post("/unlike", matchingController.unlikeUser);

// Get users this user liked
router.get("/likes", matchingController.getUserLikes);

// Get likes received from other users
router.get("/likes-received", matchingController.getLikesReceived);

// Get user's matches
router.get("/matches", matchingController.getUserMatches);

// Discover users to like
router.get("/discover", matchingController.discoverUsers);

// Check if matched with a specific user
router.get("/check-match/:userId", matchingController.checkMatch);

module.exports = router;
