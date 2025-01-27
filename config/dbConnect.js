const mongoose = require("mongoose");

module.exports = async (req, res, next) => {
  await mongoose
    .connect("mongodb://localhost:27017/project2")
    .then(() => {
      console.log("conectou ao banco com sucesso");
    })
    .catch((err) => {
      console.log(`Houve um erro ao conectar ao banco: ${err.message}`);
    });
  return next();
};
