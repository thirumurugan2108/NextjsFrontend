import React, { useState, useEffect } from "react";
import styles from "./popup18plus.module.scss"

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { modalStyle } from '../../../utils/common/commonUtil';
export default function Popup18plus() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(()=>{
    setIsOpen(!localStorage.getItem('is18Verified'))
  },[])
  return (
    <>
      <Modal
        open={isOpen}
        // onClose={() => { setIsOpen(false) }}
      >
        <Box sx={modalStyle}>
         <h2 className={styles.center}>You need to be 18 years of age or over to enter this site</h2>
         <p className={styles.center}>By clicking here yiy are declaring you are 18 years of age or over.</p>
         <button className={`${styles.center} ${styles.button}`} onClick={() => { setIsOpen(false)
        localStorage.setItem('is18Verified', true);
        }}>Yes,I'm over 18 years</button>
        </Box>
      </Modal>
    </>
  );
}
