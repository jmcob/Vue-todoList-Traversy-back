const Task = require("../models/Task");
const fs = require("fs");
const User = require("../models/User");
const ObjectID = require("mongoose").Types.ObjectId;

// création of a task by user
// exports.createTask = (req, res, next) => {
//         console.log(req.body);
//         const taskObject = req.body;
//         // delete taskObject.id;
//         const task = new Task({
//                 ...taskObject,
//         });
//         task.save()
//                 .then(() => res.status(201).json(task))
//                 .catch((error) => res.status(400).json({ error }));
// };

module.exports.createTask = (req, res) => {
        if (!ObjectID.isValid(req.params.id))
                return res.status(400).send("ID unknown : " + req.params.id);

        try {
                // let user = await User.findOne({ _id: req.params.id });
                // user.tasks.push(req.body);
                // await user
                //         .save()
                //         .then((data) => res.json(data))
                //         .catch((err) =>
                //                 res.status(400).send({
                //                         message: err,
                //                 })
                //         );
                return User.findOneAndUpdate(
                        (_id = req.params.id),
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
                                if (!err) return res.send(docs);
                                else return res.status(400).send(err);
                        }
                );
        } catch (err) {
                return res.status(400).send(err);
        }
};

//user id getting ONE task
exports.getOneTask = (req, res, next) => {
        User.findOne({
                _id: req.params.id,
        })
                .then((data) => {
                        res.status(200).json(data);
                })
                .catch((error) => {
                        res.status(404).json({
                                error: error,
                        });
                });
};

// User is updating a task he created
// exports.modifyTask = async (req, res, next) => {
//         let taskToUpdate = await Task.findOne({ _id: req.params.id });
//         // delete taskObject._id;
//         taskToUpdate.reminder = !taskToUpdate.reminder;
//         taskToUpdate
//                 .save()
//                 .then((data) => res.status(200).json(data))
//                 .catch((error) => res.status(400).json({ error }));
// };

// User is deleting one of his sauces
exports.deleteTask = (req, res, next) => {
        Task.deleteOne({ id: req.params.id })
                .then(() =>
                        res.status(200).json({
                                message: "Task supprimé !",
                        })
                )
                .catch((error) => res.status(400).json({ error }));
};

// User is getting ALL tasks
exports.getAllTasks = (req, res, next) => {
        Task.find()
                .then((tasks) => {
                        res.status(200).json(tasks);
                })
                .catch((error) => {
                        res.status(400).json({
                                error: error,
                        });
                });
};
