import {React, useState} from "react";
import { verifySignupOTP, verifyOTP } from "../utils/services/user.service";
import TextField from '@mui/material/TextField';
import styles from '../pages/home.module.scss'
import {ErrorMessage} from "../utils/common/commonUtil"


export default function OtpForm({type, email, processVerifiedOtp}) {
  const heading = type == 'signup' ? 'Verify your Signup' : 'Verify your login'
  const [otpData, setOtpData] = useState({otp: ''})
  const [errorText, setErrorText] = useState({otp: ''})
  const [errors, setErrors] = useState([]);
  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    const erroMsg = {otp: ''}
    console.log(otpData)
    if (!otpData.otp) {
      setErrors(['OTP is required'])
    }
    else {
      try {
        let resp;
        if (type == 'email') {
          resp = await verifySignupOTP(otpData.otp, email)
        }
        else {
          resp = await verifyOTP(otpData.otp, email)
        }
        if (resp.status && resp.data.status == "error") {
          setErrors([resp.data.message])
        }
        else {
          setErrors([])
          if (resp.statusText == 'Created') {
            console.log(resp)
            processVerifiedOtp(resp.data.user, resp.data.tokens, resp.data.paidProductIds)
          }
          else {
            setErrors(["Invalid OTP"])
          }
        }
      }
      catch(e) {
        console.log(e)
      }
    }
  }
return (
  <>
  {<ErrorMessage errors={errors} />}
  <div>
    <h2>{heading}</h2>                        
    <TextField
      type="text"
      label="OTP"
      error={errorText.otp? true: false}
      helperText = {errorText.otp}
      fullWidth
      required={true}
      onChange={(e) => setOtpData({...otpData, otp: e.target.value})}
      value={otpData.otp}
    />
      <button onClick={handleVerifyOtp} className={styles.sendOTPButton}>Verify OTP</button>
    </div>
    
 </>)
}