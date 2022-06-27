import { useEffect, useState } from "react"

import Styles from "./transactions.module.scss"
import ProfileIcon from "../../assets/images/profile.svg"
import ModalComponent from '../../components/Modal'
import StatusChange from "./StatusChange"
import StatusCnfModal from "../StatusCnf"
import { updatePaymentStatus } from "../../utils/services/payment.service";
import { modalStyle } from '../../utils/common/commonUtil';
import {useRouter} from "next/router"

const Transactions = ({transactions, type}) => {
  const router = useRouter()
  const [TransactionRender, setTransactionRender]= useState ('')
  const [TransactionRenderDisplay, setTransactionRenderDisplay]= useState (false)
  const [currentTransaction, setCurrentTransaction] = useState(false)
  const [statusCnfModalOpen, setStatusCnfModalOpen] = useState(false)
  const [isStatusChanged, setStatusChanged] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const handleTransactionStatus = (e, trans, transactionsType) => {
    e.preventDefault()
    
    if (transactionsType != 'Card') { return false }
    setCurrentTransaction(trans)
  }
  const handleStatusClose = (e) => {
    e.preventDefault()
    setCurrentTransaction(false)
  }
  const saveStatusConf = async () => {
    setStatusCnfModalOpen(true)
  }
  const saveSatus = async () => {
    // save the status to backend..call the service here
    setStatusCnfModalOpen(false)
    console.log(isStatusChanged)
    console.log(currentTransaction)
    if (isStatusChanged && currentTransaction.id) {
      await updatePaymentStatus(currentTransaction.id, newStatus);
      router.reload()
    }
    setStatusChanged(false);
    setCurrentTransaction(false)
   // await fetchAllDetails();
  }

  const hideUserDetailsModal = () => {
    setdisplayModal(false);
    setStatusChanged(false);
  }

  const onStatusChange = (e) => {
    if (currentTransaction.status === e.target.value) {
      setStatusChanged(false);
    } else {
      setNewStatus(e.target.value)
      setStatusChanged(true);
    }
  }

  const handleStsCnfClose = (e) => {
    setStatusCnfModalOpen(false)
    setStatusChanged(false);
    setCurrentTransaction(false)
  }

  useEffect(async () => {
    const task = transactions.map((trans, index) => {
      const transactionsType = trans.isCard == true ? "Card" : 
      trans.isSubscription ? "Subscription" : trans.isVideo ? "Video"  : trans.isImage ? "Image" : "" 
      const key = `${type}-${index}`
      return (
        <div className={Styles.transactionWrapper} key={key} onClick ={(e) => handleTransactionStatus (e, trans, transactionsType) }>
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
    
    const transactionRender = await Promise.all(task)
    setTransactionRender(transactionRender)
    setTransactionRenderDisplay(true)
  }, [type])
  return (
    <>
    {TransactionRenderDisplay == true &&
      <div className={Styles.transactionContainer}>
        {TransactionRender}
      </div>
    }
    {currentTransaction &&
        <ModalComponent open={currentTransaction} onClose={handleStatusClose} modalStyle={modalStyle} >
          <StatusChange transaction={currentTransaction} close={handleStatusClose} saveStatusConf={saveStatusConf} onStatusChange={onStatusChange}/>
        </ModalComponent>}
        {statusCnfModalOpen &&
        <ModalComponent open={statusCnfModalOpen} onClose={handleStsCnfClose} modalStyle={modalStyle} >
          <StatusCnfModal confirmation={saveSatus} close={handleStsCnfClose} />
        </ModalComponent>}
    </>
  )
}

export default Transactions