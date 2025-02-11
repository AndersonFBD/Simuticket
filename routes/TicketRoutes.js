const Express = require("express");
const router = Express.Router();
const { verifyCredentials } = require("../middleware/verifyCredentials");
const TControl = require("../controllers/TicketController");
const ttModel = require("../models/TicketTypeModel");

router.get("/byUser/:userID", verifyCredentials, TControl.getAllFromUser);
router.get("/byEvent/:eventID", TControl.getAllFromEvent);
router.get("/:id", verifyCredentials, TControl.getTicket);

router.get("/purchase/:typeId", verifyCredentials, async (req, res) => {
  const data = await ttModel.getTypeByid(req.params.typeId);
  return res.render("addTicket", {
    type: req.params.typeId,
    max: data.vacancies,
  });
});
router.post("/purchase/:typeId", verifyCredentials, TControl.addTicket);

router.put("/:id", verifyCredentials, TControl.editTicket);
router.delete("/:id", verifyCredentials, TControl.deleteTicket);

module.exports = router;
