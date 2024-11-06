import React, { useState } from "react";
import "./LoginSignup.css";
import axios from "axios";

const Signup = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  async function handleSubmit  (event) {
    event.preventDefault();
    const data = { username, password };
    const res = await axios.post('http://localhost:3000/api/v1/signup', data) ;
    console.log(res)
  }
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Signup</h1>
        <input
          onChange={(e) => setUserName(e.target.value)}
          value={username}
          type="text"
          placeholder="username"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="password"
        />
        <button>SignUp</button>
      </form>
    </div>
  );
};

export default Signup;
