const { Op } = require("sequelize");
const db = require("../models");

/**
 * Check if a user has an active premium subscription
 * @param {number} userId - User ID to check
 * @returns {Promise<boolean>} - true if user is premium, false otherwise
 */
const checkPremiumStatus = async (userId) => {
  try {
    const subscription = await db.Subscriptions.findOne({
      where: {
        userId,
        status: "active",
        tier: {
          [Op.in]: ["premium", "vip"],
        },
        endDate: {
          [Op.or]: [{ [Op.gte]: new Date() }, { [Op.is]: null }],
        },
      },
      order: [["updatedAt", "DESC"]],
    });

    return !!subscription;
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
