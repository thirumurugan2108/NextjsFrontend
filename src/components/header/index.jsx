import React from "react";
import styles from "./header.module.scss"




export default function Header() {
  return (
      <header className={styles.header}>
        <h3 className={styles.title}>Bing Mee</h3>
      </header>
  );
}
