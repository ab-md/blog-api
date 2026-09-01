const express = require("express");
const mainRouter = require("./routes/index.route");
const { notFound, serverError } = require("./middleware/errorHander.middleware");
const connectDB = require("./config/database.config");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(mainRouter);
app.use(notFound);
app.use(serverError);

connectDB().then(() => {
    app.listen(process.env.PORT, err => console.log(err ? err.message : `Server is running on http://localhost:${process.env.PORT}`));
});

process.on("SIGINT", async () => {
    await mongoose.connection.close();
    console.warn("MongoDB connection closed");
    process.exit(0);
})