const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasks.controller");
const protectRoute = require("../middleware/protectRoute");
const { uploadPdf } = require("../middleware/uploadMiddleware");

router.post("/", protectRoute, tasksController.createTask);

router.get("/", tasksController.getTasks);
router.get("/owner/:id", tasksController.getTasksByOwner);
router.get("/:id", tasksController.getTaskById);

router.post(
  "/:id/analyzecv",
  uploadPdf.single("cv"),
  tasksController.analyzeCv
);

router.post(
  "/:id/apply",
  protectRoute,
  uploadPdf.single("cv"),
  tasksController.applyToTask
);

router.post(
  "/:id/accept",
  tasksController.acceptApplication
);

module.exports = router;
