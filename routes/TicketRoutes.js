const Express = require("express");
const router = Express.Router();
const { verifyCredentials } = require("../middleware/verifyCredentials");

const TControl = require("../controllers/TicketController");

router.get("/allTickets", verifyCredentials, TControl.listAll);
router.get("/byUser/:userID", verifyCredentials, TControl.getAllFromUser);
router.get("/byEvent/:eventID", TControl.getAllFromEvent);
router.get("/:id", verifyCredentials, TControl.getTicket);
router.post("/", verifyCredentials, TControl.addTicket);
router.put("/:id", verifyCredentials, TControl.editTicket);
router.delete("/:id", verifyCredentials, TControl.deleteTicket);

module.exports = router;
