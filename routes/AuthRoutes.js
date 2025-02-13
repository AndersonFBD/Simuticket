const Express = require("express");
const router = Express.Router();

const aController = require("../controllers/AuthController");
router.post("/login", aController.login);
router.post("/logout", aController.logout);

module.exports = router;
