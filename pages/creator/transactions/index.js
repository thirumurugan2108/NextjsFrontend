import React, { useEffect, useState } from "react";
import Layout from "../../../src/components/layout/influencer";
import ProfileIcon from "../../../assets/images/profile.svg"
import { useRouter } from 'next/router'
import { getTransactionsByUser } from "../../../utils/services/payment.service";
import Transactions from "../../../components/creator/transactions";
import Styles from "../influencer.home.module.scss"
import NativeSelect from '@mui/material/NativeSelect';
import Button from '@mui/material/Button';

const CreatorTransaction = () => {
  const router = useRouter();
  const queryParam = router.query && router.query.type? router.query.type : ''
  const [transactions, setTransactions] = useState([])
  const [page, setPage] = useState(1)
  const [resetPage, setResetPage] = useState(false)
  const [resetQueryParam, setResetQueryParam] = useState(false)
  const [displayLoadmore, setDisplayLoadmore] = useState(true)
  const fetchAllDetails = async () => {
    let [type,status] = ['', '']
    if (!resetQueryParam && queryParam.indexOf('-') !== -1) {
      [type,status] = queryParam.split('-')
    }
    else if (resetQueryParam && resetQueryParam.indexOf('-') !== -1) {
      [type,status] = resetQueryParam.split('-')
    }
    else {
      type = ''
      status = ''
    }
    const tranactionsData = await getTransactionsByUser({isCard: false, isSubscription: false, type,status, page});
    if (tranactionsData.status == 200 && tranactionsData.data) {
      if (tranactionsData.data.length == 0) {
        setDisplayLoadmore(false)
      }
      else {
        setDisplayLoadmore(true)
      }
      const transData = transactions.concat(tranactionsData.data)
      setTransactions(transData)
      return true
    }
    else {
      setTransactions([])
      return false
    }
  }
  const resetPageHandler = () => {
    setPage(1)
    setTransactions([])
    setResetPage(true)
    
  }
  const loadMore = () =>{
    setPage(page +1)
  }
  const handleFilter = (e) => {
    e.preventDefault()
      setTransactions([])
      setPage(1)
      setResetQueryParam(e.target.value)
      
      router.push({
        pathname:`/creator/transactions/`,
        query: {type: e.target.value}
      })
  }
  useEffect(async () => {
    if (!queryParam) { return false }
    const status = await fetchAllDetails();
    if (page == 1) {
      loadMore()
    }
    if (!status) {
      router.push('/login')
    }
  }, [queryParam, page, resetPage, resetQueryParam])
  return (
    <Layout>
      <h2>Transactions</h2>
      <div>
        Filter by
        <NativeSelect
        defaultValue={queryParam}
        className={Styles.dropdown}
        inputProps={{
          name: 'filter',
          id: 'transaction-type',
        }}
        onChange={handleFilter}
      >
        <option value={'all-success'}>Select Type</option>
        <option value={'cards-pending'}>Cards Pending</option>
        <option value={'cards-success'}>Cards Success</option>
        <option value={'post-success'}>Post</option>
        <option value={'subscription-success'}>Subscription</option>
      </NativeSelect>
      </div>
      
      {transactions && transactions.length > 0 && <div>
        <Transactions transactions={transactions} type={`trans-${page}`} resetPageHandle={resetPageHandler}/>
      </div>}
      {!transactions || transactions.length == 0 && <div>
        <div className={Styles.transactionHeadingWrapper}>
          <div className={Styles.Heading}>No Transaction found !!!</div>
        </div>
      </div>}
      {displayLoadmore && <div className={Styles.loadMoreButtonWrapper}>
        <button onClick={loadMore}>Load More</button>
      </div>}
    </Layout>
  )
}


CreatorTransaction.layout = Layout

export default CreatorTransaction