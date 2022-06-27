import React, {useEffect, useState} from "react";

import Menu from "../Menu";
import Header from "../header";
import Styles from "./layout.module.scss"

export const siteTitle = "Next.js Sample Website";

export default function Layout({
  children,
}) {
  const [superAdminLoginAs, setSuperAdminLoginAs] = useState(null)
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
      <Header></Header>
      <main>{children}</main>
      <Menu></Menu>
    </>
  );
}
