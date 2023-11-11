import ExpensesFilter from "./ExpensesFilter";
import ExpensesChart from "./ExpensesChart";
import ExpensesTab from "./ExpensesTab";
import "./Expenses.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Expenses() {
  const [optionYear, setOptionYear] = useState("2019");
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:3000/api/expenses?sort=date",
          {
            method: "GET",
            headers: {
              authorization: "Bearer " + token,
            },
          }
        );
        if (!response.ok) {
          navigate("/login");
        }

        const expenseData = await response.json();
        setExpenses(expenseData.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const filterChangeHandler = (year) => {
    setOptionYear(year);
  };

  return (
    <div className="expenses">
      <ExpensesFilter onFilter={filterChangeHandler}></ExpensesFilter>
      <ExpensesChart year={optionYear} expenses={expenses}></ExpensesChart>
      <ExpensesTab year={optionYear} expenses={expenses}></ExpensesTab>
    </div>
  );
}
export default Expenses;
