const express = require("express");
const router = express.Router();
const tasksCtrl = require("../controllers/tasks");
// routes CRUD of tasks
router.get("/", tasksCtrl.getAllTasks);
router.patch("/:id", tasksCtrl.createTask);
router.get("/:id", tasksCtrl.getOneTask);
// router.put("/:id", tasksCtrl.modifyTask);
router.delete("/:id", tasksCtrl.deleteTask);

module.exports = router;
