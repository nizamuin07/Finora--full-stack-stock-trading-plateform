const cors = require("cors");
const express = require("express");
const authRoutes = require("./routes/authRoutes");
const marketRoutes = require("./routes/marketRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});
app.use("/api/auth", authRoutes);
app.use("/api/market", marketRoutes);
app.use("/", portfolioRoutes);

module.exports = app;
