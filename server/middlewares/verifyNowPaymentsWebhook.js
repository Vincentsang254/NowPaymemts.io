const crypto = require("crypto");

const verifyNowPaymentsWebhook = (req, res, next) => {
  try {
    const signature = req.headers["x-nowpayments-sig"];

    if (!signature) {
      return res.status(401).json({
        success: false,
        message: "Missing NOWPayments signature.",
      });
    }

    // req.rawBody must contain the exact raw request body
    const rawBody = req.rawBody;

    if (!rawBody) {
      return res.status(500).json({
        success: false,
        message: "Raw body not available.",
      });
    }

    const expectedSignature = crypto
      .createHmac("sha512", process.env.NOWPAYMENTS_IPN_SECRET)
      .update(rawBody)
      .digest("hex");

    const isValid = crypto.timingSafeEqual(
      Buffer.from(signature, "hex"),
      Buffer.from(expectedSignature, "hex")
    );

    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid webhook signature.",
      });
    }

    next();
  } catch (error) {
    console.error("NOWPayments webhook verification error:", error);

    return res.status(500).json({
      success: false,
      message: "Webhook verification failed.",
    });
  }
};

module.exports = verifyNowPaymentsWebhook;
