import React, { useState } from "react";
import Layout from "../../src/components/Layout";
import styles from "./addOrEditPost.module.scss";
import { useReducer } from "react";
import { updatePost, upsertPost } from "../../utils/services/post.service";
import { useConfigState, useConfigSetState } from "../../utils/context/postContext";
import UploadBox from "../../utils/sharedComponents/uploadBox/uploadBox";
import { getExtensionFromFileName } from "../../utils/common/commonUtil";

const initialState = {
  title: "",
  price: 0,
  image: "",
};

function reducer(state: any, action: any) {
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

const addOrEditPost = (_props: any) => {
  const [image, setImage] = useState("");
  const [isImage, setIsImage] = useState(true);
  const setConfigState = useConfigSetState();
  const configState = useConfigState();

  const [state, dispatch] = useReducer(reducer, initialState);

  const onChange = (e: any) => {
    console.log(e.target.value);
    dispatch({ type: "generic", field: e.target.name, value: e.target.value });
  };

  React.useEffect(() => {
    if (configState !== null && configState !== undefined) {
      console.log(configState)
      dispatch({ type: "editMode", payload: configState });
      setImage(configState.fileUrl);
      if(configState.isVideo) {
        setIsImage(false);
      } else {
        setIsImage(true);
      }
    }
    return () => {
      resetValues();
    }
  }, []);

  const updloadFile = (event: any) => {
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

  return (
    <Layout>
      <>
        <div className={styles.formContainer}>
          <h2 className="text-center">Submit Post and related Details</h2>
          <div className={styles.form1}>
            <UploadBox updateFile={(e: any) => updloadFile(e)}></UploadBox>
            <div className="row">
              {image && isImage && <img src={image} alt={'image'} width="300" />}
              {image && !isImage &&  <video
                                    src={image}
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
          </div>
        </div>
      </>
    </Layout>
  );
};

export default addOrEditPost;


