import classes from "./BudgetItem.module.css";
import React from "react";

const BudgetItem = (props) => {
	const itemClasses = [classes.BudgetItem, classes[props.type]].join(" ");
	return (
		<div className={itemClasses} onClick={() => props.deleteItem(props.id, props.type, props.amount)}>
			<h1>{props.desc}</h1>
			<span>{props.amount}</span>
		</div>
	);
};

export default BudgetItem;
