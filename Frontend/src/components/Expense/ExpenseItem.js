import React, { useState } from "react";
import "./ExpenseItem.css";
import ExpenseDate from "./ExpenseDate";

function ExpenseItem(props) {
  const deleteHandler = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/expenses/${props.id}`,
        {
          method: "DELETE",
        }
      );
      const resData = await response.json();
      console.log(resData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="expense-item">
      <ExpenseDate date={props.date}></ExpenseDate>
      <div className="expense-item__description">
        <h2>{props.title}</h2>
        <div className="expense-item__price">${props.amount}</div>
      </div>
      <div className="buttons">
        <button onClick={deleteHandler}>Delete</button>
      </div>
    </div>
  );
}
export default ExpenseItem;
