const Express = require("express");
const router = Express.Router();
const { verifyCredentials } = require("../middleware/verifyCredentials");

const TControl = require("../controllers/TicketController");

router.get("/allTickets", verifyCredentials, TControl.listAll);
router.get("/byUser/:userID", verifyCredentials, TControl.getAllFromUser);
router.get("/byEvent/:eventID", TControl.getAllFromEvent);
router.get("/:id", TControl.getTicket);
router.post("/", TControl.addTicket);
router.put("/:id", TControl.editTicket);
router.delete("/:id", TControl.deleteTicket);

module.exports = router;
