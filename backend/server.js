require("dotenv").config();

const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 3002;

const startServer = async () => {
  if (!process.env.MONGO_URL) {
    console.error("MONGO_URL is missing in .env file.");
    process.exitCode = 1;
    return;
  }

  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is missing in .env file.");
    process.exitCode = 1;
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected Successfully");
    app.listen(PORT, () => {
      console.log(`FINORA Server Started on Port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exitCode = 1;
  }
};

void startServer();

module.exports = { startServer };
