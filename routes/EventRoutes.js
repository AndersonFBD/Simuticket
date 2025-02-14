const Express = require("express");
const router = Express.Router();
const { verifyCredentials } = require("../middleware/verifyCredentials");
const eController = require("../controllers/EventController");
const eModel = require("../models/EventModel");

router.get("/", eController.listEvents);
router.get("/addEvent", verifyCredentials, (req, res) => {
  res.render("addEvent", { new: true });
});
router.post("/addEvent", verifyCredentials, eController.createEvent);
router.get("/:id", verifyCredentials, eController.getEvent);

router.get("/edit/:id", verifyCredentials, async (req, res) => {
  const data = await eModel.getEventById(req.params.id);
  if (req.admin)
    res.render("addEvent", { id: req.params.id, edit: true, data: data });
  else
    return res
      .status(403)
      .render("error", { code: 403, message: "acesso negado" });
});
router.post("/edit/:id", verifyCredentials, eController.updateEvent);

router.post("/delete/:id", verifyCredentials, eController.deleteEvent);

module.exports = router;
