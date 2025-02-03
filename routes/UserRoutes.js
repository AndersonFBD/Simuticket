const Express = require("express");
const router = Express.Router();

const uController = require("../controllers/UserController");

router.get("/", uController.getUser);
router.get("/create", (req, res) => {
  res.render("newUser");
});
router.post("/create", uController.createUser);

module.exports = router;
