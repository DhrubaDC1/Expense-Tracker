import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";

const Header = () => {
  const [loginUser, setLoginUser] = useState(""); // for login user name
  const navigate = useNavigate(); // for navigating to pages
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")); // getting data from browser local storage by userid
    // if user is available
    if (user) {
      setLoginUser(user);
    }
  }, []);
  const logoutHandler = () => {
    localStorage.removeItem("user"); // logout user by userid
    message.success("Log out Successfully");
    navigate("/login"); // navigate to login page
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <h1>Expense Tracker</h1>
          </Link>
          <div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <b>
                    <p
                      to="/user"
                      className="nav-link active"
                      aria-current="page"
                    >
                      {loginUser && loginUser.name}
                    </p>
                  </b>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-light"
                    onClick={logoutHandler}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

// exporting header functions
export default Header;
