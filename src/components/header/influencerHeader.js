import React, { useState } from "react";
import MenuIcon from "../../../assets/images/menu.svg"
import Logo from "../../../assets/images/Binge_Meee.png"
import profileIcon from "../../../assets/images/defaultprof.jpg"
import ModalComponent from '../../../components/Modal'
import { modalStyle } from '../../../utils/common/commonUtil';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import {ErrorMessage} from "../../../utils/common/commonUtil"

import {logout, changePassword} from "../../../utils/services/user.service"
import Styles from "../layout/influencer.layout.module.scss"
import Image from "next/image"
import { useRouter } from "next/router";
import { Style } from "@mui/icons-material";
export default function InfluencerHeader({ children, Styles, ...props }) {
  const router = useRouter()
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [changePasswordData, setChangePasswordData] = useState({password: '', rePassword: ''})
  const [errorText, setErrorText] = useState({password: '', rePassword: ''})
  const [errors, setErrors] = useState([])
  const clearUserDetails = () => {
    logout();
    setShowProfileMenu(false)
    sessionStorage.clear();
    router.push('./login');
  }
  const handleChangePassword = () => {
    setShowProfileMenu(false)
    setShowChangePassword(true)
  }
  const changePasswordHandler = async (e) => {
    e.preventDefault()
    console.log(changePasswordData)
    if (changePasswordData.password != changePasswordData.rePassword) {
      setErrors(["Passwords mismatch"])
    }
    const changePass = await changePassword({password: changePasswordData.password})
    console.log(changePass)
    if (changePass.data && changePass.data.status == "error") {
      setErrors([changePass.data.message])
    }
    else {
      setErrors([])
      setShowChangePassword(false)
    }
  }
  return (
    <>
      <header className={Styles.Header}>
        <div className={Styles.menuWrapper}>
          <MenuIcon width={"24px"} height={"24px"}/>
        </div>
        <div className={Styles.logoWrapper}>
          <Image src={Logo} width="100%" height={"48px"}/>
        </div>
        {profileIcon && <div className={Styles.profileIconWrapper}>
          <Image src={profileIcon} width={"24px"} height={"24px"}  onClick={(e) => setShowProfileMenu(true)}/>
        </div>}
        {showProfileMenu && <div className={Styles.profileMenuWrapper}>
          <ul>
            <li onClick={handleChangePassword}>Change Password</li>
            <li onClick={clearUserDetails}>Logout</li>
          </ul>
        </div>
        }
      </header>
      {showChangePassword &&
        <ModalComponent open={showChangePassword} onClose={(e) => setShowChangePassword(false)} modalStyle={modalStyle} >
          <h2>Change Password</h2>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
          {<><ErrorMessage errors = {errors} /> <br /></>}
          <TextField
            type="password"
            label="Password"
            error={errorText.name? true: false}
            helperText = {errorText.name}
            fullWidth
            required={true}
            margin="normal"
            onChange={(e) => setChangePasswordData({...changePasswordData, password: e.target.value})}
            value={changePasswordData.password}
          />
           <TextField
            type="password"
            label="Re-Password"
            error={errorText.name? true: false}
            helperText = {errorText.name}
            fullWidth
            required={true}
            margin="normal"
            onChange={(e) => setChangePasswordData({...changePasswordData, rePassword: e.target.value})}
            value={changePasswordData.rePassword}
          />
          <button onClick={changePasswordHandler} className={Style.button}>Change Password</button>
          </Box>
        </ModalComponent>}
    </>
  )
}
