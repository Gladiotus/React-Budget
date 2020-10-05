import React from "react";
import BudgetItem from "./BudgetItem/BudgetItem";
import classes from "./BudgetList.module.css";

const BudgetList = (props) => {
	const items = props.items.map((item, index) => {
		return (
			<BudgetItem
				key={item.id}
				id={item.id}
				desc={item.desc}
				amount={item.amount}
				type={item.type}
				deleteItem={props.deleteItem}
			/>
		);
	});
	return <div className={classes.BudgetList}>{items}</div>;
};

export default BudgetList;
