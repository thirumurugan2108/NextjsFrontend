import * as React from "react";
import styles from "./footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
          <div className={styles.bottom_links}>
            <a href="https://creators.memberwire.com/terms-and-conditions.php" target="_blank">
              Terms and Conditions</a>|<a href="https://creators.memberwire.com/broadcaster-agreement.php"
              target="_blank">Broadcaster Agreement</a>|
              <a href="https://creators.memberwire.com/broadcaster-agreement.php"
              target="_blank">Refund Policy</a>
              |<a href="https://creators.memberwire.com/privacy-policy.php"
               className="bnone" target="_blank">Privacy
              Policy</a>
          </div>
          <h5>Copyright © 2022 bingemeee., Ltd. All Rights Reserved.</h5>
  </footer>
  );
}
