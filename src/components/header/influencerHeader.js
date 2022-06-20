import React from "react";
import MenuIcon from "../../../assets/images/menu.svg"
import Logo from "../../../assets/images/Binge_Meee.png"
import profileIcon from "../../../assets/images/defaultprof.jpg"
import Image from "next/image"
export default function InfluencerHeader({ children, Styles, ...props }) {
  console.log(profileIcon)
  return (
    <>
      <header className={Styles.Header}>
        <div className={Styles.menuWrapper}>
          <MenuIcon width={"24px"} height={"24px"}/>
        </div>
        <div className={Styles.logoWrapper}>
          <Image src={Logo} width="100%" height={"48px"}/>
        </div>
        {profileIcon && <div className={Styles.profileIconWrapper}>
          <Image src={profileIcon} width={"24px"} height={"24px"}  />
        </div>}
      </header>
    </>
  )
}
