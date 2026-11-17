const path = require("node:path");
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
app.use(express.static(path.resolve(__dirname, "../frontend/dist")));
app.get(/.*/, (req, res, next) => {
  if (req.path === "/api" || req.path.startsWith("/api/")) {
    return res.status(404).json({ message: "API route not found." });
  }

  res.sendFile(
    path.resolve(__dirname, "../frontend/dist/index.html"),
    (error) => {
      if (error) next(error);
    }
  );
});

module.exports = app;
