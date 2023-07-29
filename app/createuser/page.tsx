"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
interface ReqBody {
  username: string;
  password: string;
  todos: string;
}

const CreateUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const reqbody: ReqBody = {
    username,
    password,
    todos: "",
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Username or password not provided");
      return;
    }

    const res = await fetch("/api/createuser", {
      method: "POST",
      body: JSON.stringify(reqbody),
    });
    const { status, hash } = await res.json();
    if (!status) {
      alert("User with the same name already exists");
      return;
    }
    alert("user successfully created!");

    router.replace(`/todo?username=${username}&password=${hash}`);
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
          autoComplete="username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="password" className="m-2">
          Password
        </label>
        <input
          type="password"
          className="form-control m-2"
          name="password"
          value={password}
          autoComplete="new-password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary m-2">
        Create User
      </button>
      <br />
      <br />
      <span className="m-2">Already have an account?</span>{" "}
      <Link href="/login">Login</Link>
    </form>
  );
};

export default CreateUser;
