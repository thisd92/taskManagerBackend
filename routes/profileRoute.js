const router = require("./routes");
const { authenticate } = require("../services/authService");
const profileController = require("../controllers/profileController");

router.get("/profile", authenticate, profileController.find);

module.exports = router;
