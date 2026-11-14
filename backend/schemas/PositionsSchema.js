const { default: mongoose } = require("mongoose");

const PositionSchema=new mongoose.Schema({
  name:String,
  qty:Number,
  avg:Number,
  price:Number,
  net:Number,
  day: String,
  isLoss:Boolean
})
module.exports={PositionSchema};