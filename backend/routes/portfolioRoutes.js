const express = require("express");
const authenticateToken = require("../middleware/authenticateToken");
const {
  addFunds,
  getFunds,
  getHoldings,
  getOrders,
  getPositions,
  withdrawFunds
} = require("../controllers/portfolioController");

const router = express.Router();

router.get("/test-holdings", authenticateToken, getHoldings);
router.get("/test-orders", authenticateToken, getOrders);
router.get("/test-positions", authenticateToken, getPositions);
router.get("/test-funds", authenticateToken, getFunds);
router.post("/add-funds", authenticateToken, addFunds);
router.post("/withdraw-funds", authenticateToken, withdrawFunds);

module.exports = router;
