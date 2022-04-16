import React from "react";
import styles from "./header.module.scss"

import Image from 'next/image'

import sampleImage from "../../../assets/images/Binge_Meee.png"


export default function Header() {
  return (
      <header className={styles.header}>
        {/* <img src="../../../assets/images/Binge_Meee.png" class="logo" alt="test"/> */}
        <Image src={sampleImage} width="160"  height="70" />
        {/* <Image
      // loader={myLoader}
      src="../../../assets/images/Binge_Meee.png"
      alt="Picture of the author"
      width={500}
      height={500}
    /> */}
      </header>
  );
}
