import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Axios is a promised-based HTTP client for JavaScript.
import Spinner from "../components/Spinner"; // importing Spinner.js

const Login = () => {
  const navigate = useNavigate(); // for navigating to pages
  const [loading, setLoading] = useState(false); // for spinner state
  // form submit
  const submitHandler = async (values) => {
    try {
      setLoading(true); // spinner on
      const { data } = await axios.post("/api/v1/users/login", values); // login user by user data
      setLoading(false); // spinner off
      message.success("Login Successful");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" }) // erase the password from local storage for security
      );
      navigate("/"); // navigate to home
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  };
  //prevent for login user
  useEffect(() => {
    // if there is user
    if (localStorage.getItem("user")) {
      navigate("/"); // navigate to home
    }
  }, [navigate]);
  return (
    <>
      <div className="register-page">
        {loading && <Spinner />}
        <Form layout="vertical" onFinish={submitHandler}>
          <h1>Login Form</h1>
          <Form.Item label="Email" name="email">
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" />
          </Form.Item>
          <div className=" d-flex justify-content-between ">
            <Link className="text" to="/register">
              Register here
            </Link>
            <button className="btn btn-primary">Login</button>
          </div>
        </Form>
      </div>
    </>
  );
};

// export login
export default Login;
