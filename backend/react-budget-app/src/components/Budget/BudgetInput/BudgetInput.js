import React, { Component } from "react";
import classes from "./BudgetInput.module.css";
import uniqid from "uniqid";

class BudgetInput extends Component {
	state = {
		amount: "",
		desc: "",
	};
	amountChangeHandler = (e) => {
		this.setState({ amount: e.target.value });
	};
	descChangeHandler = (e) => {
		this.setState({ desc: e.target.value });
	};
	submitHandler = (type) => {
		if (isNaN(this.state.amount)) {
			alert("Please enter valid amount");
		} else {
			if (this.state.amount && this.state.desc) {
				const item = {
					id: uniqid(),
					amount: this.state.amount,
					desc: this.state.desc,
					type,
				};
				this.setState({ amount: "", desc: "" });
				this.props.inputHandler(item);
			}
		}
	};

	render() {
		return (
			<div className={classes.BudgetInput}>
				<input type="text" onChange={this.amountChangeHandler} value={this.state.amount} placeholder="Amount..." />
				<input type="text" onChange={this.descChangeHandler} value={this.state.desc} placeholder="Decription..." />
				<div className={classes.BtnContainer}>
					<button className={classes.Plus} onClick={() => this.submitHandler("inc")}>
						+
					</button>
					<button className={classes.Minus} onClick={() => this.submitHandler("exp")}>
						-
					</button>
				</div>
			</div>
		);
	}
}

export default BudgetInput;
