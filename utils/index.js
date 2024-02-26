const bcrypt = require("bcrypt");

exports.comparePassword = (userPassword, dbPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(userPassword, dbPassword, (error, result) => {
      if (error) {
        reject(false);
      } else {
        resolve(true);
      }
    });
  });
};

exports.hashPassword = async (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
};
