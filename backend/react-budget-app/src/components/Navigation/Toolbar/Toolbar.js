import React, { useContext } from "react";
import UserContext from "../../../context/UserContext";
import { Link } from "react-router-dom";
import { RiExchangeDollarFill } from "react-icons/ri";
import classes from "./Toolbar.module.css";

const Toolbar = (props) => {
	const userContext = useContext(UserContext);
	return (
		<header className={classes.Toolbar}>
			<Link className={classes.Logo} to="/">
				<RiExchangeDollarFill size={42} />
			</Link>
			<nav>
				{userContext.userData.user ? (
					<>
						<Link to="/" onClick={props.logout}>
							Logout
						</Link>
						<Link to="/budget">Budget</Link>
					</>
				) : (
					<>
						<Link to="/Login">Login</Link>
						<Link to="/register">Register</Link>
					</>
				)}
			</nav>
		</header>
	);
};

export default Toolbar;
