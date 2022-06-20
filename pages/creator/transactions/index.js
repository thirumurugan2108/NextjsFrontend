import React, { useEffect, useState } from "react";
import Layout from "../../../src/components/layout/influencer";
import ProfileIcon from "../../../assets/images/profile.svg"
import { useRouter } from 'next/router'
import { getTransactionsByUser } from "../../../utils/services/payment.service";

const CreatorTransaction = () => {
  const router = useRouter();
  const [tranactions, setTransactions] = useState([])
  const fetchAllDetails = async () => {
    const tranactionsData = await getTransactionsByUser({isCard: false, isSubscription: false});
    if (tranactionsData.status == 200 && tranactionsData.data) {
      setTransactions(tranactionsData.data)
      return true
    }
    else {
      return false
    }

  }
  useEffect(async () => {
    const status = await fetchAllDetails();
    if (!status) {
      router.push('/login')
    }
  }, [])
  return (
    <>
    </>
  )
}


CreatorTransaction.layout = Layout

export default CreatorTransaction