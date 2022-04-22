import React, { useEffect, useState } from "react";
import styles from "./header.module.scss"

import Image from 'next/image'

import sampleImage from "../../../assets/images/Binge_Meee.png"
import {logout} from "../../../utils/services/user.service"
import { useRouter } from "next/router";

export default function Header() {
  const [isLoggedIn, SetIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem('refreshToken')) {
      SetIsLoggedIn(true);
    }
  }, [])

  const clearUserDetails = () => {
    logout();
    sessionStorage.clear();
    router.push('./login');
  }

  return (
    <header className={styles.header}>
      <Image src={sampleImage} width="160" height="70" />
      {isLoggedIn && <button onClick={() => clearUserDetails()}>Logout</button>}
    </header>
  );
}
