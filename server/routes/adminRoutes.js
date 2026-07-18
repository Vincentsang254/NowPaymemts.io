const express = require("express");
const router = express.Router();
const { verifyTokenAndAuthorization } = require("../middlewares/authMiddleware");
const adminController = require("../controllers/adminController");

router.use(verifyTokenAndAuthorization(["admin"]));

router.get("/overview", adminController.getDashboardOverview);
router.get("/users", adminController.getAdminUsers);
router.get("/payments", adminController.getAdminPayments);
router.get("/reports", adminController.getAdminReports);

module.exports = router;
