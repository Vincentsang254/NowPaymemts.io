const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/paymentController");
const { verifyToken } = require("../middlewares/authMiddleware");
const verifyNowPaymentsWebhook = require("../middlewares/verifyNowPaymentsWebhook");

/*
|--------------------------------------------------------------------------
| Create Crypto Payment
|--------------------------------------------------------------------------
| Creates a new NOWPayments payment and stores it in the database.
| Requires authentication.
*/
router.post(
  "/nowpayments/create",
  verifyToken,
  paymentController.createNowPayment
);

/*
|--------------------------------------------------------------------------
| List Subscription Plans
|--------------------------------------------------------------------------
| Returns the available premium subscription plans.
*/
router.get("/plans", verifyToken, paymentController.listSubscriptionPlans);

/*
|--------------------------------------------------------------------------
| Get User Subscription Status
|--------------------------------------------------------------------------
| Returns the current subscription status for the authenticated user.
*/
router.get(
  "/subscription/status",
  verifyToken,
  paymentController.getUserSubscription
);

/*
|--------------------------------------------------------------------------
| Activate Subscription
|--------------------------------------------------------------------------
| Creates or updates the authenticated user's premium subscription.
*/
router.post(
  "/subscription/activate",
  verifyToken,
  paymentController.activateSubscription
);

/*
|--------------------------------------------------------------------------
| Cancel Subscription
|--------------------------------------------------------------------------
| Cancels the authenticated user's active subscription.
*/
router.post(
  "/subscription/cancel",
  verifyToken,
  paymentController.cancelSubscription
);

/*
|--------------------------------------------------------------------------
| Get Payment Status
|--------------------------------------------------------------------------
| Returns the current payment status from your database.
*/
router.get(
  "/nowpayments/:paymentId/status",
  verifyToken,
  paymentController.getNowPaymentStatus
);

/*
|--------------------------------------------------------------------------
| Verify Payment Manually
|--------------------------------------------------------------------------
| Queries NOWPayments API for the latest payment status.
*/
router.get(
  "/nowpayments/:paymentId/verify",
  verifyToken,
  paymentController.verifyNowPayment
);

/*
|--------------------------------------------------------------------------
| Webhook
|--------------------------------------------------------------------------
| Receives payment updates from NOWPayments.
| No authentication required.
| Protected using webhook signature verification.
*/
router.post(
  "/nowpayments/webhook",
  verifyNowPaymentsWebhook,
  paymentController.nowPaymentsWebhook
);

module.exports = router;
