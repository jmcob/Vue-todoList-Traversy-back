const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const Task = require("./models/Task") ;
const cors = require("cors");
const app = express();
const tasksRoutes = require("./routes/tasks");
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)

        .then(() => console.log("Connexion à MongoDB réussie !"))
        .catch(() => console.log("Connexion à MongoDB échouée !"));

const corsOptions = {
        origin: process.env.CLIENT_URL,
        credentials: true,
        allowedHeaders: ["sessionId", "Content-Type"],
        exposedHeaders: ["sessionId"],
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
};

app.use(cors({ corsOptions }));

app.use(bodyParser.json());
app.use(helmet());
app.use(express.json());

app.use("/api/tasks", tasksRoutes);

module.exports = app;
