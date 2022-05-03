// import { Link } from "@mui/material";
import * as React from "react";
import styles from "./footer.module.scss";
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.bottom_links}>
        <Link href="/terms-and-conditions"> 
          Terms and Conditions</Link>|<Link href="/broadcaster-agreement"
            >Broadcaster Agreement</Link>|
        <Link href="/refund-policy"
          >Refund Policy</Link>|
        <Link href="https://home.bingemeee.com/#contact"
            >Contact Us</Link>|
        |<Link href="/privacy-policy"
          >Privacy
          Policy</Link>
      </div>
      <h5>Copyright © 2022 bingemeee., Ltd. All Rights Reserved.</h5>
    </footer>
  );
}
