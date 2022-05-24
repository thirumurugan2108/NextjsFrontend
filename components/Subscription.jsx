import {React, useState} from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import RupeeIcon from '../assets/images/rupee.png';
import Image from 'next/image'

import styles from '../pages/home.module.scss'
import {ErrorMessage} from "../utils/common/commonUtil"


export default function SubscriptionForm({subscription, handleSelection}) {
  const [subscriptionSelection, setSubscriptionSelection] = useState('')
  return (
  <>
    <div >
      <h2 className={styles.modelTitle}>Choose Your Plan</h2>
      <FormControl className={styles.subscription}>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="monthly"
        name="subscription"
        onChange={(e) => setSubscriptionSelection(e.target.value)}
      >
      {subscription.map(sub => {
        let wrapperClass = styles.subscriptionWrapper
        if (subscriptionSelection == sub.name) {
          wrapperClass = styles.subscriptionWrapperActive
        }
        return (
          <div className={wrapperClass} key={sub.name}>
            <div className={styles.subscriptionHeadingWrapper}>
              <h5>{sub.name}</h5>
              <FormControlLabel value={sub.name} control={<Radio />} label="" />
            </div>
            <div className={styles.subscriptionPrice}>
              <Image src={RupeeIcon} width={12} height={12}/> {sub.price}/{sub.priceLabel}
            </div>
            {sub.discount !=0 && <div className={styles.subscriptionDiscount}>{sub.discount}% discount</div>}
            <div className={styles.subscriptionDesc}>Access to all posts for {sub.duration} month</div>
          </div>
        )
      })}
      </RadioGroup>
      </FormControl>
      <div className={styles.subscriptionButtonWrapper} >
        <button onClick={(e)=> handleSelection(subscriptionSelection)} className={styles.sendOTPButton}>Continue Checkout</button>
      </div>
      </div>
      
      
  </>)
}