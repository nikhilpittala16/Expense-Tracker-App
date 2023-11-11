import React from "react";
import { Link, Form, redirect, useActionData } from "react-router-dom";
import { useState } from "react";

const LoginPage = () => {
  const [errorMessage, setMessage] = useState();
  const actionData = useActionData("message");
  React.useEffect(() => {
    if (actionData && actionData.message) {
      setMessage(actionData.message);
    }
  }, [actionData]);

  return (
    <>
      <div className="home-container">
        <p className="Appname">Expense Tracker</p>
      </div>
      <div className="container">
        <div className="form-container">
          <Form method="POST" className="form">
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label>Email</label>
              <input type="text" name="email" required></input>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <label>Password</label>
              <input type="text" name="password" required></input>
            </div>

            <button className="submit-btn">Sign In</button>
          </Form>
        </div>
        <div className="error">
          <p>
            Dont have an account?<Link to="/">Sign up</Link>
          </p>
        </div>
        <div className="error-second">
          {errorMessage && (
            <div style={{ color: "red", fontSize: "14px" }}>{errorMessage}</div>
          )}
        </div>
      </div>
    </>
  );
};
export default LoginPage;

export async function action({ request, params }) {
  const data = await request.formData();
  const userData = {
    email: data.get("email"),
    password: data.get("password"),
  };
  const response = await fetch("http://localhost:3000/api/users/login", {
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
