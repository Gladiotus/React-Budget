import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import UserContext from "../../../context/UserContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
	const { userData } = useContext(UserContext);
	return (
		<Route
			{...rest}
			render={(props) => {
				if (userData.user) {
					return (
						<Redirect
							to={{
								pathname: "/budget",
								state: { from: props.location },
							}}
						/>
					);
				} else {
					return <Component {...props} />;
				}
			}}
		/>
	);
};

export default PrivateRoute;
