import {React} from "react";
import styles from '../pages/influencer/home.module.scss'

export default function StatusCnfModal({confirmation, close}) {
return (
  <>
  <div>
    <h2>Confirm the Status Change</h2>                        
    <button onClick={confirmation} className={styles.sendCnfButton}>Yes</button>
    <button onClick={close} className={styles.sendCnfButton}>No</button>
    </div>
    
 </>)
}