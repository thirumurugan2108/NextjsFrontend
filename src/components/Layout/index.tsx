// import Head from "next/head";0
// import Image from "next/image";
import Menu from "../Menu";
import styles from "./layout.module.css";

// import Link from "next/link";

// const name = "Thiru";
export const siteTitle = "Next.js Sample Website";

const newLocal = <header className={styles.header}>
  <h3 className={styles.title}>Bing Mee</h3>
</header>;
export default function Layout({
  children,
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
  return (
    <>
      {newLocal}
      <main>{children}</main>
      <Menu></Menu>
    </>
  );
}
