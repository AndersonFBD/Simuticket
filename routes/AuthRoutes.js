const Express = require("express");
const router = Express.Router();

const aController = require("../controllers/AuthController");

router.get("/login", (req, res) => {
  res.render("login");
});
router.post("/login", aController.login);
router.post("/logout", aController.logout);

module.exports = router;
