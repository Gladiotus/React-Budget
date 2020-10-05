import classes from "./Budget.module.css";
import React, { Component } from "react";
import ListContainer from "./ListContainer/ListContainer";
import BudgetInput from "./BudgetInput/BudgetInput";
import axios from "axios";
import UserContext from "../../context/UserContext";
import FlashMsg from "../UI/FlashMsg/FlashMsg";

class Budget extends Component {
	state = {
		totalBudget: 0,
		incArray: [],
		expArray: [],
		displayMsg: {
			msg: "",
			display: false,
			success: null,
		},
	};
	static contextType = UserContext;
	componentDidMount = async () => {
		const context = this.context;
		if (context.userData.user && localStorage.getItem("auth-token")) {
			const userID = context.userData.user.id;
			const budget = await axios.post(
				"/budget/get",
				{ userID: userID },
				{ headers: { "x-auth-token": localStorage.getItem("auth-token") } }
			);
			if (budget.data.incArray || budget.data.expArray) {
				const budgetSum =
					budget.data.incArray.reduce((sum, element) => sum + Number(element.amount), 0) -
					budget.data.expArray.reduce((sum, element) => sum + Number(element.amount), 0);
				this.setState({ incArray: budget.data.incArray, expArray: budget.data.expArray, totalBudget: budgetSum });
			}
		}
	};

	inputHandle = async (input) => {
		let newArray, newBudget;
		if (input.type === "inc") {
			newArray = [...this.state.incArray];
			newArray.push(input);
			newBudget = this.state.totalBudget + Number(input.amount);
			await this.setState({ incArray: newArray, totalBudget: newBudget });
		} else if (input.type === "exp") {
			newArray = [...this.state.expArray];
			newArray.push(input);
			newBudget = this.state.totalBudget - input.amount;
			await this.setState({ expArray: newArray, totalBudget: newBudget });
		}
	};

	deleteItemHandle = (id, type, amount) => {
		let newArray = [...this.state[type + "Array"]];
		let index = newArray.findIndex((item) => item.id === id);
		newArray.splice(index, 1);
		let newBudget;
		if (type === "inc") {
			newBudget = this.state.totalBudget - amount;
			this.setState({ incArray: newArray, totalBudget: newBudget });
		} else if (type === "exp") {
			newBudget = this.state.totalBudget + Number(amount);
			this.setState({ expArray: newArray, totalBudget: newBudget });
		}
	};

	saveBudget = async () => {
		const userBudget = {
			userID: this.context.userData.user.id,
			incArray: [...this.state.incArray],
			expArray: [...this.state.expArray],
		};
		const res = await axios.post("/budget/post", userBudget, {
			headers: { "x-auth-token": localStorage.getItem("auth-token") },
		});
		if (res.status === 200) {
			this.setState({ displayMsg: { display: true, msg: "Budget Saved", success: true } });
		} else {
			this.setState({ displayMsg: { display: true, msg: "Error", success: false } });
		}
		setTimeout(() => this.setState({ displayMsg: { display: false, msg: "", success: null } }), 3000);
	};

	render() {
		let totalBudgetClasses;
		if (this.state.expArray.length === 0 && this.state.incArray.length === 0) {
			totalBudgetClasses = classes.hideBudget;
		} else if (this.state.totalBudget >= 0) {
			totalBudgetClasses = [classes.TotalBudget, classes.positiveBudget].join(" ");
		} else {
			totalBudgetClasses = [classes.TotalBudget, classes.negativeBudget].join(" ");
		}
		return (
			<div className={classes.Budget}>
				<BudgetInput inputHandler={this.inputHandle} />
				<button onClick={this.saveBudget}>Save Budget</button>
				<ListContainer
					deleteItem={this.deleteItemHandle}
					incArray={this.state.incArray}
					expArray={this.state.expArray}
					budget={this.state.totalBudget}
				/>
				<div className={totalBudgetClasses}>{this.state.totalBudget}</div>
				{this.state.displayMsg.display ? (
					<FlashMsg msg={this.state.displayMsg.msg} success={this.state.displayMsg.success} />
				) : null}
			</div>
		);
	}
}

export default Budget;
