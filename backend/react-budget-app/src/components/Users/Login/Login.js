import React, { Component } from "react";
import axios from "axios";
import classes from "./Login.module.css";
import UserContext from "../../../context/UserContext";
import FlashMsg from "../../UI/FlashMsg/FlashMsg";

class Login extends Component {
	state = {
		name: "",
		password: "",
		displayMsg: {
			display: false,
			success: null,
			msg: "",
		},
	};

	static contextType = UserContext;

	passwordChangeHandle = (e) => {
		this.setState({ password: e.target.value });
	};
	nameChangeHandle = (e) => {
		this.setState({ name: e.target.value });
	};
	displaySuccessMsg = (msg) => {
		if (msg !== "User logged in") {
			this.setState({ displayMsg: { display: true, msg, success: false }, name: "", password: "" });
			setTimeout(() => this.setState({ displayMsg: { display: false, msg: "", success: null } }), 3000);
		}
	};
	loginHandle = async (e) => {
		e.preventDefault();
		const loginUser = { name: this.state.name, password: this.state.password };
		if (loginUser.name && loginUser.password) {
			this.setState({ name: "", password: "" });
			const res = await axios.post("/users/login", loginUser);
			if (res.data.msg === "User logged in") {
				this.context.setUserData(res.data.token, res.data.user);
				localStorage.setItem("auth-token", res.data.token);
				this.props.history.push("/");
			} else {
				this.displaySuccessMsg(res.data.msg);
			}
		}
	};
	render() {
		return (
			<div className={classes.Login}>
				<h1>Login</h1>
				<form>
					<input type="text" onChange={this.nameChangeHandle} value={this.state.name} placeholder="Name" />
					<input
						type="password"
						onChange={this.passwordChangeHandle}
						value={this.state.password}
						placeholder="Password"
					/>
					<button onClick={this.loginHandle}>Login</button>
				</form>
				{this.state.displayMsg.display ? (
					<FlashMsg success={this.state.displayMsg.success} msg={this.state.displayMsg.msg} />
				) : null}
			</div>
		);
	}
}

export default Login;
