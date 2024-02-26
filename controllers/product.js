const productShema = require("../model/productShema");
const cartShema = require("../model/cartShema");
const { default: mongoose } = require("mongoose");

exports.addProduct = async (req, res) => {
  try {
    isProductExist = await productShema.findOne({ name: req.body.name });
    if (!isProductExist) {
      await productShema.create(req.body);
      res
        .status(200)
        .json({ message: "Product added succesfully", status: false });
    } else {
      res
        .status(error.status || 500)
        .json({ message: "Product already exist", status: false });
    }
  } catch (error) {
    res.status(error.status || 500).json({ message: error, status: false });
  }
};

exports.findProduct = async (req, res) => {
  try {
    const product = await productShema.findOne({ _id: req.query.id });
    res.status(200).json({ data: product, status: true });
  } catch (error) {
    res.status(error.status || 500).json({ message: error, status: false });
  }
};

exports.editProduct = async (req, res) => {
  try {
    await productShema.updateOne(
      { _id: req.body.id },
      {
        name: req.body.name,
        price: req.body.price,
        ram: req.body.ram,
        des: req.body.des,
        imgUrl: req.body.imgUrl,
      }
    );
    res
      .status(200)
      .json({ message: "Product updated succesfully", status: false });
  } catch (error) {
    res.status(error.status || 500).json({ message: error, status: false });
  }
};

exports.findProducts = async (req, res) => {
  try {
    const products = await productShema.find();
    res.status(200).json({
      message: "Products fetched Succesfully",
      data: products,
      status: true,
    });
  } catch (error) {
    res.status(error.status || 500).json({ message: error, status: false });
  }
};

exports.add_to_cart = async (req, res) => {
  try {
    const isUserCart = await cartShema.findOne({ userId: req.body.userId });
    if (isUserCart) {
      const cart = {
        item: new mongoose.Types.ObjectId(req.body.cart.item),
      };
      await cartShema.updateOne(
        { userId: req.body.userId },
        {
          $push: {
            cart: cart,
          },
        }
      );
    } else {
      const cartData = {
        userId: req.body.userId,
        cart: [{ item: new mongoose.Types.ObjectId(req.body.cart.item) }],
      };
      await cartShema.create(cartData);
    }
    res.status(200).json({
      message: "Products added Succesfully",
      status: true,
    });
  } catch (error) {
    res.status(error.status || 500).json({ message: error, status: false });
  }
};

exports.getCartItems = async (req, res) => {
  try {
    const cart = await cartShema.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(req.query.userId) },
      },
      {
        $unwind: "$cart",
      },
      {
        $project: { item: "$cart.item" },
      },
      {
        $lookup: {
          from: "products",
          localField: "item",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
    ]);
    res.status(200).json({ cart, status: true });
  } catch (error) {
    res.status(error.status || 500).json({ message: error, status: false });
  }
};

exports.removeCartItem = async (req, res) => {
  try {
    const updateCart = await cartShema.updateOne(
      { userId: new mongoose.Types.ObjectId(req.query.userId) },
      {
        $pull: {
          cart: { item: new mongoose.Types.ObjectId(req.query.productId) },
        },
      }
    );
    res.status(200).json({ message: "Updated Succesfully", status: true });
  } catch (error) {
    res.status(error.status || 500).json({ message: error, status: false });
  }
};