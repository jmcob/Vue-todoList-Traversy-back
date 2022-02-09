const Task = require("../models/Task");
const fs = require("fs");
const User = require("../models/User");
const ObjectID = require("mongoose").Types.ObjectId;

// création of a task by user
module.exports.createTask = (req, res) => {
        if (!ObjectID.isValid(req.params.id))
                return res.status(400).send("ID unknown : " + req.params.id);

        try {
                return User.findByIdAndUpdate(
                        req.params.id,
                        {
                                $push: {
                                        tasks: {
                                                text: req.body.text,
                                                day: req.body.day,
                                                reminder: req.body.reminder,
                                                // timestamp: new Date().getTime(),
                                        },
                                },
                        },
                        { new: true },
                        (err, docs) => {
                                if (!err) return res.json(docs);
                                else return res.status(400).send(err);
                        }
                );
        } catch (err) {
                return res.status(400).send(err);
        }
};

//user id getting ONE task
exports.getOneTask = async (req, res, next) => {
        let user = await User.findOne({
                _id: req.params.id,
        });
        let tasks = user.tasks;
        if (tasks) return res.status(200).json(tasks);
        else return res.status(400).send(err);
};

// User is updating the reminder of a task
exports.modifyTask = async (req, res, next) => {
        if (!ObjectID.isValid(req.params.id))
                return res.status(400).send("ID unknown : " + req.params.id);

        try {
                let userTaskToUpdate = await User.findOne({
                        _id: req.params.id,
                });
                userTaskToUpdate.tasks.find(
                        (tasks) =>
                                tasks._id.equals(req.body.taskId).reminder ==
                                !userTaskToUpdate.tasks.find(
                                        (tasks) =>
                                                tasks._id.equals(
                                                        req.body.taskId
                                                ).reminder
                                )
                );
                userTaskToUpdate
                        .save()
                        .then((data) => res.status(200).json(data))
                        .catch((error) => res.status(400).json({ error }));
                //         return User.findOneAndUpdate(
                //                 { _id: req.body.taskId },
                //                 (err, user) => {
                //                         let theTask = user.tasks.find((task) =>
                //                                 task._id.equals(req.body.taskId)
                //                         );
                //                         if (!theTask)
                //                                 return res
                //                                         .status(404)
                //                                         .send("Task not found");
                //                         theTask.reminder = !theTask.reminder;
                //                         return user.save((err) => {
                //                                 if (!err)
                //                                         return res
                //                                                 .status(200)
                //                                                 .send(docs);
                //                                 return res.status(500).send(err);
                //                         });
                //                 }
                //         );
        } catch (err) {
                return res.status(500).send(err);
        }
};

// User is deleting one of his sauces
exports.deleteTask = (req, res, next) => {
        try {
                return User.findByIdAndUpdate(
                        req.params.id,
                        {
                                $pull: {
                                        tasks: {
                                                _id: req.body.taskId,
                                        },
                                },
                        },
                        { new: true },
                        (err, docs) => {
                                if (!err) return res.send(docs);
                                else return res.status(400).send(err);
                        }
                );
        } catch (err) {
                return res.status(400).send(err);
        }
};

// User is getting ALL tasks
exports.getAllTasks = async (req, res, next) => {
        let user = await User.findOne({ _id: req.params.id });
        let tasks = user.tasks;
        if (tasks) return res.status(200).json(tasks);
        else return res.status(400).send(err);
};
