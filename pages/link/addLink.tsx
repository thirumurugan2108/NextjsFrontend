import React from "react";
import Layout from "../../src/components/layout";
import styles from './addLink.module.scss';
const createPost = (_props: any) => {
  // const [email, setEmail] = useState("");
  // const [pass, setPass] = useState("");
  return (
    <Layout>
      <>
        <div className="formContainer">
          <h2 className='text-center'>Insert an advertisement to the link</h2>
          <form className={styles.form1}>
            <div className="row">
              <div className="col-25">
                <label htmlFor="fname" >Link( URL )</label>
              </div>
              <div className="col-75">
                <div>
                <input
                  type="text"
                  id="fname"
                  className={styles.linkInput}
                  name="firstname"
                  placeholder="Your Link.."
                />
                <button className={styles.RefreshBtn}>Refresh</button>
                </div>
                <label className="italicBold">Max: 70 Characters</label>
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
                  placeholder="Your Title"
                />
                <label className="italicBold">Max: 170 Characters</label>
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
              <input type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </>
    </Layout>
  );
};

export default createPost;
