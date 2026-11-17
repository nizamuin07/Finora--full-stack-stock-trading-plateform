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

router.use(authenticateToken);
router.get("/test-holdings", getHoldings);
router.get("/test-orders", getOrders);
router.get("/test-positions", getPositions);
router.get("/test-funds", getFunds);
router.post("/add-funds", addFunds);
router.post("/withdraw-funds", withdrawFunds);

module.exports = router;
