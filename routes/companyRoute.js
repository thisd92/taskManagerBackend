const router = require("../routes/routes");
const companyController = require("../controllers/companyController");

router.post("/company", companyController.create);

router.get("/company", companyController.findAll);

module.exports = router;