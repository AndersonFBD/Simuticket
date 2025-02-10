const uModel = require("../models/UserModel");
exports.AdminInstall = async (req, res, next) => {
  let adminUser = await uModel.getUserbyName("admin");
  if (adminUser.length === 0) {
    uModel.save("admin", "admin123", true);
    console.log("salvo");
  }
  return next();
};
