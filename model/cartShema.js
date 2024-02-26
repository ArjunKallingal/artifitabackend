const mongoose = require("mongoose");

const cartShema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  cart: {
    type: Array,
    required: true,
  },
});
const model = mongoose.model("cart", cartShema);
module.exports = model;