const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.verifyCredentials = async (req, res, next) => {
  try {
    let jwtObject = req.cookies.session;
    try {
      let decoded = jwt.verify(jwtObject, String(process.env.SECRET));
      req.id = decoded.id;
      req.name = decoded.name;
      req.admin = decoded.admin;

      next();
    } catch (error) {
      return res.render("home", {
        name: null,
        id: null,
        admin: false,
        expiry: true,
      });
      // .send({
      //   message: "sua sessão expirou entre novamente",
      //   error: error,
      // });
    }
  } catch (error) {
    return res
      .status(401)
      .send({ error: "sem permissão, efetue login para acessar" });
  }
};
