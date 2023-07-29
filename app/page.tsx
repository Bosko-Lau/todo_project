import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1 className="m-2">Todo-app</h1>
      <p className="m-2">A todo app</p>
      <Link href={"/createuser"} className="m-2 btn btn-primary">
        Get started!
      </Link>
    </>
  );
}
