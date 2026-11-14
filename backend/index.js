const { OrdersModel } = require("./model/OrdersModel");
const { PositionsModel } = require("./model/PositionsModel");
const { HoldingModel } = require("./model/HoldingModel");
const { FundsModel } = require("./model/FundsModel");
const { UserModel } = require("./model/UserModel");

require("dotenv").config();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3002;

// ==========================================
// JWT AUTHENTICATION MIDDLEWARE
// ==========================================

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  const token =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

  if (!token) {
    return res.status(401).json({
      message: "Authentication token missing. Please login again."
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.userId;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token. Please login again."
    });
  }
};

// ==========================================
// HOLDINGS API
// ==========================================

app.get("/test-holdings", async (req, res) => {
  try {
    const data = await HoldingModel.find({});

    console.log("Documents Found:", data.length);

    res.json(data);
  } catch (error) {
    console.error("Holdings Error:", error);

    res.status(500).json({
      message: error.message
    });
  }
});

// ==========================================
// ORDERS API
// ==========================================

app.get("/test-orders", async (req, res) => {
  try {
    const data = await OrdersModel.find({});

    console.log("Orders Found:", data.length);

    res.json(data);
  } catch (error) {
    console.error("Orders Error:", error);

    res.status(500).json({
      message: error.message
    });
  }
});

// ==========================================
// POSITIONS API
// ==========================================

app.get("/test-positions", async (req, res) => {
  try {
    const data = await PositionsModel.find({});

    console.log("Positions Found:", data.length);

    res.json(data);
  } catch (error) {
    console.error("Positions Error:", error);

    res.status(500).json({
      message: error.message
    });
  }
});

// ==========================================
// GET USER FUNDS API
// ==========================================

app.get("/test-funds", authenticateToken, async (req, res) => {
  try {
    let funds = await FundsModel.findOne({
      userId: req.userId
    });

    // Create account if it does not exist
    if (!funds) {
      funds = await FundsModel.create({
        userId: req.userId,
        availableBalance: 54250,
        totalDeposited: 54250,
        totalWithdrawn: 0
      });
    }

    res.json(funds);

  } catch (error) {
    console.error("Get Funds Error:", error);

    res.status(500).json({
      message: error.message
    });
  }
});

// ==========================================
// ADD FUNDS API
// ==========================================

app.post("/add-funds", authenticateToken, async (req, res) => {
  try {
    const amount = Number(req.body.amount);

    if (!Number.isFinite(amount) || amount <= 0) {
      return res.status(400).json({
        message: "Please enter a valid amount."
      });
    }

    // Step 1: Find or create user's funds account
    let funds = await FundsModel.findOne({
      userId: req.userId
    });

    if (!funds) {
      funds = await FundsModel.create({
        userId: req.userId,
        availableBalance: 54250,
        totalDeposited: 54250,
        totalWithdrawn: 0
      });
    }

    // Step 2: Update existing funds account
    funds.availableBalance += amount;
    funds.totalDeposited += amount;

    await funds.save();

    res.json({
      message: "Funds added successfully!",
      funds
    });

  } catch (error) {
    console.error("Add Funds Error:", error);

    res.status(500).json({
      message: error.message
    });
  }
});

// ==========================================
// WITHDRAW FUNDS API
// ==========================================

app.post("/withdraw-funds", authenticateToken, async (req, res) => {
  try {
    const amount = Number(req.body.amount);

    if (!Number.isFinite(amount) || amount <= 0) {
      return res.status(400).json({
        message: "Please enter a valid amount."
      });
    }

    const funds = await FundsModel.findOne({
      userId: req.userId
    });

    if (!funds) {
      return res.status(404).json({
        message: "Funds account not found."
      });
    }

    if (amount > funds.availableBalance) {
      return res.status(400).json({
        message: "Insufficient balance."
      });
    }

    funds.availableBalance -= amount;
    funds.totalWithdrawn += amount;

    await funds.save();

    res.json({
      message: "Withdrawal successful!",
      funds
    });

  } catch (error) {
    console.error("Withdraw Funds Error:", error);

    res.status(500).json({
      message: error.message
    });
  }
});

// ==========================================
// USER SIGNUP API
// ==========================================

app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    if (!name || !email || !mobile || !password) {
      return res.status(400).json({
        message: "All fields are required."
      });
    }

    if (!/^\d{10}$/.test(mobile)) {
      return res.status(400).json({
        message: "Enter a valid 10 digit mobile number."
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must contain at least 8 characters."
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await UserModel.findOne({
      $or: [
        { email: normalizedEmail },
        { mobile }
      ]
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Email or mobile number already registered."
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await UserModel.create({
      name: name.trim(),
      email: normalizedEmail,
      mobile,
      password: hashedPassword
    });

    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "Account created successfully!",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        mobile: newUser.mobile
      }
    });

  } catch (error) {
    console.error("Signup Error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        message: "Email or mobile number already exists."
      });
    }

    res.status(500).json({
      message: "Server error during registration."
    });
  }
});

// ==========================================
// USER LOGIN API
// ==========================================

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required."
      });
    }

    const user = await UserModel.findOne({
      email: email.trim().toLowerCase()
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password."
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password."
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful!",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile
      }
    });

  } catch (error) {
    console.error("Login Error:", error);

    res.status(500).json({
      message: "Server error during login."
    });
  }
});

// ==========================================
// DATABASE CONNECTION
// ==========================================

if (!process.env.MONGO_URL) {
  console.error("MONGO_URL is missing in .env file.");
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is missing in .env file.");
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected Successfully");

    app.listen(PORT, () => {
      console.log(`FINORA Server Started on Port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB Connection Error:", error);
  });