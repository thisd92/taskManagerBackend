const router = require("./routes");
const userController = require("../controllers/userController");
const { authenticate } = require("../services/authService");

router.get("/users", authenticate, userController.findUsersForCompany);

router.post("/user", userController.saveUser);

router.get("/user", userController.findAll);

router.get("/user/:id", userController.findUser);

router.put("/user/:id", userController.update);

router.delete("/user/:id", userController.delete);

module.exports = router;
