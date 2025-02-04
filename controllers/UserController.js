const uModel = require("../models/UserModel");

exports.createUser = async (req, res) => {
  if (req.body.username === "" || req.body.password === "") {
    return res
      .status(401)
      .render("error", { code: 400, message: "preencha todos os campos" });
  }

  const createdUser = {
    username: req.body.username,
    password: req.body.password,
    admin: req.body.admin ? true : false,
  };
  const existingUser = await uModel.getUserbyName(createdUser.username);
  if (existingUser.length > 0) {
    console.log(existingUser);
    return res
      .status(409)
      .render("error", { code: 409, message: "Este usuario já existe" });
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
      .render("error", { code: 500, message: "Erro no cadastro do usuário" });
  }
};

exports.getUser = async (req, res) => {
  try {
    user = await uModel.getUserbyName(req.body.username);
    console.log(user);
    if (!user)
      return res
        .status(404)
        .render("error", { code: 404, message: "Usuario não encontrado" });
    // .json({ message: "usuario não encontrado" });

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .render("error", { code: 500, message: "erro na busca do usuário" });
    // .json({ message: "erro com a busca do usuario", error: error.message });
  }
};
