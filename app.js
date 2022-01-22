const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Task = require("./models/Task");
const app = express();
const tasksRoutes = require("./routes/tasks");
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)

        .then(() => console.log("Connexion à MongoDB réussie !"))
        .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader(
                "Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
        );
        res.setHeader(
                "Access-Control-Allow-Methods",
                "GET, POST, PUT, DELETE, PATCH, OPTIONS"
        );
        next();
});

app.use(bodyParser.json());
app.use(helmet());
app.use(express.json());

app.use("/api/tasks", tasksRoutes);

module.exports = app;
