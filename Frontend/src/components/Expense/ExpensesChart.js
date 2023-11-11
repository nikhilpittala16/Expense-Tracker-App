import React from "react";
import Chart from "../Chart/Chart";

const ExpensesChart = (props) => {
  const chartDataPoints = [
    { label: "Jan", value: 0 },
    { label: "Fed", value: 0 },
    { label: "Mar", value: 0 },
    { label: "Apr", value: 0 },
    { label: "May", value: 0 },
    { label: "Jun", value: 0 },
    { label: "Jul", value: 0 },
    { label: "Aug", value: 0 },
    { label: "Sep", value: 0 },
    { label: "Oct", value: 0 },
    { label: "Nov", value: 0 },
    { label: "Dec", value: 0 },
  ];
  const list = props.expenses.filter((expense) => {
    const date = new Date(expense.date);
    const year = date.getFullYear();
    const yearString = String(year);
    return yearString === props.year;
  });
  for (const expense of list) {
    const date = new Date(expense.date);
    const expenseMonth = date.getMonth();
    chartDataPoints[expenseMonth].value += expense.amount;
  }
  return <Chart dataPoints={chartDataPoints}></Chart>;
};
export default ExpensesChart;
