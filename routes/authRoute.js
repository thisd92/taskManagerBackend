const router = require("./routes")
const authController = require("../controllers/authController")

router.post("/signin", authController.signin);

router.get("/forget/:email", authController.forget);

module.exports = router;