const mongoose = require("mongoose");

module.exports = (req, res, next) => {
  mongoose.connect("mongodb://localhost:27017/test").catch((err) => {
    console.log(`Houve um erro ao conectar ao banco: ${err.message}`);
  });
  return next();
};
