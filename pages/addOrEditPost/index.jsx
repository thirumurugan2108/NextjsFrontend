import React, { useState } from "react";
import Layout from "../../src/components/layout";
import styles from "./addOrEditPost.module.scss";
import { useReducer } from "react";
import { updatePost, upsertPost, deletePost } from "../../utils/services/post.service";
import { useConfigState, useConfigSetState } from "../../utils/context/postContext";
import UploadBox from "../../utils/sharedComponents/uploadBox/uploadBox";
import { getExtensionFromFileName } from "../../utils/common/commonUtil";

import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import * as Yup from 'yup';
import { useRouter } from "next/router";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const initialState = {
  title: "",
  price: "",
  image: "",
  isPaid: "Yes"
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "editMode":
      if(action.payload.price == null) {
        action.payload.price = ""
      }
      return {
        ...state,
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
  const [isLoading, setIsLoading] = useState(false);
  const [isSucess, setIsSuccess] = useState(false);
  const [isDelSuccess, setIsDelSuccess] = useState(false)
  const [errors, setErrors] = useState([]);
  const setConfigState = useConfigSetState();
  const configState = useConfigState();

  const router = useRouter();

  const [state, dispatch] = useReducer(reducer, initialState);

  const [open, setOpen] = useState(false);

  let validationSchema = Yup.object({
    title: Yup.string()
      .required('please enter title '),
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
    dispatch({ type: "generic", field: e.target.name, value: e.target.value });
  };

  React.useEffect(() => {

    if (sessionStorage.getItem('token')) {
      if (configState !== null && configState !== undefined && Object.keys(configState).length !== 0) {
        dispatch({ type: "editMode", payload: configState });
        setImage(configState.fileUrl);
        if (configState.isVideo) {
          setIsImage(false);
        } else {
          setIsImage(true);
        }
      }
    } else {
      router.push('./login');
    }

    return () => {
      resetValues();
    }
  }, []);

  const updloadFile = (event) => {
    var file = event.target.files[0];

    if (file) {
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
    }
  };

  const submit = () => {
    window.scrollTo(0, 0);
    if (!image) {
      validationSchema = validationSchema.shape({
        imageFile: Yup.string()
          .required('please upload a file!'),
      });
    }

    if (state.isPaid === 'Yes') {
      validationSchema = validationSchema.shape({
        price: Yup.string()
          .required('please enter price'),
      });
    }
    
    validationSchema.validate(state, { abortEarly: false })
      .catch((err) => {
        err.name; // => 'ValidationError'
        err.errors; // => [{ key: 'field_too_short', values: { min: 18 } }]
        setErrors(err.errors);
      })
      .then(async (valid) => {
        if (valid) {
          setErrors([]);
          resetValues();
          setIsLoading(true)
          if (state.imageFile) {
            let formdata = new FormData();
            formdata.set('title', state.title);
            formdata.set('price', state.price);
            formdata.set('isPaid', state.isPaid);
            // ...(uuid && { uuid }),
            if (state.uuid) {
              formdata.set('uuid', state.uuid);
            }

            formdata.set('file', state.imageFile);
            formdata.set('extensionName', state.extensionName);
            const data = await upsertPost(formdata)
            if (data.status == 200 && data.data.message == "success") {
              setIsLoading(false)
              setIsSuccess(true)
            }
            else {
              setIsLoading(false)
              setErrors(["Failed to upload your content"])
            }
          } else {
            const data = await  updatePost({
              title: state.title,
              price: state.price,
              isPaid: state.isPaid,
              id: state.id
            })
            if (data.status == 200) {
              setIsLoading(false)
              setIsSuccess(true)
            }
            else {
              setIsLoading(false)
              setErrors(["Failed to upload your content"])
            }
          }
        } else {
          setIsSuccess(false);
          setIsLoading(false)
        }
      });
  }
  const delPost = async () => {
    const resp = await deletePost(state.uuid)
    if (resp.status == 200 && resp.data == "success") {
      setIsDelSuccess(true)
    }
    else {
      setErrors(["Failed to delete your content"])
    }
  }
  const addNew = () => {
    resetValues();
    window.scrollTo(0, 0);
  }

  function resetValues() {
    dispatch({ type: "clear", payload: initialState });
    setConfigState({});
    setImage('');
  }

  const ErrorNotification = () => {
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
  const DelSuccessMssage = () => {
    return (
      <Alert severity="success">Your file has been deleted successfully!. It will reflect in few mins</Alert>
    )
  }
  const SuccessMssage = () => {
    return (
      <Alert severity="success">Your file has been saved successfully!. It will reflect in few mins</Alert>
    )
  }

  const LoadingMssage = () => {
    return (
      <Alert severity="warning">Uploading your content. Please wait...</Alert>
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
            {isDelSuccess && <DelSuccessMssage />}
            {isLoading && <LoadingMssage />}
            
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
                <label htmlFor="title">Visibility</label>
              </div>
              <div className="col-25">
                <input
                  type="radio"
                  id="isPaidYes"
                  name="isPaid"
                  value="Yes"
                  // defaultChecked="true"
                  checked={state.isPaid === 'Yes'}
                  onChange={(e) => onChange(e)}
                />
                <label className="italicBold" htmlFor="isPaidYes">Paid</label>
              </div>

              <div className="col-25">
                <input
                  type="radio"
                  id="isPaidNo"
                  name="isPaid"
                  value="No"
                  checked={state.isPaid === 'No'}
                  onChange={(e) => onChange(e)}
                />
                <label className="italicBold" htmlFor="isPaidNo">Free</label>
              </div>
            </div>

            {
              state.isPaid == "Yes" && <div className="row">
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
            }

            <div className="row text-center">

              <button value="Submit" className={styles.submit} onClick={() => submit()}>
                Submit
              </button>
              <button value="Add New" className={styles.submit} onClick={() => addNew()}>
                Add New
              </button>
              {state.uuid && <button value="Delete Post" className={styles.submit} onClick={() => delPost()}>
                Delete Post
              </button>}
            </div>
          </div>
        </div>

      </>
    </Layout >
  );
};

export default addOrEditPost;


