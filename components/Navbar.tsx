import Link from "next/link";
import { FC } from "react";
interface NavbarProps {
  loginStatus: boolean;
}

const Navbar: FC<NavbarProps> = (props: NavbarProps) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <Link href={"/"} className="navbar-brand m-2">
        Todo-app
      </Link>
      <Link href={"/createuser"} className="nav-item nav-link m-2">
        Create User
      </Link>
      <Link
        href={props.loginStatus ? "/" : "/login"}
        className="nav-item nav-link m-2"
      >
        {props.loginStatus ? "Logout" : "Login"}
      </Link>
    </nav>
  );
};

export default Navbar;
