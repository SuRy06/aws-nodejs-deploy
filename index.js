const path = require("path");
const express = require("express");

const dotenv = require("dotenv");
const { dbCon } = require("./db");
const userRouter = require("./routes/userRouter");

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Router Section
app.use("/api/v1/", (req, res) => {
  res.send({ message: "Deploy of Node Js Project ok!" });
});
app.use("/api/v1/user", userRouter);

// DB Connection
dbCon();
//server section.
const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
