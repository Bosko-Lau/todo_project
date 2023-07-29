"use client";
import Link from "next/link";
import { useState } from "react";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("test success");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username" className="m-2">
          Username
        </label>
        <input
          type="text"
          className="form-control m-2"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password" className="m-2">
          Password
        </label>
        <input
          type="password"
          className="form-control m-2"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary m-2">
        Login
      </button>
      <br />
      <br />
      <span className="m-2">Don't have an account?</span>{" "}
      <Link href="/createuser">Create user</Link>
    </form>
  );
};

export default Login;
