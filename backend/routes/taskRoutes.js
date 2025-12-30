const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");

// CREATE TASK
router.post("/", auth, async (req, res) => {
  const task = await Task.create({
    ...req.body,
    assignedTo: req.user
  });
  res.status(201).json(task);
});

// GET TASKS (pagination)
router.get("/", auth, async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = 5;
  const skip = (page - 1) * limit;

  const tasks = await Task.find({ assignedTo: req.user })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  res.json(tasks);
});

// UPDATE TASK
router.put("/:id", auth, async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });
  res.json(task);
});

// DELETE TASK
router.delete("/:id", auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

module.exports = router;
