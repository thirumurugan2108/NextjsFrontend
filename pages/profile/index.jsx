import React, { useEffect, useState } from "react";
import Layout from "../../src/components/layout";
import { useRouter } from "next/router";
import Image from 'next/image';
import { useReducer } from "react";

import styles from './profile.module.scss';
import { getExtensionFromFileName } from '../../utils/common/commonUtil'
import { createCardDetails, getcardDetails, updateCardDetails, deleteCardById } from "../../utils/services/card.service";
import { getUserDetails, uploadPhoto, uploadCoverPhoto } from "../../utils/services/user.service"
import { setSubscription, getSubscriptionDetails, disableSubscriptionStatus } from "../../utils/services/subscription.service"
import Carousel from 'react-material-ui-carousel'
import ModalComponent from '../../components/Modal'
import { modalStyle } from '../../utils/common/commonUtil';
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
        cardList: [{
          ...initialState.cardList[0],
          id: action.payload.id
        }, ...state?.cardList
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
  const [coverImage, setCoverImage] = useState("")
  const [state, dispatch] = useReducer(reducer, initialState);
  const [subscription, setSubscriptionData] = useState(false)
  const [openSubscriptionModal, setopenSubscriptionModal] = useState(false)
  const [subscriptionPrice, setSubscriptionPrice] = useState('')
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
      if (userDetail && userDetail.data && userDetail.data.name) {
        
        const subscriptionDetails = await getSubscriptionDetails(userDetail.data.name)
        if (subscriptionDetails && subscriptionDetails.data && subscriptionDetails.data.subscription && subscriptionDetails.data.status == true) {
          setSubscriptionPrice(subscriptionDetails.data.subscription[0].price)
          setSubscriptionData(subscriptionDetails.data)
        }
      }
      dispatch({
        type: "fetchfromdb", payload: {
          cardList: cardDetail.data
        }
      });
      setImage(userDetail.data.photoUrl);
      setCoverImage(userDetail.data.coverUrl)
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

  const addCard = async () => {
    const newCard = await createCardDetails(initialState.cardList[0]);
    dispatch({ type: 'addCard', payload: { id: newCard.data.id } });
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

  const enableSubscription = (e) => {
    e.preventDefault()
    setopenSubscriptionModal(true)
  }
  const disableSubscription = async (e) => {
    e.preventDefault()
    await disableSubscriptionStatus({id:subscription.id})
    router.reload()
  }
  const setMonthlySubscriptionPrice = async (e) => {
    e.preventDefault()
    if (openSubscriptionModal == true) {
      setopenSubscriptionModal(false)
      const payload = {
        influencer: username, 
        price: subscriptionPrice
      }
      await setSubscription(payload)
      router.reload()
    }
  }

  const closeSubscriptionModal = () => {
    setopenSubscriptionModal(false)
  }
  const coverUrl = '';
  const onCoverChange = (event) => {
    console.log("onCoverChange")
    const file = event.target.files[0];
    
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      setCoverImage(URL.createObjectURL(file));
      reader.onloadend = function (e) {
        console.log("onloadend")
        // dispatch({ type: "generic", field: "image", value: reader.result });
        dispatch({ type: "generic", field: "imageCoverFile", value: file });
        dispatch({ type: "generic", field: "extensionName", value: getExtensionFromFileName(file.name) });
        let formdata = new FormData();
        formdata.set('file', file);
        uploadCoverPhoto(formdata);
      }.bind(this);
    }
  }
  console.log(state)
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.main}>
        <div className={styles.coverStyleContainer}>
          <input type="file" onChange={onCoverChange} name="coverImage" className={styles.coverUpload}/>
          <div className={styles.coverStyleWrapper}>
            <img src={coverImage} className={styles.coverStyleImage}/>
          </div>
        </div>
       
          <div className={styles.contentSection}>
            <div className={styles.profileIconOuter}>
              <span className={styles.edit}></span>
              <input type="file" onChange={onFileChange} />
              <div className={styles.profileIconInner} style={{ backgroundImage: `url(${image})` }}>
              </div>

            </div>
            <h3>{fullName}</h3>
            <a href={`/${username}`} className={styles.influencerLink}>www.bingemeee.com/{username}</a>
            <div className={styles.cardHeader}>
              <p className={styles.connect}>Let's Connect</p>
              <button onClick={() => addCard()}>Add Cards</button>
            </div>
            <div className={styles.carouselWrapper}>
            <Carousel navButtonsAlwaysVisible={true} autoPlay={false} indicators={false}>
            {state.cardList && state.cardList.map((data, index) => {
              // ({
              //   data.isEditMode && 
              if (!data.isEditMode) {
                return (
                  <div className={styles.slot} key={`card${index}`}>
                    <div className={styles.around}>
                      <div><h4>{data.title}</h4>
                      <span className={styles.carouselCount}>{index +  1}/{state.cardList.length}</span>
                      </div>
                      <p className={styles.chatContent}>{data.description}</p>
                      <span>{data.price}</span>
                    </div>
                    <div className={styles.cardEditContainer}>
                      <div className={styles.cardEdit} onClick={() => onEdit(index)}>
                      </div>
                      <Delete onClick={() => deleteCard(data.id)} />
                    </div>
                  </div>
                )
              } else {
                return (
                  <div className={styles.slot}>
                    <input value={data.title} name="title" placeholder="Title" maxLength="30" onChange={(e) => onCardChange(e, index)} />
                    <input value={data.description} name="description" maxLength="50" placeholder="Description" onChange={(e) => onCardChange(e, index)} />
                    <input value={data.price} type="Number" name="price" placeholder="Price" onChange={(e) => onCardChange(e, index)} />

                    <button className={styles.floatNone} onClick={() => onEditCancel(index)}>Cancel</button>
                    <button className={styles.floatNone} onClick={() => onCardSubmit(index, data)}>Submit</button>

                  </div>
                )
              }
              // })
            })}
          </Carousel>
            </div>

            {/* {subscription} */}

            <div className={styles.cardHeader}>
              <p className={styles.connect}>Subscription</p>
              {!subscription && <button onClick={enableSubscription}>Enable Subscription</button>}
              {subscription && <button onClick={disableSubscription}>Disable Subscription</button>}
            </div>
            {subscription && <div className={styles.carouselWrapper}>
            <Carousel navButtonsAlwaysVisible={true} autoPlay={false} indicators={false}>
              {subscription.subscription.map((sub, index) => {
                return <div className={styles.slot}>
                  <div className={styles.around}>
                    <div><h4>{sub.name}</h4>
                    <span className={styles.carouselCount}>{index+1}/ {subscription.subscription.length}</span>
                    </div>
                    <span>{sub.price}</span>
                  </div>
              </div>
              })}
            </Carousel>
            </div>}
          </div>
        </div>
      </div>
      {openSubscriptionModal && <ModalComponent open={openSubscriptionModal} onClose={closeSubscriptionModal} modalStyle={modalStyle} >
              <h3>Set Subscription base Monthly price</h3>
              <p>Based on the monthly price, 6 months and 1 year subscription price will be calculated with discounted price.</p>
              <input type="text" name="subscription_price" onChange={(e) => setSubscriptionPrice(e.target.value)} value={subscriptionPrice}/>
              <button className="" onClick={setMonthlySubscriptionPrice}>Set Monthly Price</button>
            </ModalComponent>}
    </Layout>
  );
};

export default Profile;
