import React, { useState } from "react";
import Layout from "../../src/components/Layout";
import styles from './profile.module.scss';
import Image from 'next/image';

import { useReducer } from "react";
import { Card } from "../../utils/models/card.model";
const initialState = {
  cardList: [{
    "title": "DM on Instagram",
    "price": 400,
    "description": "Lets chat instagram for 10mins",
    "isEditMode": false
  }]
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case "editToggle":
      return {
        ...state,
        cardlist: state.cardList.map((data: any, index: any) => {
          if (index === action.index) {
            data.isEditMode = action.isEdit;
          }
          return data;
        })
      };
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

const Profile = (_props: any) => {
  const [fileName, setfileName] = useState();
  const [isCardEditMode, setisCardEditMode] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  async function onFileChange(event: any) {
    // setSelectedFile(event.target.files[0]);
    setfileName(event.target.files[0].name);


    // props.updateFile(event);
  }

  const onEdit = (index: any) => {
    dispatch({ type: "editToggle", index: index, isEdit: true })
  }

  const onEditCancel = (index: any) => {
    dispatch({ type: "editToggle", index: index, isEdit: false })
  }

  const onCardSubmit = (index: any) => {
    dispatch({ type: "editToggle", index: index, isEdit: true })
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
            <div className={styles.cardHeader}>
              <p className={styles.connect}>Let's Connect</p>
              {/* <button>Add Cards</button> */}
            </div>
            {state.cardList && state.cardList.map((data: any, index: any) => {

              // ({
              //   data.isEditMode && 
              if (!data.isEditMode) {
                return (
                  <div className={styles.slot}>
                    <div className={styles.around}>
                      <h4>{data.title}</h4>
                      <p className={styles.chatContent}>{data.description}</p>
                      <text>{data.price}</text>
                    </div>

                    <div className={styles.cardEdit} onClick={() => onEdit(index)}>

                    </div>
                  </div>
                )
              } else {
                return (
                  <div className={styles.slot}>
                    <input value={data.title} />
                    <input value={data.description} />
                    <input value={data.price} />
                    <div>
                      <button onClick={() => onEditCancel(index)}>Cancel</button>
                      <button onClick={() => onCardSubmit(index)}>Submit</button>
                    </div>
                  </div>
                )
              }
              // })
            })}
          </div>


        </div>

      </div>
    </Layout>
  );
};

export default Profile;
