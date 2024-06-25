const router = require("./routes");
const { authenticate } = require("../services/authService");
const projectController = require("../controllers/projectController");

router.get("/projects", authenticate, projectController.findProjectsByCompany);

router.post("/projects", authenticate, projectController.save);

router.put("/projects/:id", authenticate, projectController.update);

router.delete("/projects/:id", authenticate, projectController.delete);

router.get("/projects/:id", authenticate, projectController.findProjectById);

module.exports = router;
