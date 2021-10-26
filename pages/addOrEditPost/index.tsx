import React, { useState } from "react";
import Layout from "../../src/components/Layout";
import styles from "./addOrEditPost.module.scss";
import { useReducer } from "react";
import UploadBox from "../../utils/sharedComponents/uploadBox/uploadBox";
import { createPost } from "../../utils/services/post.service";

const initialState = {
  title: "",
  price: 0,
  image: "",
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

const addOrEditPost = (_props: any) => {
  const [image, setImage] = useState("");

  const [state, dispatch] = useReducer(reducer, initialState);

  const onChange = (e: any) => {
    console.log(e.target.value);
    dispatch({ type: "generic", field: e.target.name, value: e.target.value });
  };

  React.useEffect(() => {
    async function fetchurl() {
      // let url = state.site_url;
      // 'https://www.timesnownews.com/videos/mirror-now/politics/tamil-nadu-7-day-full-lockdown-from-may/98153';
      // url = url.replaceAll("/", "%2F");
      // url = url.replaceAll(":", "%3A");
      // console.log(url);
      // await fetch(
      //   `https://api.microlink.io?url=${url}&audio=true&video=true&iframe=true`
      // )
      //   .then(async (data) => {
      //     let result = await data.json();
      //     console.log(result.data);
      //     setTitle(result.data.title);
      //     setImage(result.data.image.url);
      //     setDescription(result.data.description);
      //     seturl(result.data.url);
      //   })
      //   .then((res) => {
      //     console.log(res);
      //   });
      //https://api.microlink.io?url=https%3A%2F%2Freact-firebase-js.com%2Findex.html&palette=true&audio=true&video=true&iframe=true
    }
    // if (state.site_url) {
    //   fetchurl();
    // }
  }, []);

  const updateFile = (event: any) => {
    console.log(event);
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);

    console.log(URL.createObjectURL(event.target.files[0]));
    setImage(URL.createObjectURL(event.target.files[0]));

    reader.onloadend = function (e: any) {
      dispatch({ type: "generic", field: "image", value: reader.result });
    }.bind(this);
  };

  const submit = () => {
    console.log('tset');
    createPost({
      title: state.title,
      image: state.image,
      price: state.price,
    });
  };
  return (
    <Layout>
      <>
        <div className="formContainer">
          <h2 className="text-center">Submit Post and related Details</h2>
          <div className={styles.form1}>
            <UploadBox updateFile={(e: any) => updateFile(e)}></UploadBox>
            <div className="row">
              <img src={image} alt={image} width="300" />
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
                  onChange={(e) => onChange(e)}
                  placeholder="Your price"
                />
              </div>
            </div>

            <div className="row text-center">
              <button value="Submit" onClick={() => submit()}>
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
