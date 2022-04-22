import { useRouter } from "next/dist/client/router";
import React, { useReducer, useState } from "react";
import { login, signup } from "../utils/services/user.service";
import styles from "./login.module.scss";
import Header from "../src/components/header";
const initialState = {
  name: "",
  email: "",
  password: "",
  fullName: "",
  description: "",
  image_url: "",
};

import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



function reducer(state, action) {
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

export default (_props) => {
  const [isLogin, setIsLogin] = useState(true);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [errorMessage, setErrorMessage] = useState('');
  const [open, setOpen] = React.useState(false);
  const [isSignUpSucess, setSignUpSucess] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const loginOrSignUp = () => {
    if (isLogin) {
      login(state.name, state.password).then(data => {
        sessionStorage.setItem('token', data.data.tokens.access.token);
        sessionStorage.setItem('refreshToken', data.data.tokens.refresh.token);
        sessionStorage.setItem('name', data.data.user.name);
        router.push('./service-history');
        // router.back();
      }).catch( err => {
        setErrorMessage(err.response.data.message);
      });
    } else {
      signup(state.name, state.email, state.password, state.fullName).catch( err => {
        setErrorMessage(err.response.data.message);
        setSignUpSucess(false);
      }).then( data => {
        if(data){
          setSignUpSucess(true);
          window.scrollTo(0, 0);
          setErrorMessage('');
          
        }
      });
    }
  }

  const switchForm = () => {
    setIsLogin((login) => {
      return !login;
    });
  };

  const onChange = (e) => {
    dispatch({ type: "generic", field: e.target.name, value: e.target.value });
  };

  const action = (
    <React.Fragment>
      <button >
        UNDO
      </button>

    </React.Fragment>
  );

  const SignUpSuccessMessage = () => {
    return (
      <Alert severity="success" className={styles.signUpMessage}>You have successfully registered ! Our team will contact you shortly !</Alert>
    )
  }

  const ErrorMessage = () => {
    return (
      <Alert severity="error" className={styles.signUpMessage}>{errorMessage}</Alert>
    )
  }

  return (
    <div className={styles.overallContainer}>
      <Header></Header>
      {isSignUpSucess && <SignUpSuccessMessage></SignUpSuccessMessage>}
      <div className={styles.form}>
        <input type="text" placeholder="Insta Id/ Username" name="name" onChange={onChange} />
        <input type="password" placeholder="password" name="password" onChange={onChange} />
        {!isLogin && (
          <>
            <input
              type="text"
              placeholder="Full name"
              onChange={onChange}
              name="fullName"
            />
            <input
              type="email"
              placeholder="Email"
              onChange={onChange}
              name="email"
            />
          </>
        )}
        <button onClick={() => loginOrSignUp()}>{!isLogin ? 'Sign Up' : 'Login'}</button>
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
      </div>
      
      {errorMessage !== '' && <ErrorMessage></ErrorMessage>}
    </div>

  );
};
