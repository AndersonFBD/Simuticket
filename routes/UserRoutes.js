const Express = require("express");
const router = Express.Router();
const { verifyCredentials } = require("../middleware/verifyCredentials");
const uController = require("../controllers/UserController");

router.get("/", uController.getUser);
router.get("/create", (req, res) => {
  res.render("newUser", { admAccess: false });
});

router.post("/create", uController.createUser);

router.get("/addAdmin", verifyCredentials, (req, res) => {
  if (req.admin) {
    return res.render("newUser", { admAccess: true });
  } else {
    return res.status(403).render("error", {
      code: 403,
      message: "requer privilégios administrativos",
    });
  }
});

module.exports = router;
