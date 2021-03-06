import Link from "next/link";
import {React, useState} from "react";
import { login, userSignUp } from "../utils/services/user.service";
import TextField from '@mui/material/TextField';
import styles from '../pages/home.module.scss'
import Box from '@mui/material/Box';
import {ErrorMessage} from "../utils/common/commonUtil"
import CircularProgress from '@mui/material/CircularProgress';

export default function SignUp({handleOtpSent, influencer}) {
  const [signUpData, setSignUpData] = useState({email: '', name: '', mobile: ''})
  const [errorText, setErrorText] = useState({email: '', name: '', mobile: ''})
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(false)
  const signUp = async (e) => {
    e.preventDefault()
    const erroMsg = {name: '', mobile: '', email: ''}
    if (!signUpData.name) {
      erroMsg.name = 'Name is required'
    }
    if (!signUpData.mobile) {
      erroMsg.mobile = 'Mobile is required'
    }
    if (!signUpData.email) {
      erroMsg.email = 'Email is required'
    }
    const mobilePattern = /[^+0-9]+$/
    if (signUpData.mobile && mobilePattern.test(signUpData.mobile)) {
      erroMsg.mobile = 'Enter valid mobile number'
    }
    const emailPattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if (emailPattern.test(signUpData.email) == false) {
      erroMsg.email = 'Enter valid email'
    }
    setErrorText({...errorText,...erroMsg})
    if (erroMsg.name || erroMsg.mobile || erroMsg.email)  {
      return;
    }
    try {
      setLoading(true)
      const resp = await userSignUp(signUpData.name, signUpData.email, signUpData.mobile, influencer)
      setLoading(false)
      if (resp.status && resp.data.status == "error") {
        setErrors([resp.data.message])
      }
      else {
        setErrors([])
        if (resp.statusText == 'Created') {
          const otpResult = handleOtpSent('signup', signUpData.email) 
        }
      }
    }
    catch(e) {
      console.log(e)
      //setErrors([e.message])
    }

  }
return (
  <>
  {<ErrorMessage errors = {errors} />}
  <div>
    <h2>Sign Up</h2>
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
    <TextField
      type="text"
      label="Name"
      error={errorText.name? true: false}
      helperText = {errorText.name}
      fullWidth
      required={true}
      margin="normal"
      onChange={(e) => setSignUpData({...signUpData, name: e.target.value})}
      value={signUpData.name}
    />
    <TextField
      type="text"
      label="Mobile"
      error={errorText.mobile? true: false}
      helperText = {errorText.mobile}
      fullWidth
      required={true}
      margin="normal"
      onChange={(e) => setSignUpData({...signUpData, mobile: e.target.value})}
      value={signUpData.mobile}
    />
    <TextField
      hinttext="Email"
      floatinglabeltext="Email"
      type="email"
      label="Email"
      error={errorText.email? true: false}
      helperText = {errorText.email}
      fullWidth
      required={true}
      margin="normal"
      onChange={(e) => setSignUpData({...signUpData, email: e.target.value})}
      value={signUpData.email}
    />
      {!loading && <button onClick={signUp} className={styles.sendOTPButton}>Sign Up</button>}
      {loading && <div className={styles.progress}><CircularProgress /></div>}
    
    </Box>
    </div>
 </>)
}