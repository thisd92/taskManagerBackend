const router = require("./routes");
const { authenticate } = require("../services/authService");
const taskController = require("../controllers/taskController");

router.get("/tasks", authenticate, taskController.findTasksByProject);

router.get("/allTasks", authenticate, taskController.findAllTasks);

router.post("/tasks", authenticate, taskController.save);

router.put("/tasks/:id", authenticate, taskController.update);

router.delete("/tasks/:id", authenticate, taskController.delete);

router.get("/tasks/:id", authenticate, taskController.findTaskById);

module.exports = router;
