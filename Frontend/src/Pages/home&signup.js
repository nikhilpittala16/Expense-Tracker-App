import "./Homepage.css";
import React from "react";
import { useState } from "react";
import { useNavigate, Form, redirect, useActionData } from "react-router-dom";
const HomePage = () => {
  const [errorMessage, setMessage] = useState();
  const actionData = useActionData("message");

  React.useEffect(() => {
    if (actionData && actionData.message) {
      setMessage(actionData.message);
    }
  }, [actionData]);
  const navigate = useNavigate();
  return (
    <>
      <div className="home-container">
        <div>
          <p className="Appname">Expense Tracker</p>
        </div>
        <div style={{ marginTop: "45px" }}>
          <button
            className="submit-btn"
            style={{ width: "70px" }}
            onClick={() => {
              navigate("./login");
            }}
          >
            Sign In
          </button>
        </div>
      </div>
      <div className="container">
        <div className="form-container">
          <Form method="POST" className="form">
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label>Fullname</label>
              <input type="text" name="fullname" required></input>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label>Email</label>
              <input type="text" name="email" required></input>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label>Password</label>
              <input type="text" name="password" required></input>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <label>Confirm Password</label>
              <input type="text" name="passwordConfirm" required></input>
            </div>

            <button type="submit" className="submit-btn">
              Sign Up
            </button>
          </Form>
        </div>
        <div className="error">
          {errorMessage && (
            <div
              style={{
                color: "red",
                padding: "0 25px 0 25px",
                fontSize: "14px",
              }}
            >
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default HomePage;
export async function action({ request, params }) {
  const data = await request.formData();
  const userData = {
    fullname: data.get("fullname"),
    email: data.get("email"),
    password: data.get("password"),
    passwordConfirm: data.get("passwordConfirm"),
  };
  const response = await fetch("http://localhost:3000/api/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    return response;
  }
  const resData = await response.json();
  const token = resData.token;
  localStorage.setItem("token", token);
  return redirect("/expenses");
}
