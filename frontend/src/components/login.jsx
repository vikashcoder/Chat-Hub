// src/components/Login.jsx
import toast from "react-hot-toast"
import React, { useState } from 'react';
import axios  from "axios";
import { Link, useNavigate } from 'react-router-dom';
 // Assumes toast notifications are configured
 import { useDispatch } from "react-redux";
 import { setAuthUser } from '../redux/userSlice';
const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();


    // Uncomment this block when ready to use with API
    
    try {
      const res = await axios.post(`http://localhost:8080/api/v1/user/login`, credentials, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

        navigate("/"); // Redirect to dashboard or home page
        dispatch(setAuthUser(res.data));

    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    

    setCredentials({
      username: '',
      password: '',
    });
  };

  return (
    <div className="min-w-96 mx-auto">
      <div className="p-6 w-full bg-blue-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-100">
        <h1 className="text-4xl font-bold text-center text-gray-600">Login</h1>
        <form onSubmit={onSubmitHandler}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              name="username"
              value={credentials.username}
              onChange={handleInputChange}
              className="w-full input input-bordered h-10"
              type="text"
              placeholder="Username"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              className="w-full input input-bordered h-10"
              type="password"
              placeholder="Password"
            />
          </div>
          <p className="text-center my-2">
            Don't have an account? <Link to="/signup">Signup</Link>
          </p>
          <div>
            <button
              type="submit"
              className="btn btn-block btn-sm mt-2 border border-slate-700"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
