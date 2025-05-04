const express = require("express");
const postRouter = require("./routes/postRoutes");
const globalErrorHandler = require("./controllers/errorController");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/healthcheck", async (req,res) => {
    res.send("OK\n");
})

app.use("/api/v1/posts", postRouter);

app.use(globalErrorHandler);

module.exports = app;
