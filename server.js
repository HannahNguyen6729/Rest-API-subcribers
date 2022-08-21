const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

//connect to database
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("err", (err) => console.log("err", err));
db.once("open", () => console.log("connected to database"));

//let server except json
app.use(express.json());

//Routes
const subscribersRouter = require("./routes/subscribersRouter");
app.use("/subscribers", subscribersRouter);

app.listen(3000, () => console.log("listening on port 3000"));
