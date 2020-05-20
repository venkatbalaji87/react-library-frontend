import React, { useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";

import useAdminProvider from "./store/AdminProvider/useAdminProvider";
import routes from "./routes/routes";

import Login from "./pages/loginPage";
import SignUp from "./pages/signupPage";
import Library from "./pages/homePage";
import Cart from "./pages/cartPage";
import Checkout from "./pages/checkoutPage";
import UserProfile from "./pages/userProfilePage";
import adminRequests from "./services/adminRequests";

function App() {
  const location = useLocation();
  const { setAdminLoggedIn } = useAdminProvider();
  const history = useHistory();
  useEffect(() => {
    // if (location.pathname === "/") {
    //   history.push(routes.Login);
    // }

    adminRequests("https://4h9tu.sse.codesandbox.io/signin/isLoggedIn")
      .then(() => {
        setAdminLoggedIn(true);
      })
      .catch(console.error);
  }, []);
  const { isAdminLoggedIn } = useAdminProvider();

  const logout = () => {
    window.localStorage.removeItem("jwtToken");
   // window.location.reload("/sign-in");
  // alert("Successfully logged out!");
  console.log('before logout')
    fetch("https://4h9tu.sse.codesandbox.io/signin/logout")
      .then(() => {
        alert('logged out successfully');
        window.location.href='https://tf89g.csb.app/sign-in';
      })
      .catch(console.error);
   console.log('after logout'); 
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            {isAdminLoggedIn ? (
              <div>
                <Link className="navbar-brand" to={"/library"}>
                  Library
                </Link>
                <Link className="navbar-brand" to={"/cart"}>
                  Cart
                </Link>
                <Link className="navbar-brand" to={"/checkout"}>
                  Checkout
                </Link>
                <Link className="navbar-brand" to={"/profile"}>
                  UserProfile
                </Link>
              </div>
            ) : (
              <Link className="navbar-brand" to={"/sign-in"}>
                Library
              </Link>
            )}
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  {isAdminLoggedIn ? (
                    <Link className="nav-link" onClick={logout}>
                      Logout
                    </Link>
                  ) : (
                    <Link className="nav-link" to={"/sign-in"}>
                      Login
                    </Link>
                  )}
                </li>
                <li className="nav-item">
                  {isAdminLoggedIn ? null : (
                    <Link className="nav-link" to={"/sign-up"}>
                      Sign up
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="auth-wrapper">
          <div className="auth-inner">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/sign-in" component={Login} />
              <Route path="/sign-up" component={SignUp} />
              <Route path="/Library" component={Library} />
              <Route path="/cart" component={Cart} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/profile" component={UserProfile} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
