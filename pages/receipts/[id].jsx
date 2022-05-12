import React from "react";
import axios from "axios";
import {Container, Paper} from "@mui/material"
import styles from '../styles.module.scss'

const Receipts = ({receipt}) => {
  console.log(receipt)
  return (
    <Container maxWidth="sm" className={styles.receiptContainer}>
      <Paper elevation={2} className={styles.receiptPaper}>
          <div className={styles.receiptLogoWrapper}>
            <img src="https://home.bingemeee.com/assets/images/Binge_Meee.png" className={styles.receiptLogo}/>
            {receipt.receiptId && <><h3 className={styles.receiptHeader}>Receipt from Bingemeee.com</h3>
            <h5 className={styles.receiptId}>Receipt Number : {receipt.receiptId}</h5></>}
            {!receipt.receiptId && <h3 className={styles.receiptHeader}>Unable to fetch Receipt. Please check your mail find the valid Receipt link</h3>}
          </div>
          <div className={styles.receiptDetailsWapper}>
            <div>
              <div>AMOUNT PAID</div>
              <div>{receipt.amount}</div>
            </div>
            <div>
              <div>DATE PAID</div>
              <div>{receipt.paymentDate}</div>
            </div>
            <div>
              <div>PAYMENT METHOD</div>
              <div>{receipt.paymentMethod}</div>
            </div>
          </div>
          <h4 className={styles.receiptSummary}>Summary</h4>
          <div className={styles.receiptSummaryWrapper}>
            <div >
              <div>{receipt.productDetails.productTitle} <br /> {receipt.infulencer} </div>
              <div>{receipt.amount}</div>
            </div>
            <div>
              <div>Amount Charged</div>
              <div>{receipt.amount}</div>
            </div>
          </div>
          <div className={styles.receiptHr}></div>
          <p className={styles.receiptFooterText}>If you have any questions, visit our <a href="https://home.bingemeee.com/#contact">support site</a></p>
          <div className={styles.receiptHr}></div>

 	        <p className={styles.receiptFooterText}>Something wrong with the email? <a href="">View it in your browser</a>.</p>
 
          <p className={styles.receiptFooterText}>You're receiving this email because you made a purchase at <a href={`https://www.bingemeee.com/${receipt.infulencer}`}>bingemeee.com</a>, which partners with {receipt.paymentGateWay} to provide invoicing and payment processing.</p>
        </Paper>
    </Container>
    
  )
}

export const getServerSideProps = async(context) => {
  let receipt = {}
  if (context.query.id) {
    const baseUrl = process.env.apiBaseUrl;
    const result = await axios.get(`${baseUrl}payment/receipts/${context.query.id}`)  
    if (result.data && !result.data.status) {
      receipt = result.data
    }
  }
  console.log(receipt)
  return { props: {receipt}}
}

export default Receipts