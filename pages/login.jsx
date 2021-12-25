import React, { useReducer, useState } from "react";
import { login } from "../utils/services/user.service";
import styles from "./login.module.scss";
const initialState = {
  username: "",
  password: "",
  description: "",
  image_url: "",
};

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

  const [open, setOpen] = React.useState(false);

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
      login(state.username, state.password).then(data => {
        console.log(data.data.tokens.access.token);
        localStorage.setItem('token',data.data.tokens.access.token);
      });
    }
  }

  const switchForm = () => {
    setIsLogin((login) => {
      return !login;
    });
  };

  const onChange = (e) => {
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

      <div className={styles.form}>
          <input type="text" placeholder="Insta Id" name="username" onChange={onChange} />
          <input type="password" placeholder="password" name="password" onChange={onChange} />
          {!isLogin && (
            <input
              type="text"
              placeholder="username"
              onChange={onChange}
              
            />
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
    </div>

  );
};
