const { Payments } = require("../models");

const createNowPayment = async (req, res) => {
  try {
    const payment = await Payments.create({
      reference: `payment-${Date.now()}`,
      provider: "NOWPayments",
      paymentType: "Other",
      amount: 0,
      currency: "USD",
      userId: req.user?.id,
      status: "pending",
    });

    return res.status(201).json({
      success: true,
      message: "Operation completed successfully.",
      data: payment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Operation failed.",
      data: null,
    });
  }
};

const getNowPaymentStatus = async (req, res) => {
  try {
    const payment = await Payments.findOne({
      where: { id: req.params.paymentId },
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found.",
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Operation completed successfully.",
      data: payment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Operation failed.",
      data: null,
    });
  }
};

const verifyNowPayment = async (req, res) => {
  try {
    const payment = await Payments.findOne({
      where: { id: req.params.paymentId },
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found.",
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Operation completed successfully.",
      data: payment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Operation failed.",
      data: null,
    });
  }
};

const nowPaymentsWebhook = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Operation completed successfully.",
    data: null,
  });
};

module.exports = {
  createNowPayment,
  getNowPaymentStatus,
  verifyNowPayment,
  nowPaymentsWebhook,
};

