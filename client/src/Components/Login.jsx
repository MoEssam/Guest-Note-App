import React from "react";
import axios from "axios";

function Login() {
  const myStorage = window.localStorage;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const user = {
      email: data.get("email"),
      name: data.get("name"),
    };
    const res = await axios.post("http://localhost:4000/login", user);
    console.log(res);
    myStorage.setItem("userId", res.data[0].id);
  };

  return (
    <div className="form">
      <div>
        <h1>User Login</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <label className="label">Name</label>
        <input className="input" type="text" id="name" name="name" />

        <label className="label">Email</label>
        <input className="input" type="email" id="email" name="email" />

        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
