import React from "react";
import classes from "./ListContainer.module.css";
import BudgetList from "./BudgetList/BudgetList";

const ListContainer = (props) => {
	return (
		<div className={classes.ListContainer}>
			<BudgetList items={props.incArray} deleteItem={props.deleteItem} />
			<BudgetList items={props.expArray} deleteItem={props.deleteItem} />
		</div>
	);
};

export default ListContainer;
