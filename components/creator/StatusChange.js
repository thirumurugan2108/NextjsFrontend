import {React} from "react";
import styles from './statusChange.module.scss'
import NativeSelect from '@mui/material/NativeSelect';
import Button from '@mui/material/Button';

export default function StatusChange({transaction, close, saveStatusConf, onStatusChange}) {
return (
  <>
    <h1 className={styles.h1}>User details</h1>
    <div>
      <div className={styles.modalContainer}>
      <span className={styles.labelModal}><b>Name</b></span>
      <span className={styles.modalValue}>{transaction.userName}</span>
      <span className={styles.labelModal}><b>Email Id</b></span>
      <span className={styles.modalValue}>{transaction.email}</span>
      <span className={styles.labelModal}><b>Contact</b></span>
      <span className={styles.modalValue}>{transaction.phone}</span>

      {transaction.comments && transaction.comments !== '' && <>
        <span className={styles.labelModal}><b>Comments</b></span>
        <span className={styles.modalValue}>{transaction.comments}</span>

        <span className={styles.labelModal}><b>Title</b></span>
        <span className={styles.modalValue}>{transaction.prodTitle}</span>

        <span className={styles.labelModal}><b>Description</b></span>
        <span className={styles.modalValue}>{transaction.prodDesc}</span>
      </>}

      <span className={styles.labelModal}><b>Status</b>
      </span>
      <NativeSelect
        defaultValue={transaction.status}
        className={styles.dropdown}
        inputProps={{
          name: 'status',
          id: 'uncontrolled-native',
        }}
        onChange={(e) => onStatusChange(e)}
      >
        <option value={'pending'}>Pending</option>
        <option value={'success'}>Success</option>

      </NativeSelect>
    </div>

    <div>
      <Button variant="outlined" onClick={close} >Cancel</Button>
      <Button variant="outlined" className={styles.save} onClick={saveStatusConf}>Save</Button>
    </div>
  </div>
 </>)
}