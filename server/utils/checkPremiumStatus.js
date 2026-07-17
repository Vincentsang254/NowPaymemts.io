const db = require("../models");

/**
 * Check if a user has an active premium subscription
 * @param {number} userId - User ID to check
 * @returns {Promise<boolean>} - true if user is premium, false otherwise
 */
const checkPremiumStatus = async (userId) => {
  try {
    // Check if user has a recent successful payment
    const recentPayment = await db.Payments.findOne({
      where: {
        userId,
        status: "finished", // Only confirmed/finished payments count
      },
      order: [["paidAt", "DESC"]],
    });

    if (!recentPayment) {
      return false;
    }

    // Check if payment is recent (within last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    if (recentPayment.paidAt >= thirtyDaysAgo) {
      return true;
    }

    return false;
  } catch (error) {
    console.error("Error checking premium status:", error);
    return false;
  }
};

/**
 * Check if a user has premium features (supports video/voice calls)
 * @param {number} userId - User ID to check
 * @returns {Promise<object>} - Object with feature permissions
 */
const getPremiumFeatures = async (userId) => {
  try {
    const isPremium = await checkPremiumStatus(userId);

    return {
      isPremium,
      features: {
        textMessages: true, // All users
        voiceMessages: isPremium,
        videoCalls: isPremium,
        voiceCalls: isPremium,
        screenShare: isPremium,
      },
    };
  } catch (error) {
    console.error("Error getting premium features:", error);
    return {
      isPremium: false,
      features: {
        textMessages: true,
        voiceMessages: false,
        videoCalls: false,
        voiceCalls: false,
        screenShare: false,
      },
    };
  }
};

module.exports = {
  checkPremiumStatus,
  getPremiumFeatures,
};
