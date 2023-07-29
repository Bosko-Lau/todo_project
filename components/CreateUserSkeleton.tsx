"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { FC } from "react";
interface ReqBody {
  username: string;
  password: string;
  todos: string;
  authkey: string;
}

interface CreateUserSkeletonProps {
  authkey: string;
}

const CreateUserSkeleton: FC<CreateUserSkeletonProps> = (
  props: CreateUserSkeletonProps
) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const reqbody: ReqBody = {
    username,
    password,
    todos: "",
    authkey: process.env.AUTHKEY || "",
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Username or password not provided");
      return;
    }

    const res = await fetch("/api/checkuser", {
      method: "POST",
      body: JSON.stringify(reqbody),
    });

    const { status, authkey } = await res.json();
    if (!authkey) {
      alert("ERR NOT AUTHENICATED");
      return;
    }
    if (!status) {
      alert("Username already taken");
      return;
    }

    await fetch("/api/createuser", {
      method: "POST",
      body: JSON.stringify(reqbody),
    });
    alert("user successfully created!");
    const res2 = await fetch("/api/hashpassword", {
      method: "POST",
      body: JSON.stringify(reqbody),
    });
    const { hash } = await res2.json();
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

export default CreateUserSkeleton;
