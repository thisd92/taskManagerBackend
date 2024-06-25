const router = require("./routes");
const { authenticate } = require("../services/authService");
const squadController = require("../controllers/squadController");

router.get("/squad", authenticate, squadController.findSquad);

router.get("/squads", authenticate, squadController.findAllSquad);

router.post("/squad", authenticate, squadController.save);

router.put("/squad/:id", authenticate, squadController.update);

router.delete("/squad/:id", authenticate, squadController.delete);

router.get("/squad/:id", authenticate, squadController.findSquadById);

module.exports = router;
