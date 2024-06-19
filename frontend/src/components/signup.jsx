import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import axios from "axios"
const Signup = () => {
  const [user, setUser] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleRadioChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      gender: e.target.value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  

    // Uncomment this block when ready to use with API
    
    try {
        
      const res = await axios.post(`http://localhost:8080/api/v1/user/register`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
    
     if (res.data.success) {
       navigate("/login");
       toast.success(res.data.message);
     }
    } catch (error) {
    //  toast.error(error.response.data.message);
      console.log(error);
    }
    

    setUser({
      fullName: '',
      username: '',
      password: '',
      confirmPassword: '',
      gender: '',
    });
  };

  return (
    <div className="min-w-96 mx-auto">
      <div className="p-6 w-full bg-blue-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-100">
        <h1 className="text-4xl font-bold text-center text-gray-600">Signup</h1>
        <form onSubmit={onSubmitHandler}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              name="fullName"
              value={user.fullName}
              onChange={handleInputChange}
              className="w-full input input-bordered h-10"
              type="text"
              placeholder="Full Name"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              name="username"
              value={user.username}
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
              value={user.password}
              onChange={handleInputChange}
              className="w-full input input-bordered h-10"
              type="password"
              placeholder="Password"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleInputChange}
              className="w-full input input-bordered h-10"
              type="password"
              placeholder="Confirm Password"
            />
          </div>
          <div className="flex items-center my-4">
            <div className="flex items-center">
              <input
                type="radio"
                value="male"
                name="gender"
                checked={user.gender === "male"}
                onChange={handleRadioChange}
                className="radio mx-2"
              />
              <p>Male</p>
            </div>
            <div className="flex items-center mx-4">
              <input
                type="radio"
                value="female"
                name="gender"
                checked={user.gender === "female"}
                onChange={handleRadioChange}
                className="radio mx-2"
              />
              <p>Female</p>
            </div>
          </div>
          <p className="text-center my-2">
            Already have an account? <Link to="/login">login</Link>
          </p>
          <div>
            <button
              type="submit"
              className="btn btn-block btn-sm mt-2 border border-slate-700"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
