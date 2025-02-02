const uModel = require("../models/UserModel");

exports.createUser = async (req, res) => {
  const createdUser = {
    username: req.body.username,
    password: req.body.password,
    admin: false,
  };
  const existingUser = await uModel.getUserbyName(createdUser.username);
  if (existingUser.length > 0) {
    console.log(existingUser);
    return res.status(409).json({ message: "Este usuario já existe" });
  }
  try {
    console.log(req.body);

    let user = await uModel.save(
      createdUser.username,
      createdUser.password,
      createdUser.admin
    );
    return res.status(201).json({ message: "usuario cadastrado", user: user });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "erro ao cadastrar usuario", error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    user = await uModel.getUserbyName(req.body.username);
    console.log(user);
    if (!user)
      return res.status(404).json({ message: "usuario não encontrado" });

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "erro com a busca do usuario", error: error.message });
  }
};
