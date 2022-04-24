import React, { useEffect, useState } from "react";
import Layout from "../../src/components/layout";
import { useRouter } from "next/router";
import Image from 'next/image';
import { useReducer } from "react";

import styles from './profile.module.scss';
import { getExtensionFromFileName } from '../../utils/common/commonUtil'
import { createCardDetails, getcardDetails, updateCardDetails, deleteCardById } from "../../utils/services/card.service";
import { getUserDetails, uploadPhoto } from "../../utils/services/user.service"

import { Card } from "../../utils/models/card.model";
import Delete from '../../assets/images/delete.svg';
const initialState = {
  cardList: [{
    "title": "DM on Instagram",
    "price": 400,
    "description": "Lets chat instagram for 10mins",
    "isEditMode": false
  }]
};

function reducer(state, action) {
  switch (action.type) {
    case "editToggle":
      return {
        ...state,
        cardList: state.cardList.map((data, index) => {
          if (index === action.index) {
            data.isEditMode = action.isEdit;
          }
          return data;
        })
      };
    case "onCardChange":
      return {
        ...state,
        cardList: state?.cardList.map((data, index) => {
          if (index == action.index) {
            return {
              ...data,
              [action.field]: action.value,
            }
          } else {
            return data;
          }
        })
      };
    case "addCard":
      return {
        ...state,
        cardList: [initialState.cardList[0], ...state?.cardList
        ]
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

const Profile = (_props) => {
  const [fileName, setfileName] = useState();
  const [fullName, setFullName] = useState();
  const [username, setUsername] = useState();
  const [isCardEditMode, setisCardEditMode] = useState(false);
  const [image, setImage] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);

  const router = useRouter();
  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      fetchAllDetails();
      setUsername(sessionStorage.getItem('name'));
    } else {
      router.push('./login');
    }
  }, [])

  const fetchAllDetails = async () => {
    try {
      const userDetail = await getUserDetails();
      const cardDetail = await getcardDetails();
      dispatch({
        type: "fetchfromdb", payload: {
          cardList: cardDetail.data
        }
      });
      setImage(userDetail.data.photoUrl);
      setFullName(userDetail.data.fullName);
    } catch (err) {
      router.push('./login');
    }
  }

  async function onFileChange(event) {
    // setSelectedFile(event.target.files[0]);
    setfileName(event.target.files[0].name);
    const file = event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      setImage(URL.createObjectURL(file));
      reader.onloadend = function (e) {
        // dispatch({ type: "generic", field: "image", value: reader.result });
        dispatch({ type: "generic", field: "imageFile", value: file });
        dispatch({ type: "generic", field: "extensionName", value: getExtensionFromFileName(file.name) });
        let formdata = new FormData();
        formdata.set('file', file);
        uploadPhoto(formdata);
      }.bind(this);
    }

  }

  const addCard = () => {
    dispatch({ type: 'addCard' });
    createCardDetails(initialState.cardList[0]);
  }

  const deleteCard = async (id) => {
    await deleteCardById(id);
    fetchAllDetails();
  }

  const onCardChange = (e, index) => {
    dispatch({ type: "onCardChange", field: e.target.name, value: e.target.value, index: index });
  };
  const onEdit = (index) => {
    dispatch({ type: "editToggle", index: index, isEdit: true })
  }

  const onEditCancel = (index) => {
    dispatch({ type: "editToggle", index: index, isEdit: false })
  }

  const onCardSubmit = async (index, postData) => {
    dispatch({ type: "editToggle", index: index, isEdit: false });
    await updateCardDetails(postData);
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
              <div className={styles.profileIconInner} style={{ backgroundImage: `url(${image})` }}>
              </div>

            </div>
            <h3>{fullName}</h3>
            <a href={`/influencer/${username}`} className={styles.influencerLink}>www.bingemeee.com/influencer/{username}</a>
            <div className={styles.cardHeader}>
              <p className={styles.connect}>Let's Connect</p>
              <button onClick={() => addCard()}>Add Cards</button>
            </div>
            {state.cardList && state.cardList.map((data, index) => {

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
                  <div className={styles.cardEditContainer}>
                    <div className={styles.cardEdit} onClick={() => onEdit(index)}>
                    </div>
                    <Image src={Delete} onClick={() => deleteCard(data.id)} />
                  </div>
                  </div>
                )
              } else {
                return (
                  <div className={styles.slot}>
                    <input value={data.title} name="title" placeholder="Title"  maxLength="30"onChange={(e) => onCardChange(e, index)} />
                    <input value={data.description} name="description"  maxLength="50" placeholder="Description" onChange={(e) => onCardChange(e, index)} />
                    <input value={data.price} type="Number" name="price" placeholder="Price" onChange={(e) => onCardChange(e, index)} />
                    
                      <button  className={styles.floatNone} onClick={() => onEditCancel(index)}>Cancel</button>
                      <button className={styles.floatNone} onClick={() => onCardSubmit(index, data)}>Submit</button>
                    
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
