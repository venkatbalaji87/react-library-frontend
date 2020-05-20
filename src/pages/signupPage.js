import React, { useState } from "react";
import adminRequests from "../services/adminRequests";
import useAdminProvider from "../store/AdminProvider/useAdminProvider";
import { useHistory } from "react-router-dom";
import routes from "../routes/routes";

const signUpPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //const [isLoading, setIsLoading] = useState(false);

//  const { setAdminLoggedIn } = useAdminProvider();
  const history = useHistory();

  const UpdateFirstName = event => setFirstName(event.target.value);
  const UpdateLastName = event => setLastName(event.target.value);
  const updateEmail = event => setEmail(event.target.value);
  const updatePassword = event => setPassword(event.target.value);

  const submitForm = async event => {
    event.preventDefault();
  
    try {
      const postData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      };
      const response = await fetch("https://4h9tu.sse.codesandbox.io/signup", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
      });
      const data = await response.json();
      if (data.status === "SUCCESS") {
        alert("Signed Up Successfully");
        history.push(routes.Login);
      } else {
        console.error(data);
        alert("Unable to Sign up!");
      }
    } catch (e) {
      console.error(e);
      alert("Unable to submit Sign up!");
    }
  };
  return (
    <div className="container">
      <form>
        <h3>Sign Up</h3>

        <div className="form-group">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            value  = {firstName}
          onChange = {UpdateFirstName}
          />
        </div>

        <div className="form-group">
          <label>Last name</label>
          <input type="text" className="form-control" placeholder="Last name"  value  = {lastName}
          onChange = {UpdateLastName}/>
        </div>

        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value  = {email}
          onChange = {updateEmail}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value  = {password}
          onChange = {updatePassword}
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block" onClick={submitForm}>
          Sign Up
        </button>
        <p className="forgot-password text-right">
          Already registered <a href="https://tf89g.csb.app/sign-in">sign in?</a>
        </p>
      </form>
    </div>
  );
};

export default signUpPage;
