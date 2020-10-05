import React from "react";
import FlashMessage from "react-flash-message";
import classes from "./FlashMsg.module.css";

const FlashMsg = (props) => {
	const success = props.success ? "Success" : "Fail";
	const successClass = classes[success];
	const assignedClasses = [classes.FlashMsg, successClass].join(" ");
	return (
		<FlashMessage duration={3000} persistOnHover={true}>
			<div className={assignedClasses}>{props.msg}</div>
		</FlashMessage>
	);
};

export default FlashMsg;
