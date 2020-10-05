const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../auth/auth");
const User = require("../models/User");

router.use((req, res, next) => next());

router.post("/register", (req, res) => {
	if (req.body.name && req.body.password) {
		User.exists({ name: req.body.name })
			.then((userExists) => {
				if (userExists) {
					res.json({ msg: "User Exists" });
				} else {
					const hashedPassword = bcrypt.hashSync(req.body.password, 10);
					const newUser = new User({ name: req.body.name, password: hashedPassword });
					newUser.save((err, user) => {
						if (err) res.json({ error: err.message });
						else {
							console.log(`Saved new user in db: ${newUser}`);
							res.json({ msg: "User Registered" });
						}
					});
				}
			})
			.catch((err) => console.log(err));
	} else {
		res.json({ msg: "Invalid credentials" });
	}
});

router.post("/login", async (req, res) => {
	if (req.body.name && req.body.password) {
		const user = await User.findOne({ name: req.body.name });
		if (user) {
			if (bcrypt.compareSync(req.body.password, user.password)) {
				const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
				res.json({ msg: "User logged in", token: token, user: { id: user._id, name: user.name } });
			} else {
				res.json({ msg: "Wrong Password" });
			}
		} else {
			res.json({ msg: "No such user" });
		}
	} else {
		res.json({ msg: "Invalid credentials" });
	}
});
router.get("/isvalidtoken", auth, (req, res) => {
	if (req.user) {
		res.json(true);
	} else {
		res.json(false);
	}
});

router.get("/", auth, (req, res) => {
	User.findById(req.user).then((user) => {
		res.json({ name: user.name, id: user._id });
	});
});

module.exports = router;
