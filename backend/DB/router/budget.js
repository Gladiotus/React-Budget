const express = require("express");
const auth = require("../auth/auth");
const router = express.Router();
const Budget = require("../models/Budget");

router.use((req, res, next) => next());

router.post("/post", auth, (req, res) => {
	Budget.exists({ userID: req.body.userID }).then((existsRes) => {
		if (existsRes) {
			Budget.findOneAndUpdate({ userID: req.body.userID }, req.body)
				.then((response) => res.send(response))
				.catch((err) => console.log(err));
		} else {
			const newBudget = new Budget({
				userID: req.body.userID,
				incArray: req.body.incArray,
				expArray: req.body.expArray,
			});
			newBudget
				.save()
				.then(console.log(`Posted new budget to db ${newBudget}`))
				.catch((err) => {
					res.json(err);
				});
		}
	});
});

router.post("/get", auth, (req, res) => {
	Budget.findOne({ userID: req.body.userID })
		.then((budgetRes) => {
			if (budgetRes) res.send(budgetRes);
			else res.send({ msg: "budget missing" });
		})
		.catch((err) => console.log(err));
});

module.exports = router;
