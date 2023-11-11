import React, { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";
const NewExpense = () => {
  const [view, setView] = useState(false);
  const saveExpenseDataHandler = async (enteredExpenseData) => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3000/api/expenses", {
      method: "POST",
      body: JSON.stringify(enteredExpenseData),
      headers: {
        authorization: "Bearer " + token,
        "Content-type": "application/json",
      },
    });
    const resData = await response.json();
  };
  return (
    <div className="new-expense">
      {!view && (
        <div>
          <button
            onClick={() => {
              setView(true);
            }}
          >
            Add New Expense
          </button>
        </div>
      )}
      {view && (
        <ExpenseForm
          onSaveExpenseData={saveExpenseDataHandler}
          onSetView={setView}
        />
      )}
    </div>
  );
};
export default NewExpense;
