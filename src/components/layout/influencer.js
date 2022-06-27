import React, {useEffect, useState} from "react";
import Header from "../header/influencerHeader"
import Styles from "./influencer.layout.module.scss"
import HomeIcon from "../../../assets/images/home.svg"
import Menu from "../Menu";
import { Style } from "@mui/icons-material";

export default function InfluencerLayout({ children, ...props }) {
  const [superAdminLoginAs, setSuperAdminLoginAs] = useState('')
  useEffect(() =>{
    if (sessionStorage.getItem('loginAs')) {
      setSuperAdminLoginAs(sessionStorage.getItem('loginAsName'))
    }
  }, [])
  return (
    <>
      {superAdminLoginAs && <div className={Styles.superAdminWrapper}>
        <h3>Logged In as {superAdminLoginAs}</h3>
        <a href="/superadmin">Change User</a>
      </div>}
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
