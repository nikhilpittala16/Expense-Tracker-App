import NewExpense from "../components/NewExpenses/NewExpense";
import Expenses from "../components/Expense/Expenses";
import { useNavigate } from "react-router-dom";
function ExpensesPage() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="home-container">
        <div>
          <p className="Appname">Expense tracker</p>
        </div>
        <div style={{ marginTop: "45px" }}>
          <button
            className="submit-btn"
            style={{ width: "70px" }}
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
      <div></div>
      <NewExpense></NewExpense>
      <Expenses />
    </div>
  );
}

export default ExpensesPage;
