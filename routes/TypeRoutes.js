const Express = require("express");
const router = Express.Router();
const { verifyCredentials } = require("../middleware/verifyCredentials");
const ttController = require("../controllers/TicketTypeController");

router.get("/add/:eventID", (req, res) => {
  res.render("addType", { eventID: req.params.eventID });
});
router.post("/add/:eventID", verifyCredentials, ttController.addType);

module.exports = router;
