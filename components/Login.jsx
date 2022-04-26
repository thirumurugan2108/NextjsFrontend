import Link from "next/link";
import {React, useState, forwardRef} from "react";
import { userLogin } from "../utils/services/user.service";
import TextField from '@mui/material/TextField';
import styles from '../pages/influencer/home.module.scss'
import {ErrorMessage} from "../utils/common/commonUtil"
import CircularProgress from '@mui/material/CircularProgress';


export default function Login({openSignupModal, handleOtpSent}) {
 

  const [loginData, setLoginData] = useState({email: ''})
  const [errorText, setErrorText] = useState({email: ''})
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false)

  const sendOTP = async () => {
   if (!loginData.email) {
    setErrors(['Email is required'])
   }
   else {
    try {
      setLoading(true)
      const resp = await userLogin(loginData.email)
      setLoading(false)
      if (resp.status && resp.data.status == "error") {
        setErrors([resp.data.message])
      }
      else {
        setErrors([])
        if (resp.statusText == 'Created') {
          const otpResult = handleOtpSent('login', loginData.email)
        }
      }
    }
    catch(e) {
      console.log(e)
      //setErrors([e.message])
    }
   }
  }
return (
  <>
  {<ErrorMessage errors={errors} />}
  <div>
    <h2>Login</h2>                        
    <TextField
      hinttext="Email"
      floatinglabeltext="Email"
      type="email"
      label="Email"
      errortext=""
      fullWidth
      required={true}
      onChange={(e) => setLoginData({...loginData, email: e.target.value})}
      value={loginData.email}
    />
      {!loading && <button onClick={() => sendOTP()} className={styles.sendOTPButton}>Send OTP</button>}
      {loading && <div className={styles.progress}><CircularProgress /></div>}
    </div>
    <div className={styles.signupLinkWrapper}>
    or
      <Link href="#"><a onClick={openSignupModal}>Sign Up</a></Link>
    </div>
 </>)
}