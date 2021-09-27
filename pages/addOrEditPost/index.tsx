import React, {  useState } from "react";
import Layout from "../../src/components/layout";
import styles from "./addOrEditPost.module.scss";
import { useReducer } from "react";
import UploadBox from "../../utils/sharedComponents/uploadBox/uploadBox";
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

const addOrEditPost = (_props: any) => {
  //   const [email, setEmail] = useState("");
  //   const [pass, setPass] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [   ,seturl] = useState("");
  // const [urllist, setUrlList] = useState([]);
  const [description, setDescription] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);
  const onChange = (e: any) => {
    console.log(e.target.name);
    dispatch({ type: "generic", field: e.target.name, value: e.target.value });
  };

  const minAmount = "<$200K";
  const maxAmount = ">$1M";

  React.useEffect(() => {
    async function fetchurl() {
      let url = state.site_url;
      // 'https://www.timesnownews.com/videos/mirror-now/politics/tamil-nadu-7-day-full-lockdown-from-may/98153';
      url = url.replaceAll("/", "%2F");
      url = url.replaceAll(":", "%3A");
      console.log(url);
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
    if (state.site_url) {
      fetchurl();
    }
  }, [state.site_url]);

  return (
    <Layout>
      <>
        <div className="formContainer">
          <h2 className="text-center">Submit Post and related Details</h2>
          <form className={styles.form1}>
                  <UploadBox></UploadBox>
            <div className="row">
              <div className="col-25">
                <label htmlFor="fname">Link( URL )</label>
              </div>
              <div className="col-75">
                <div>
                  <input
                    type="text"
                    id="fname"
                    name="site_url"
                    className={styles.linkInput}
                    onChange={onChange}
                    placeholder="Your Link.."
                  />
                  {/* <button className={styles.RefreshBtn}>Refresh</button> */}
                </div>
                <label className="italicBold">Max: 70 Characters</label>
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="lname">Title</label>
              </div>
              <div className="col-75">
                <input
                  type="text"
                  id="lname"
                  name="lastname"
                  onChange={onChange}
                  value={title}
                  placeholder="Your Title"
                />
                <label className="italicBold">Max: 170 Characters</label>
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="lname">Descrption</label>
              </div>
              <div className="col-75">
                <textarea
                  id="lname"
                  name="lastname"
                  onChange={onChange}
                  placeholder="Your Description"
                  value={description}
                />
              </div>
            </div>
            <div className="row">
              <img src={image} alt={title} width="300" />
            </div>
            <div className="row">
              <input type="submit" value="Submit" />
            </div>
            <input
                id="maxAmount"
                type="radio"
                value={maxAmount}
                checked={state.fund_amount === ">$1M"}
                name="fund_amount"
                onChange={onChange}
              />
          </form>
        </div>
      </>
    </Layout>
  );
};

export default addOrEditPost;
