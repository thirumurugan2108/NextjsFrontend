import * as React from 'react';
import styles from './home.module.scss'

export default function About() {
    
  return (
    <div className={styles.container}>
  <div className={styles.menu}>
    <div className={styles.logo}>
        <img src="data:image/png;base64,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" width="90" height="30"/>
    </div>
  </div>
  <div className={styles.main}>
    <h5 className={styles.title}>WELCOME TO MY OFFICIAL WEBSITE</h5>
    <p className={styles.subTitle} >CHECK OUT MY EXCLUSIVE PHOTOS AND VIDEOS</p>

    <div className={styles.contentSection}>
      <div className={styles.profileIconOuter}>
        <div className={styles.profileIconInner}>

        </div>

      </div>
      <h3>Elon Musk </h3>
      <p className={styles.connect}>Let's Connect</p>
      <div className={styles.slot}>

        <div className={styles.around}>
          <h4>DM on Instagram</h4>
          <p className={styles.chatContent}>Lets chat instagram for 10mins</p>
          <text>Rs:400</text>
        </div>

        <div className={styles.align}>
          
          <a>Booknow</a>
        </div>
      </div>
      <div className={styles.parentScroll}>
        <span className={styles.scroll}>
          <svg viewBox="0 0 448 512" width="25" className={styles.alt} fill="#757575">
            <path d="M400 256H152V152.9c0-39.6 31.7-72.5 71.3-72.9 40-.4 72.7 32.1 72.7 72v16c0 13.3 10.7 24 24 24h32c13.3 0 24-10.7 24-24v-16C376 68 307.5-.3 223.5 0 139.5.3 72 69.5 72 153.5V256H48c-26.5 0-48 21.5-48 48v160c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zM264 408c0 22.1-17.9 40-40 40s-40-17.9-40-40v-48c0-22.1 17.9-40 40-40s40 17.9 40 40v48z" />
          </svg>

          <a className={styles.unlock}>Unlock</a>
        </span>

        <span className={styles.scroll}>
          <div>
            <svg viewBox="0 0 448 512" width="25" className={styles.alt} fill="#757575">
              <path d="M400 256H152V152.9c0-39.6 31.7-72.5 71.3-72.9 40-.4 72.7 32.1 72.7 72v16c0 13.3 10.7 24 24 24h32c13.3 0 24-10.7 24-24v-16C376 68 307.5-.3 223.5 0 139.5.3 72 69.5 72 153.5V256H48c-26.5 0-48 21.5-48 48v160c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zM264 408c0 22.1-17.9 40-40 40s-40-17.9-40-40v-48c0-22.1 17.9-40 40-40s40 17.9 40 40v48z" />
            </svg>
            <a className={styles.unlock}>Unlock</a>
          </div>
        </span>
        <span className={styles.scroll}>
          <svg viewBox="0 0 448 512" width="25" className={styles.alt} fill="#757575">
            <path d="M400 256H152V152.9c0-39.6 31.7-72.5 71.3-72.9 40-.4 72.7 32.1 72.7 72v16c0 13.3 10.7 24 24 24h32c13.3 0 24-10.7 24-24v-16C376 68 307.5-.3 223.5 0 139.5.3 72 69.5 72 153.5V256H48c-26.5 0-48 21.5-48 48v160c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zM264 408c0 22.1-17.9 40-40 40s-40-17.9-40-40v-48c0-22.1 17.9-40 40-40s40 17.9 40 40v48z" />
          </svg>
          <a className={styles.unlock}>Unlock</a>
        </span>

        <span className={styles.scroll}>
          <svg viewBox="0 0 448 512" width="25" className={styles.alt} fill="#757575">
            <path d="M400 256H152V152.9c0-39.6 31.7-72.5 71.3-72.9 40-.4 72.7 32.1 72.7 72v16c0 13.3 10.7 24 24 24h32c13.3 0 24-10.7 24-24v-16C376 68 307.5-.3 223.5 0 139.5.3 72 69.5 72 153.5V256H48c-26.5 0-48 21.5-48 48v160c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zM264 408c0 22.1-17.9 40-40 40s-40-17.9-40-40v-48c0-22.1 17.9-40 40-40s40 17.9 40 40v48z" />
          </svg>
          <a className={styles.unlock}>Unlock</a>
        </span>
        <span className={styles.scroll}>
          <svg viewBox="0 0 448 512" width="25" className={styles.alt} fill="#757575">
            <path d="M400 256H152V152.9c0-39.6 31.7-72.5 71.3-72.9 40-.4 72.7 32.1 72.7 72v16c0 13.3 10.7 24 24 24h32c13.3 0 24-10.7 24-24v-16C376 68 307.5-.3 223.5 0 139.5.3 72 69.5 72 153.5V256H48c-26.5 0-48 21.5-48 48v160c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zM264 408c0 22.1-17.9 40-40 40s-40-17.9-40-40v-48c0-22.1 17.9-40 40-40s40 17.9 40 40v48z" />
          </svg>
          <a className={styles.unlock}>Unlock</a>
        </span>

        <span className={styles.scroll}>
          <svg viewBox="0 0 448 512" width="25" className={styles.alt} fill="#757575">
            <path d="M400 256H152V152.9c0-39.6 31.7-72.5 71.3-72.9 40-.4 72.7 32.1 72.7 72v16c0 13.3 10.7 24 24 24h32c13.3 0 24-10.7 24-24v-16C376 68 307.5-.3 223.5 0 139.5.3 72 69.5 72 153.5V256H48c-26.5 0-48 21.5-48 48v160c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zM264 408c0 22.1-17.9 40-40 40s-40-17.9-40-40v-48c0-22.1 17.9-40 40-40s40 17.9 40 40v48z" />
          </svg>
          <a className={styles.unlock}>Unlock</a>
        </span>
      </div>
    </div>


  </div>

</div>
  );
}
