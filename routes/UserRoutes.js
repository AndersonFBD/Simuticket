const Express = require("express");
const router = Express.Router();

const uController = require("../controllers/UserController");

router.get("/", uController.getUser);
router.post("/", uController.createUser);

module.exports = router;
