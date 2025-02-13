const uModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const savedUser = await uModel.locateUser(username, password);
  if (!savedUser) {
    return res
      .status(400)
      .render("error", { code: 400, message: "credenciais inválidas" });
  }

  try {
    const payload = {
      id: savedUser._id,
      name: savedUser.username,
      admin: savedUser.admin,
    };
    const token = jwt.sign(payload, String(process.env.SECRET), {
      expiresIn: String(process.env.EXPIRY),
    });

    res.cookie("session", token, { httpOnly: true });

    return res.status(200).redirect("/");
  } catch (error) {
    console.error(error);
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
    return (
      res
        .status(200)
        // .json({ message: "deslogado com sucesso" })
        .redirect("/")
    );
  } catch (error) {
    return res.status(500).json({
      message: "houve um erro no encerramento da sessão",
      error: error.message,
    });
  }
};
