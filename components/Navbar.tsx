"use client";
import Link from "next/link";
import cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { FC } from "react";
interface NavbarProps {
  loginStatus: boolean;
}

const Navbar: FC<NavbarProps> = (props: NavbarProps) => {
  const router = useRouter();
  return (
    <nav className="navbar navbar-light bg-light">
      <Link href={"/"} className="navbar-brand m-2">
        Todo-app
      </Link>
      <Link href={"/createuser"} className="nav-item nav-link m-2">
        Create User
      </Link>
      <button
        onClick={() => {
          if (cookie.get("username") || cookie.get("password")) {
            cookie.remove("username");
            cookie.remove("password");
            router.push("/");
          } else {
            router.push("/login");
          }
        }}
        className="nav-item nav-link m-2"
      >
        {props.loginStatus ? "logout" : "login"}
      </button>
    </nav>
  );
};

export default Navbar;
