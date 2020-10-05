import React, { useContext } from "react";
import classes from "./Home.module.css";
import FlashMsg from "../UI/FlashMsg/FlashMsg";
import UserContext from "../../context/UserContext";

const Home = (props) => {
	const { userData } = useContext(UserContext);
	return (
		<div className={classes.Home}>
			{userData.user ? (
				[
					<h1 key="head">{userData.user.name}, Welcome to BudgetApp</h1>,
					<FlashMsg key="msg" success={true} msg={`Logged in as ${userData.user.name}`} />,
				]
			) : (
				<h1>Welcome to BudgetApp</h1>
			)}
		</div>
	);
};

export default Home;
