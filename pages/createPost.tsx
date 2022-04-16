import React, {  useState } from "react";
import Layout from "../src/components/layout";
import styles from "./createPost.module.scss";
import { useReducer } from "react";
const initialState = {
      "title":"",
      "price":0,
      "image":""
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

const createPost = (_props: any) => {
  //   const [email, setEmail] = useState("");
  //   const [pass, setPass] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [ ,seturl] = useState("");
  // const [urllist, setUrlList] = useState([]);
  const [description, setDescription] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);
  const onChange = (e: any) => {
    dispatch({ type: "generic", field: e.target.name, value: e.target.value });
  };

  React.useEffect(() => {
    async function fetchurl() {
      let url = state.site_url;
      // 'https://www.timesnownews.com/videos/mirror-now/politics/tamil-nadu-7-day-full-lockdown-from-may/98153';
      url = url.replaceAll("/", "%2F");
      url = url.replaceAll(":", "%3A");
      await fetch(
        `https://api.microlink.io?url=${url}&audio=true&video=true&iframe=true`
      )
        .then(async (data) => {
          let result = await data.json();
          setTitle(result.data.title);
          setImage(result.data.image.url);
          setDescription(result.data.description);
          seturl(result.data.url);
        });
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
          <h2 className="text-center">Submit Link and related Details</h2>
          <form className={styles.form1}>
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
                  <button className={styles.RefreshBtn}>Refresh</button>
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
              <div className="col-25">
                <label htmlFor="lname">KeyWords</label>
              </div>
              <div className="col-75">
                <input
                  type="text"
                  id="lname"
                  name="lastname"
                  onChange={onChange}
                  placeholder="Your Keywords"
                />
                <label className="italicBold">
                  Max: 5 Keywords( comma seperated )
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="lname">Image URL</label>
              </div>
              <div className="col-75">
                <input
                  type="text"
                  id="lname"
                  name="lastname"
                  onChange={onChange}
                  value={image}
                  placeholder="Your Image URL"
                />
                <label className="italicBold">
                  Image dimensions: 1200pixels ( width ) - 630 pixels( Height )
                </label>
              </div>
            </div>
            {/* <div className="row">
              <div className="col-25">
                <label htmlFor="country">Country</label>
              </div>
              <div className="col-75">
                <select id="country" name="country">
                  <option value="australia">Australia</option>
                  <option value="canada">Canada</option>
                  <option value="usa">USA</option>
                </select>
              </div>
            </div> */}
            <div className="row">
              <img src={image} alt={title} width="300" />
            </div>
            <div className="row">
              <input type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </>
    </Layout>
  );
};

export default createPost;
