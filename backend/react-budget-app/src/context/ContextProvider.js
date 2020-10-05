import React, { Component } from "react";
import UserContext from "./UserContext";

class ContextProvider extends Component {
	state = {
		userData: {
			user: null,
			token: null,
		},
		setUserData: (token, user) => {
			this.setState({ userData: { user, token } });
		},
	};

	render() {
		return <UserContext.Provider value={this.state}>{this.props.children}</UserContext.Provider>;
	}
}

export default ContextProvider;
