import classes from "./Layout.module.css";
import React, { Component } from "react";
import Budget from "../../Budget/Budget";
import Register from "../../Users/Register/Register";
import Login from "../../Users/Login/Login";
import Home from "../../Home/Home";
import PrivateRoute from "../../Navigation/PrivateRoute/PrivateRoute";
import HiddenRoute from "../../Navigation/HiddenRoute/HiddenRoute";
import { Route, Switch } from "react-router-dom";

class Layout extends Component {
	render() {
		return (
			<div className={classes.Layout}>
				<Switch>
					<Route exact path="/" component={Home} />
					<HiddenRoute exact path="/login" component={Login} />
					<HiddenRoute exact path="/register" component={Register} />
					<PrivateRoute exact path="/budget" component={Budget} />
				</Switch>
			</div>
		);
	}
}

export default Layout;
