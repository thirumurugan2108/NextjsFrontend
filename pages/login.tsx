import React, { useReducer, useState } from "react";

import Snackbar from "@mui/material/Snackbar";

import Link from "next/link";
import { firebaseClient } from "../firebaseClient";
import { login } from "../utils/services/user.service";
import styles from "./login.module.scss";
const initialState = {
  site_url: "",
  title: "",
  description: "",
  image_url: "",
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case "fetchfromdb":
      return {
        ...action.payload,
      };
    case "generic":
      return {
        ...state,
        [action.field]: action.value,
      };
    default:
      return {
        ...state,
      };
  }
}

export default (_props: any) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [state, dispatch] = useReducer(reducer, initialState);

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event:any, reason: any) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const switchForm = () => {
    setIsLogin((login) => {
      return !login;
    });
  };

  const onChange = (e: any) => {
    console.log(e.target.name);
    dispatch({ type: "generic", field: e.target.name, value: e.target.value });
  };

  const action = (
    <React.Fragment>
      <button >
        UNDO
      </button>
      
    </React.Fragment>
  );

  return (
    <div className={styles.overallContainer}>
      {/* <button onClick={handleClick}>Open simple snackbar</button>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Note archived"
        action={action}
      /> */}

      {/* <Link href="/">
        <a>Go back to home page</a>
      </Link>
      <br />
      <h1>Login</h1>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={"Email"}
      />
      <input
        type={"password"}
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        placeholder={"Password"}
      />
      <button
        onClick={async () => {
          await firebaseClient
            .auth()
            .createUserWithEmailAndPassword(email, pass);
          window.location.href = "/";
        }}
      >
        Create account
      </button>
      <button
        onClick={() => {
          // await firebaseClient.auth().signInWithEmailAndPassword(email, pass);
          // window.location.href = '/';
          login(email, pass);
        }}
      >
        Log in
      </button> */}

        <div className={styles.form}>
          <form className={styles.loginForm}>
            <input type="text" placeholder="username" onChange={onChange} />
            <input type="password" placeholder="password" onChange={onChange} />
            {!isLogin && (
              <input
                type="text"
                placeholder="email address"
                onChange={onChange}
              />
            )}
            <button>{!isLogin ? 'Sign Up' : 'Login'}</button>
            <p className={styles.message}>
              {isLogin && (
                <>
                  {" "}
                  Not registered?{" "}
                  <a href="#" onClick={() => switchForm()}>
                    Create an account
                  </a>
                </>
              )}
              {!isLogin && (
                <>
                  {" "}
                  <p className={styles.message} onClick={() => switchForm()}>
                    Already registered? <a href="#"> Sign In</a>
                  </p>
                </>
              )}
            </p>
          </form>
        </div>
      </div>
   
  );
};
