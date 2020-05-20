import React, { useState } from "react";
import adminRequests from "../services/adminRequests";
import useAdminProvider from "../store/AdminProvider/useAdminProvider";
import { useHistory } from "react-router-dom";
import routes from "../routes/routes";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { setAdminLoggedIn } = useAdminProvider();
  const history = useHistory();

  const updateEmail = event => setEmail(event.target.value);
  const updatePassword = event => setPassword(event.target.value);

  const formSubmit = event => {
    event.preventDefault();
    setIsLoading(true);
    adminRequests("https://4h9tu.sse.codesandbox.io/signin/login", "POST", {
      email,
      password
    })
      .then(result => {
        if (result.status === "SUCCESS") {
        setAdminLoggedIn();
          // Since we don't have cookes, store jwt in localstorage
          window.localStorage.setItem("jwtToken", result.jwtToken);

          // User Experience
          alert("Successfully loggedIn!");
          history.push(routes.Library);
        } else {
          alert("invalid user");
        }
      })
      .catch(e => {
        console.error(e);
        alert("Something went wrong...");
      });
  };

  return (
    <div className="container">
      <form onSubmit = {formSubmit}>
        <h3>Sign In</h3>

        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value = {email}
          onChange = {updateEmail}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value = {password}
            onChange={updatePassword}
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block" >
          Submit
        </button>
        <p className="forgot-password text-right">
          Never <a href="https://tf89g.csb.app/sign-up">Signed In?</a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
