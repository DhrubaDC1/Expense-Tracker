import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Axios is a promised-based HTTP client for JavaScript.
import Spinner from "../components/Spinner"; // importing spinner

const Register = () => {
  const navigate = useNavigate(); // for navigating to pages
  const [loading, setLoading] = useState(false); // for spinner state
  // form submit
  const submitHandler = async (values) => {
    try {
      setLoading(true); // spinner on
      await axios.post("/api/v1/users/register", values); // register by values
      message.success("Registration Successful");
      setLoading(false); // spinner off
      navigate("/login"); // navigate to login page
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
          <h1>Register Form</h1>
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" />
          </Form.Item>
          <div className="d-flex justify-content-between">
            <Link className="text" to="/login">
              Login here
            </Link>
            <button className="btn btn-primary">Register</button>
          </div>
        </Form>
      </div>
    </>
  );
};

// export Register
export default Register;
