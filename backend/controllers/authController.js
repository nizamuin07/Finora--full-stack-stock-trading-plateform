const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/UserModel");

const signup = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ message: "All fields are required." });
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
      $or: [{ email: normalizedEmail }, { mobile }]
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

    return res.status(201).json({
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

    return res.status(500).json({
      message: "Server error during registration."
    });
  }
};

const login = async (req, res) => {
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

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
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
    return res.status(500).json({
      message: "Server error during login."
    });
  }
};

module.exports = { login, signup };
