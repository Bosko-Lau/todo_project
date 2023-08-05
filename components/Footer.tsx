"use client";
import { useState } from "react";
import styles from "@/components/Footer.module.css";

const Footer = () => {
  const [visible, setVisible] = useState(true);
  return (
    <>
      {visible ? (
        <div className={styles.footer}>
          <span className="m-2 text-white">
            This website uses cookies to manage user data
          </span>
          <button
            className="btn btn-warning m-2"
            onClick={() => setVisible(false)}
          >
            ok
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
export default Footer;
