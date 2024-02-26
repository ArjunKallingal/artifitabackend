const userShema = require("../model/userShema");
const { comparePassword, hashPassword } = require("../utils");

exports.userSignIn = async (req, res) => {
  try {
    const isUserExist = await userShema.findOne({ name: req.query.name });
    if (isUserExist) {
      if (await comparePassword(req.query.password, isUserExist.password)) {
        res
          .status(200)
          .json({ message: "User loggined succesfully",data: isUserExist, status: true });
      } else res.status(500).json("Invalid password");
    } else {
      res.status(500).json({ message: "Invalid user", status: false });
    }
  } catch (error) {
    res.status(error.status || 500).json({ message: error, status: false });
  }
};

exports.userSignUp = async (req, res) => {
  try {
    const isUserExist = await userShema.findOne({ name: req.body.name });
    if (!isUserExist) {
      console.log(req.body);
      hashPassword(req.body.password).then((data) => {
        req.body.password = data;
        userShema
          .create(req.body)
          .then((data) => {
            res
              .status(200)
              .json({ message: "User Signed succesfully", status: true });
          })
          .catch((err) => {
            res.status(err.status || 500).json({ message: err, status: false });
          });
      });
    } else {
      res.status(500).json({ message: "User already signed", status: false });
    }
  } catch (error) {
    res.status(error.status || 500).json({ message: error, status: false });
  }
};

