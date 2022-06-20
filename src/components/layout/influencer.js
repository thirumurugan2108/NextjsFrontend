import React from "react";
import Header from "../header/influencerHeader"
import Styles from "./influencer.layout.module.scss"
import HomeIcon from "../../../assets/images/home.svg"
import Menu from "../Menu";

export default function InfluencerLayout({ children, ...props }) {
  return (
    <>
      <div id={Styles.container}>
        <Header Styles={Styles}/>
        <div className={Styles.contentContainer}>
          {children}
        </div>
      </div>
      <div className={Styles.footerWrapper}>
        <footer className={Styles.footer}>
          <Menu newTheme={true}/>
        </footer>
      </div>
    </>
  )
}
