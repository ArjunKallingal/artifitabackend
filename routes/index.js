const express = require("express");
const router = express.Router();
const { userSignIn, userSignUp } = require("../controllers/login");
const {
  addProduct,
  findProducts,
  findProduct,
  editProduct,
  add_to_cart,
  getCartItems,
  removeCartItem,
} = require("../controllers/product");

/* User sign in */
router.route("/sign-in").get(userSignIn);

/* User sign up */
router.route("/sign-up").post(userSignUp);

/* add product */
router.route("/add-product").post(addProduct);

/* edit product */
router.route("/edit-product").post(editProduct);

/* get product */
router.route("/find-product").get(findProduct);

/* get products */
router.route("/find-products").get(findProducts);

/* add cart */
router.route("/add-cart").post(add_to_cart);

/* get cart */
router.route("/get-cart").get(getCartItems);

/* remove cart */
router.route("/remove-cart").put(removeCartItem);

module.exports = router;