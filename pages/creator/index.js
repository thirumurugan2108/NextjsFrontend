import React, { useEffect, useState } from "react";
import Layout from "../../src/components/layout/influencer";
import Styles from "./influencer.home.module.scss"
import ArrowIcon from "../../assets/images/arrow.svg"
import ProfileIcon from "../../assets/images/profile.svg"
import Chart from "../../components/Chart"
import { useRouter } from 'next/router'

import { getpaymentdetailsByUser, updatePaymentStatus } from "../../utils/services/payment.service";

const InfulencerHome = () => {
  const router = useRouter();
  const [influencerState, setInfluencerState] = useState({username: '', totalRevenue: 0, paid: 0, balance: 0, transactions: [], graph: ''});
  const [OtherTransactionRender, setOtherTransactionRender] = useState('')
  const [PendingTransactionRender, setPendingTransactionRender] = useState('')
  const [otherTransactionDisplay, setOtherTransactionDisplay] = useState(false)
  const [pendingTransactionDisplay, setPendingTransactionDisplay] = useState(false)
  const fetchAllDetails = async () => {
    const paymentDetails = await getpaymentdetailsByUser();
    if (paymentDetails.status == 200 && paymentDetails.data.username) {
      setInfluencerState(
          {
          //paymentDetails: paymentDetails.data,
          username: paymentDetails.data.username,
          totalRevenue: paymentDetails.data.totalRevenue,
          paid: paymentDetails.data.paid,
          balance: paymentDetails.data.balance,
          transactions: paymentDetails.data.transactions,
          graph: paymentDetails.data.graph
        }
      )
      return true
    }
    else {
      return false
    }

  }

  const transactionTemplate = async (tranactions, type) => {
    const task = tranactions.map((trans, index) => {
      const transactionsType = trans.isCard == true ? "Card" : 
      trans.isSubscription ? "Subscription" : trans.isVideo ? "Video"  : trans.isImage ? "Image" : "" 
      const key = `${type}-${index}`
      return (
        <div className={Styles.transactionWrapper} key={key}>
              <div className={Styles.userImage}><ProfileIcon /></div>
              <div className={Styles.userDetailWrapper}>
                <div className={Styles.userName}>{trans.userName}</div>
                <div className={Styles.tranactionType}>{transactionsType}</div>
              </div>
              <div className={Styles.amountWrapper}>
                <div className={Styles.date}>{trans.date}</div>
                <div className={Styles.amount}>{trans.price}</div>
              </div>
            </div>
      )
    })

    return await Promise.all(task)
    
  }

  useEffect(async () => {
    const status = await fetchAllDetails();
    if (influencerState.username) {
      const pendingCardTransactions = influencerState.transactions.filter(trans => trans.isCard == true && trans.status=='pending')
      const otherTransactions = influencerState.transactions.filter(trans => trans.isCard != true && trans.status !='pending' )
      if (pendingCardTransactions.length > 0) {
        const pendingCardTransaction = await transactionTemplate(pendingCardTransactions, 'pending')
        setPendingTransactionRender(pendingCardTransaction)
        setPendingTransactionDisplay(true)
      }
      if (otherTransactions.length > 0) {
        const otherTransaction =  await transactionTemplate(otherTransactions, 'other')
        setOtherTransactionRender(otherTransaction)
        setOtherTransactionDisplay(true)
      }
    }
    
    if (!status) {
      router.push('/login')
    }
  }, [influencerState.username])
  
  return (
    <Layout>
      <div className={Styles.earnings}>
          ₹ {influencerState.totalRevenue}
      </div>
      <div className={Styles.incomePaidWrapper}>
        <div className={Styles.pageButton}>
          <div className={Styles.buttonTextWrapper}>
            <div className={Styles.iconBuyWrapper}>
              <ArrowIcon className={Styles.buyIcon}/>
            </div>
            <div>
              <div className={Styles.buttonTitle}>Income</div>
              <div className={Styles.buttonText}>{influencerState.balance}</div>
            </div>
          </div>
        </div>
        <div className={Styles.pageButton}>
          <div className={Styles.buttonTextWrapper}>
            <div className={Styles.iconSellWrapper}>
              <ArrowIcon className={Styles.sellIcon}/>
            </div>
            <div>
              <div className={Styles.buttonTitle}>Paid</div>
              <div className={Styles.buttonText}>{influencerState.paid}</div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className={Styles.Heading}>Income</div>
        <div className={Styles.ChartSubheading}>01/05 - 07/05</div>
        <Chart data={influencerState.graph}/>
      </div>
      {pendingTransactionDisplay == true && <div>
        <div className={Styles.transactionHeadingWrapper}>
          <div className={Styles.Heading}>Cards Pending Transactions</div>
          <div className={Styles.viewAll}>View All >></div>
        </div>
        <div className={Styles.transactionContainer}>
         {PendingTransactionRender}
        </div>
      </div>}

       {otherTransactionDisplay == true && <div>
        <div className={Styles.transactionHeadingWrapper}>
          <div className={Styles.Heading}>Transactions</div>
          <div className={Styles.viewAll}>View All >></div>
        </div>
        <div className={Styles.transactionContainer}>
          {OtherTransactionRender}
          
        </div>
      </div>} 

    </Layout>
  )
}

InfulencerHome.layout = Layout

export default InfulencerHome