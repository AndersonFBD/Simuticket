const Express = require("express");
const router = Express.Router();

const TControl = require("../controllers/TicketController");

router.get("/allTickets", TControl.listAll);
router.get("/byUser/:userID", TControl.getAllFromUser);
router.get("/byEvent/:eventID", TControl.getAllFromEvent);
router.get("/:id", TControl.getTicket);
router.post("/", TControl.addTicket);
router.put("/:id", TControl.editTicket);
router.delete("/:id", TControl.deleteTicket);

module.exports = router;
