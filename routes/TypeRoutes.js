const Express = require("express");
const router = Express.Router();
const { verifyCredentials } = require("../middleware/verifyCredentials");
const ttController = require("../controllers/TicketTypeController");
const ttModel = require("../models/TicketTypeModel");

router.get("/:eventID", verifyCredentials, ttController.listFromEvent);

router.get("/add/:eventID", (req, res) => {
  res.render("addType", { eventID: req.params.eventID, new: true });
});
router.post("/add/:eventID", verifyCredentials, ttController.addType);

router.get("/edit/:id", verifyCredentials, async (req, res) => {
  const data = await ttModel.getTypeByid(req.params.id);
  if (req.admin)
    res.render("addType", { typeID: req.params.id, edit: true, data: data });
  else
    return res
      .status(403)
      .render("error", { code: 403, message: "acesso negado" });
});
router.post("/edit/:id", verifyCredentials, ttController.editType);

module.exports = router;
