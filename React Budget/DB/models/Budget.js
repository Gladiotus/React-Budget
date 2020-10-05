const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BudgetSchema = new Schema({
	userID: { type: String, required: true },
	incArray: { type: [Object], required: true },
	expArray: { type: [Object], required: true },
});

const Budget = mongoose.model("Budget", BudgetSchema);

module.exports = Budget;
