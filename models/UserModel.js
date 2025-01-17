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
  update: async (id, editedUser) => {
    let foundUser = await UserModel.findById(id);
    if (!foundUser) return false;

    Object.keys(editedUser).forEach(
      (key) => (foundUser[key] = editedUser[key])
    );
    await foundUser.save();
    return foundUser;
  },
  delete: async (id) => {
    return await UserModel.findByIdAndDelete(id);
  },
  getUserbyId: async (id) => {
    return await UserModel.findById(id);
  },
  getUserbyName: async (username) => {
    return await UserModel.findOne({ username: username });
  },
};
