const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  admin: Boolean,
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = {
  list: async () => {
    const userList = await UserModel.find({});
    return userList;
  },
  save: async (username, password, admin) => {
    const newUser = new UserModel({
      username: username,
      password: password,
      admin: admin,
    });
    await newUser.save();
    return newUser;
  },
  getUserbyId: async (id) => {
    return await UserModel.findById(id);
  },
  getUserbyName: async (username) => {
    return await UserModel.find({ username: username });
  },
};
