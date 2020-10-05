import React, { Component } from "react";
import Toolbar from "../components/Navigation/Toolbar/Toolbar";
import UserContext from "../context/UserContext";
import Layout from "../components/UI/Layout/Layout";
import FlashMsg from "../components/UI/FlashMsg/FlashMsg";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import "../index.css";

class App extends Component {
	state = { displayLogoutMsg: false };
	static contextType = UserContext;
	componentDidMount = async () => {
		const context = this.context;
		if (!context.userData.user) {
			const token = localStorage.getItem("auth-token");
			if (token) {
				const tokenRes = await axios.get("/users/isvalidtoken", { headers: { "x-auth-token": token } });
				if (tokenRes.data) {
					const userRes = await axios.get("/users", { headers: { "x-auth-token": token } });
					context.setUserData(token, userRes.data);
				}
			}
		}
	};
	logoutHandle = () => {
		localStorage.setItem("auth-token", "");
		this.context.setUserData(undefined, undefined);
		this.setState({ displayLogoutMsg: true });
	};
	render() {
		return (
			<BrowserRouter>
				<div className="App">
					<Toolbar logout={this.logoutHandle} />
					<Layout />
					{this.state.displayLogoutMsg ? <FlashMsg success={true} msg="Logged Out" /> : null}
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
