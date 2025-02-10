const Express = require("express");
const router = Express.Router();
const { verifyCredentials } = require("../middleware/verifyCredentials");
const eController = require("../controllers/EventController");

router.get("/", eController.listEvents);
router.get("/addEvent", verifyCredentials, (req, res) => {
  res.render("addEvent");
});
router.post("/addEvent", verifyCredentials, eController.createEvent);
router.get("/:id", eController.getEvent);
router.put("/:id", verifyCredentials, eController.updateEvent);
router.delete("/", verifyCredentials, eController.deleteEvent);

module.exports = router;
