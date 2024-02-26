const mongoose = require("mongoose");

const productShema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  ram: {
    type: String,
    required: true,
  },
  des: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
});

const model = mongoose.model("product", productShema);
module.exports = model;
