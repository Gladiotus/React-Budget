const express = require("express");
const path = require("path");
const app = express();
const usersRouter = require("./DB/router/users");
const budgetRouter = require("./DB/router/budget");
const connectDB = require("./DB/Connection");
require("dotenv").config();
const port = process.env.PORT || 5000;

connectDB();
app.use(express.json());
app.use("/users", usersRouter);
app.use("/budget", budgetRouter);

app.use(express.static(path.join(__dirname, "react-budget-app", "build")));

app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, "react-budget-app", "build", "index.html"));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
