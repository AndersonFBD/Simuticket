const uModel = require("../models/UserModel");
exports.AdminInstall = async (req, res, next) => {
  console.log("passou pelo middleware de admins");
  let adminUser = await uModel.getUserbyName("admin");
  console.log(adminUser);
  if (adminUser.length === 0) {
    uModel.save("admin", "admin123", true);
    console.log("salvo");
  }
  return next();
};
