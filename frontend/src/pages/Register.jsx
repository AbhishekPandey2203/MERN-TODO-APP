import React, { useContext } from "react";

import { useState } from "react";
import { register } from "../apiCalls/user";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Password Does not match");
      return;
    }

    const data = {
      name,
      email,
      age,
      password,
    };

    const response = await register(data);
    if (response.status === 201) {
      alert("User Registered Successfully");
      setUser(response.data.user);
      navigate("/");
    } else {
      alert(response.response.data.msg);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Register</h1>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Enter Name.."
            className="focus:outline-none border-none p-2 rounded w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <input
            type="email"
            placeholder="Enter Email.."
            className="focus:outline-none border-none p-2 rounded w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <input
            type="number"
            placeholder="Enter Age.."
            className="focus:outline-none border-none p-2 rounded w-full"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            placeholder="Enter Password.."
            className="focus:outline-none border-none p-2 rounded w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            placeholder=" Confirm Password."
            className="focus:outline-none border-none p-2 rounded w-full"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white w-full py-2 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
