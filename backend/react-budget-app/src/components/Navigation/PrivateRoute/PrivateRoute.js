import React, { useContext } from "react";
import UserContext from "../../../context/UserContext";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
	const { userData } = useContext(UserContext);
	return (
		<Route
			{...rest}
			render={(props) => {
				if (userData.user) {
					return <Component {...props} />;
				} else {
					return (
						<Redirect
							to={{
								pathname: "/",
								state: { from: props.location },
							}}
						/>
					);
				}
			}}
		/>
	);
};

export default PrivateRoute;
