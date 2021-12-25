import React, { useState } from "react";
import Layout from "../../src/components/Layout";
import styles from './profile.module.scss';
import  Image from 'next/image';
const Profile = (_props: any) => {
  // const [email, setEmail] = useState("");
  // const [pass, setPass] = useState("");
  const [fileName, setfileName] = useState();
  async function onFileChange(event: any) {
    // setSelectedFile(event.target.files[0]);
    setfileName(event.target.files[0].name);


    // props.updateFile(event);
  }

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.main}>
          <h5 className={styles.title}>WELCOME TO MY OFFICIAL WEBSITE</h5>
          <p className={styles.subTitle} >CHECK OUT MY EXCLUSIVE PHOTOS AND VIDEOS</p>

          <div className={styles.contentSection}>
            <div className={styles.profileIconOuter}>
                <span className={styles.edit}></span>
                <input type="file" onChange={onFileChange} />
              <div className={styles.profileIconInner}>
              </div>

            </div>
            <h3>Elon Musk </h3>
            <p className={styles.connect}>Let's Connect</p>
            <div className={styles.slot}>

              <div className={styles.around}>
                <h4>DM on Instagram</h4>
                <p className={styles.chatContent}>Lets chat instagram for 10mins</p>
                <text>Rs:400</text>
              </div>

              <div className={styles.cardEdit}>

              </div>
            </div>
          </div>


        </div>

      </div>
    </Layout>
  );
};

export default Profile;
