const { FundsModel } = require("../model/FundsModel");
const { HoldingModel } = require("../model/HoldingModel");
const { OrdersModel } = require("../model/OrdersModel");
const { PositionsModel } = require("../model/PositionsModel");

const getHoldings = async (req, res) => {
  try {
    const data = await HoldingModel.find({});
    console.log("Documents Found:", data.length);
    return res.json(data);
  } catch (error) {
    console.error("Holdings Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const data = await OrdersModel.find({});
    console.log("Orders Found:", data.length);
    return res.json(data);
  } catch (error) {
    console.error("Orders Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

const getPositions = async (req, res) => {
  try {
    const data = await PositionsModel.find({});
    console.log("Positions Found:", data.length);
    return res.json(data);
  } catch (error) {
    console.error("Positions Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

const getFunds = async (req, res) => {
  try {
    let funds = await FundsModel.findOne({ userId: req.userId });

    if (!funds) {
      funds = await FundsModel.create({
        userId: req.userId,
        availableBalance: 54250,
        totalDeposited: 54250,
        totalWithdrawn: 0
      });
    }

    return res.json(funds);
  } catch (error) {
    console.error("Get Funds Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

const addFunds = async (req, res) => {
  try {
    const amount = Number(req.body.amount);
    if (!Number.isFinite(amount) || amount <= 0) {
      return res.status(400).json({ message: "Please enter a valid amount." });
    }

    await FundsModel.findOneAndUpdate(
      { userId: req.userId },
      {
        $setOnInsert: {
          availableBalance: 54250,
          totalWithdrawn: 0
        },
        $inc: {
          availableBalance: amount,
          totalDeposited: amount
        }
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    const funds = await FundsModel.findOne({ userId: req.userId });
    return res.json({ message: "Funds added successfully!", funds });
  } catch (error) {
    console.error("Add Funds Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

const withdrawFunds = async (req, res) => {
  try {
    const amount = Number(req.body.amount);
    if (!Number.isFinite(amount) || amount <= 0) {
      return res.status(400).json({ message: "Please enter a valid amount." });
    }

    const funds = await FundsModel.findOneAndUpdate(
      {
        userId: req.userId,
        availableBalance: { $gte: amount }
      },
      {
        $inc: {
          availableBalance: -amount,
          totalWithdrawn: amount
        }
      },
      { new: true }
    );

    if (!funds) {
      return res.status(400).json({
        message: "Insufficient balance or funds account not found."
      });
    }

    return res.json({ message: "Withdrawal successful!", funds });
  } catch (error) {
    console.error("Withdraw Funds Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addFunds,
  getFunds,
  getHoldings,
  getOrders,
  getPositions,
  withdrawFunds
};
