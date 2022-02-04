const Task = require("../models/Task");
const fs = require("fs");

// création of a task by user
exports.createTask = (req, res, next) => {
        console.log(req.body);
        const taskObject = req.body;
        // delete taskObject.id;
        const task = new Task({
                ...taskObject,
        });
        task.save()
                .then(() => res.status(201).json(task))
                .catch((error) => res.status(400).json({ error }));
};

//user id getting ONE task
exports.getOneTask = (req, res, next) => {
        Task.findOne({
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
exports.modifyTask = async (req, res, next) => {
        let taskToUpdate = await Task.findOne({ _id: req.params.id });
        // delete taskObject._id;
        taskToUpdate.reminder = !taskToUpdate.reminder;
        taskToUpdate
                .save()
                .then((data) => res.status(200).json(data))
                .catch((error) => res.status(400).json({ error }));
};

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

// // User is liking / disliking a sauce
// exports.likeSauce = (req, res, next) => {
//         const sauceId = req.params.id;
//         const userId = req.body.userId;
//         const like = req.body.like;
//         // 1. user likes a sauce for the first time (like === 1)
//         // pushing the userId to usersLiked array; incrementing likes
//         if (like === 1) {
//                 Sauce.updateOne(
//                         { _id: sauceId },
//                         {
//                                 $inc: { likes: like },
//                                 $push: { usersLiked: userId },
//                         }
//                 )
//                         .then((sauce) =>
//                                 res
//                                         .status(200)
//                                         .json({ message: "Sauce appréciée" })
//                         )
//                         .catch((error) => res.status(500).json({ error }));
//         }

//         // 2. user DISlikes a sauce for the first time (like === -1)
//         // pushing the userId to usersLiked array; one less like.
//         else if (like === -1) {
//                 Sauce.updateOne(
//                         { _id: sauceId },
//                         {
//                                 $inc: { dislikes: -1 * like },
//                                 $push: { usersDisliked: userId },
//                         }
//                 )
//                         .then((sauce) =>
//                                 res
//                                         .status(200)
//                                         .json({ message: "Sauce dépréciée" })
//                         )
//                         .catch((error) => res.status(500).json({ error }));
//         }
//         // 3. User changes his mind
//         // 3.1. user is taking back his like :
//         else {
//                 Sauce.findOne({ _id: sauceId })
//                         .then((sauce) => {
//                                 if (sauce.usersLiked.includes(userId)) {
//                                         Sauce.updateOne(
//                                                 { _id: sauceId },
//                                                 {
//                                                         $pull: {
//                                                                 usersLiked: userId,
//                                                         },
//                                                         $inc: { likes: -1 },
//                                                 }
//                                         )
//                                                 .then((sauce) => {
//                                                         res.status(200).json({
//                                                                 message: "Sauce dépréciée",
//                                                         });
//                                                 })
//                                                 .catch((error) =>
//                                                         res
//                                                                 .status(500)
//                                                                 .json({ error })
//                                                 );
//                                         // 3.2 user is changing his mind on his dislike
//                                 } else if (
//                                         sauce.usersDisliked.includes(userId)
//                                 ) {
//                                         Sauce.updateOne(
//                                                 { _id: sauceId },
//                                                 {
//                                                         $pull: {
//                                                                 usersDisliked:
//                                                                         userId,
//                                                         },
//                                                         $inc: { dislikes: -1 },
//                                                 }
//                                         )
//                                                 .then((sauce) => {
//                                                         res.status(200).json({
//                                                                 message: "Sauce appréciée",
//                                                         });
//                                                 })
//                                                 .catch((error) =>
//                                                         res
//                                                                 .status(500)
//                                                                 .json({ error })
//                                                 );
//                                 }
//                         })
//                         .catch((error) => res.status(401).json({ error }));
//         }
// };
