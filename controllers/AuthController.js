const uModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const savedUser = await uModel.locateUser(username, password);

  if (!savedUser) {
    return res.status(400).json({ message: "credenciais incorretas" });
  }

  try {
    const payload = {
      id: savedUser._id,
      name: savedUser.username,
      admin: savedUser.admin,
    };
    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    console.log(token);

    res.cookie("session", token);

    return res.status(200).json({ message: "login bem sucedido" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "erro na autenticação", error: error.message });
  }
};

//destrói o cookie que contém o token, invalidando o acesso à qualquer página
// que requeira o token para poder acessar
exports.logout = async (req, res) => {
  try {
    await res.clearCookie("session");
    return res.status(200).json({ message: "deslogado com sucesso" });
  } catch (error) {
    return res.status(500).json({
      message: "houve um erro no encerramento da sessão",
      error: error.message,
    });
  }
};
