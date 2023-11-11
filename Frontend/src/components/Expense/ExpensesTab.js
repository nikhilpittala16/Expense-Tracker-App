import ExpenseItem from "./ExpenseItem";
const ExpensesTab = (props) => {
  const list = props.expenses.filter((expense) => {
    const date = new Date(expense.date);
    const year = date.getFullYear();
    const yearString = String(year);
    return yearString === props.year;
  });

  return (
    <>
      {list.map((expense) => (
        <ExpenseItem
          key={expense._id}
          id={expense._id}
          title={expense.title}
          amount={expense.amount}
          date={expense.date}
        />
      ))}
    </>
  );
};
export default ExpensesTab;
