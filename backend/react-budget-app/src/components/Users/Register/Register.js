import React, { Component } from "react";
import classes from "./Register.module.css";
import FlashMsg from "../../UI/FlashMsg/FlashMsg";
import axios from "axios";

class Register extends Component {
	state = {
		name: "",
		password: "",
		confirmPassword: "",
		displayMsg: {
			display: false,
			success: false,
			msg: "",
		},
	};
	passwordChangeHandle = (e) => {
		this.setState({ password: e.target.value });
	};
	confirmPasswordChangeHandle = (e) => {
		this.setState({ confirmPassword: e.target.value });
	};
	nameChangeHandle = (e) => {
		this.setState({ name: e.target.value });
	};
	displaySuccessMsg = (msg) => {
		let display = true,
			success = false;
		if (msg === "User Registered") {
			success = true;
		}
		this.setState({ displayMsg: { display, msg, success }, name: "", password: "", confirmPassword: "" });
		setTimeout(() => this.setState({ displayMsg: { display: false, msg, success } }), 3000);
	};
	registerHandle = async (e) => {
		e.preventDefault();
		if (this.state.password === this.state.confirmPassword) {
			const newUser = { name: this.state.name, password: this.state.password };
			this.setState({ name: "", password: "", confirmPassword: "" });
			const res = await axios.post("/users/register", newUser);
			this.displaySuccessMsg(res.data.msg);
		} else {
			this.displaySuccessMsg("Password don't match");
		}
	};

	render() {
		return (
			<div className={classes.Register}>
				<h1>Register</h1>
				<form>
					<input type="text" placeholder="Name" value={this.state.name} onChange={this.nameChangeHandle} />
					<input
						type="password"
						placeholder="Password"
						value={this.state.password}
						onChange={this.passwordChangeHandle}
					/>
					<input
						type="password"
						placeholder="Confirm Password"
						value={this.state.confirmPassword}
						onChange={this.confirmPasswordChangeHandle}
					/>
					<button onClick={this.registerHandle}>Register</button>
				</form>
				{this.state.displayMsg.display ? (
					<FlashMsg success={this.state.displayMsg.success} msg={this.state.displayMsg.msg} />
				) : null}
			</div>
		);
	}
}

export default Register;
