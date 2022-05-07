import {React} from "react";
import styles from '../pages/home.module.scss'

export default function StatusCnfModal({currentImageTrans}) {
return (
  <>
  <div>
      <h3>Transaction details for {currentImageTrans.title}</h3>
      <h3><b>No of sales : </b>{currentImageTrans.totalSales}</h3>
      <h3><b>Total Revenue </b>: {currentImageTrans.totalRevenue}</h3>  
  </div>
    
 </>)
}