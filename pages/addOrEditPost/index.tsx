import React, { useState } from "react";
import Layout from "../../src/components/Layout";
import styles from "./addOrEditPost.module.scss";
import { useReducer } from "react";
import UploadBox from "../../utils/sharedComponents/uploadBox/uploadBox";
import { createPost } from "../../utils/services/post.service";
import { useConfigState } from "../../utils/context/postContext";
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
  const [isUpdate, setIsUpdate] = useState(false);
  const configState = useConfigState();

  const [state, dispatch] = useReducer(reducer, initialState);

  const onChange = (e: any) => {
    console.log(e.target.value);
    dispatch({ type: "generic", field: e.target.name, value: e.target.value });
  };

  React.useEffect(() => {
    if(configState !== null && configState !== undefined){
      setIsUpdate(true);
      dispatch({ type: "editMode", payload: configState });
    }
  }, []);

  const updateFile = (event: any) => {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    setImage(URL.createObjectURL(event.target.files[0]));
    reader.onloadend = function (e: any) {
      dispatch({ type: "generic", field: "image", value: reader.result });
    }.bind(this);
  };

  const submit = () => {
    createPost({
      title: state.title,
      image: state.image,
      price: state.price,
    });
  };
  return (
    <Layout>
      <>
        <div className={styles.formContainer}>
          <h2 className="text-center">Submit Post and related Details</h2>
          <div className={styles.form1}>
            <UploadBox updateFile={(e: any) => updateFile(e)}></UploadBox>
            <div className="row">
              <img src={state.image} alt={image} width="300" />
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
              <button value="Submit"  className={styles.submit} onClick={() => submit()}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default addOrEditPost;
