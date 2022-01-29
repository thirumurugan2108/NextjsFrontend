import React, { useState } from "react";
import Layout from "../../src/components/layout";
import styles from "./addOrEditPost.module.scss";
import { useReducer } from "react";
import { updatePost, upsertPost } from "../../utils/services/post.service";
import { useConfigState, useConfigSetState } from "../../utils/context/postContext";
import UploadBox from "../../utils/sharedComponents/uploadBox/uploadBox";
import { getExtensionFromFileName } from "../../utils/common/commonUtil";

import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import * as Yup from 'yup';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const initialState = {
  title: "",
  price: "",
  image: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "editMode":
      return {
        ...action.payload,
      };
    case "clear":
      return {
        ...initialState
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

const addOrEditPost = (_props) => {
  const [image, setImage] = useState("");
  const [isImage, setIsImage] = useState(true);
  const [isSucess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState([]);
  const setConfigState = useConfigSetState();
  const configState = useConfigState();

  const [state, dispatch] = useReducer(reducer, initialState);


  const [open, setOpen] = useState(false);

  let validationSchema = Yup.object({
    title: Yup.string()
      .required('please enter title '),
    price: Yup.string()
      .required('please enter price '),
  });

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const onChange = (e) => {
    console.log(e.target.value);
    console.log(e.target.name);
    dispatch({ type: "generic", field: e.target.name, value: e.target.value });
  };

  React.useEffect(() => {
    if (configState !== null && configState !== undefined) {
      console.log(configState)
      dispatch({ type: "editMode", payload: configState });
      setImage(configState.fileUrl);
      if (configState.isVideo) {
        setIsImage(false);
      } else {
        setIsImage(true);
      }
    }
    return () => {
      resetValues();
    }
  }, []);

  const updloadFile = (event) => {
    var file = event.target.files[0];

    if (file.type === 'video/mp4') {
      setIsImage(false);
    } else {
      setIsImage(true);
    }
    var reader = new FileReader();
    reader.readAsDataURL(file);
    setImage(URL.createObjectURL(file));
    reader.onloadend = function () {
      // dispatch({ type: "generic", field: "image", value: reader.result });
      dispatch({ type: "generic", field: "imageFile", value: file });
      dispatch({ type: "generic", field: "extensionName", value: getExtensionFromFileName(file.name) });
    }.bind(this);
  };

  const submit = () => {
    window.scrollTo(0, 0);
    if(!image){
      validationSchema = validationSchema.shape({
        imageFile: Yup.string()
          .required('please upload a file!'),
      });
    }
    // console.log('state');
    console.log(state);
    validationSchema.validate(state, { abortEarly: false })
      .catch((err) => {
        err.name; // => 'ValidationError'
        err.errors; // => [{ key: 'field_too_short', values: { min: 18 } }]
        console.log(err.errors);
        setErrors(err.errors);
        console.log(err.errors);
        console.log(err.name);
      })
      .then((valid) => {
        if (valid) {
          setErrors([]);
          setIsSuccess(true)
          resetValues();
            valid; // => true
            console.log(valid);
          if (state.imageFile) {
            let formdata = new FormData();
            formdata.set('title', state.title);
            formdata.set('price', state.price);
            // ...(uuid && { uuid }),
            if (state.uuid) {
              formdata.set('uuid', state.uuid);
            }
  
            formdata.set('file', state.imageFile);
            formdata.set('extensionName', state.extensionName);
            upsertPost(formdata);
          } else {
            updatePost({
              title: state.title,
              price: state.price,
              id: state.id
            })
          }
        } else {
          setIsSuccess(false);
        }
      });

  }

  const addNew = () => {
    resetValues();
    window.scrollTo(0, 0);
  }

  function resetValues() {
    dispatch({ type: "clear", payload: {} });
    setConfigState({});
    setImage('');
  }

  const ErrorNotification = () => {
    console.log(errors.length !== 0);
    console.log(errors);
    if (errors.length !== 0) {
      return (
        <Alert severity="error" >
          {errors.map(data => {
            return (<li>{data}</li>)
          })}
        </Alert>
      )
    } else {
      return
    }
  }

  const SuccessMssage = () => {
    return (
      <Alert severity="success">Your file has been saved successfully!</Alert>
    )
  }

  return (
    <Layout>
      <>
        <div className={styles.formContainer}>
          <h2 className="text-center">Submit Post and related Details</h2>
          <div className={styles.form1}>
            {errors.length !== 0 && <ErrorNotification></ErrorNotification>}
            {isSucess && <SuccessMssage></SuccessMssage>}
            {/* </div> */}
            <UploadBox updateFile={(e) => updloadFile(e)}></UploadBox>
            <div className="row">
              {image && isImage && <img src={image} alt={'image'} width="300" />}
              {image && !isImage && <video
                src={image}
                controls="true"
                autoPlay
                className={styles.video}
              />}
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="title">Title</label>
              </div>
              <div className="col-75">
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={state.title}
                  onChange={(e) => onChange(e)}
                  placeholder="Your Title"
                />
                <label className="italicBold">Max: 20 Characters</label>
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="price">Price</label>
              </div>
              <div className="col-75">
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={state.price}
                  onChange={(e) => onChange(e)}
                  placeholder="Your price"
                />
              </div>
            </div>

            <div className="row text-center">

              <button value="Submit" className={styles.submit} onClick={() => submit()}>
                Submit
              </button>
              <button value="Add New" className={styles.submit} onClick={() => addNew()}>
                Add New
              </button>
            </div>
            {/* <Stack spacing={2} sx={{ width: '100%' }}> */}
            <Button variant="outlined" onClick={handleClick}>
              Open success snackbar
            </Button>
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
              <Alert severity="error" onClose={handleClose} sx={{ width: '100%' }}>This is an error message!</Alert>
            </Snackbar>
            {/* <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Your video has been uploaded it will reflect in few moments
            </Alert> */}
            {/* <Alert severity="error">This is an error message!</Alert>
            <Alert severity="warning">This is a warning message!</Alert>
            <Alert severity="info">This is an information message!</Alert>
            <Alert severity="success">This is a success message!</Alert> */}
            {/* </Stack> */}
          </div>
        </div>

      </>
    </Layout >
  );
};

export default addOrEditPost;


