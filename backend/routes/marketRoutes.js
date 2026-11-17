const express = require("express");
const { getHistory, getQuotes } = require("../controllers/marketController");

const router = express.Router();

router.get("/quotes", getQuotes);
router.get("/history/:symbol", getHistory);

module.exports = router;
