const Express = require("express");
const router = Express.Router();

const eController = require("../controllers/EventController");

router.get("/", eController.listEvents);
router.post("/", eController.createEvent);
router.get("/:id", eController.getEvent);
router.put("/:id", eController.updateEvent);
router.delete("/", eController.deleteEvent);

module.exports = router;
