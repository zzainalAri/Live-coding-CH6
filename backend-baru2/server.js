require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const systemController = require("./controllers/systemController");
const router = require("./routes");
const docsRouter = require("./routes/documentationRouter");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"));

app.get("/api/v1/health-check", systemController.healthCheck);
app.use("/api/v1", router);
app.use("/api-docs", docsRouter);
app.use(systemController.onLost);

module.exports = app;
