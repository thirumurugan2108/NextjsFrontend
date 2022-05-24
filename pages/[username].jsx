import { useState, useReducer, useEffect } from 'react';
import { useRouter } from "next/router";
import Image from 'next/image'
import React from "react";
import useSWR from 'swr'
import Link from 'next/link'

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ArrowBackIosNew from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { modalStyle, imageLoader, alertModalStyle } from '../utils/common/commonUtil';
import styles from './home.module.scss'
import { getHomeDetailsByUsername } from '../utils/services/user.service'
import { storePaymentDetail } from '../utils/services/payment.service'
import PaymentDetails from '../src/components/paymentDetails'
import Report from '../assets/images/report.svg';
import AlbumIcon from '../assets/images/album.png';
import CloseIcon from '@mui/icons-material/Close';
import Popup18plus from '../src/components/popup18plus'
import Footer from '../src/components/footer';
import ModalComponent from '../components/Modal'
import Login from '../components/Login'
import SignUp from '../components/SignUp'
import OtpForm from '../components/OtpForm'
import { useCookies } from "react-cookie"
import MuiAlert from '@mui/material/Alert';
import Head from "next/head"
import SubscriptionForm from '../components/Subscription';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const PaymentSuccess = ({isCard, isSubscription}) => {
  let message = 'You have successfully purchased the product. If you are unable to view the product please contact our <a href="https://home.bingemeee.com/#contact">support team</a>'
  if (isCard) {
    message = 'Your payment is success. Our Influencer will contact you shortly !!!'
  }
  if (isSubscription) {
    message = 'Your payment for subscription is success. You can able to view all the products based on your subscription duration.'
  }
  return (
    <Alert severity="success" className={styles.paymentMessage}>{message}</Alert>
  )
}

const PaymentFailure = () => {
  return (
    <Alert severity="error" className={styles.paymentMessage}><h3>Your transaction is failed !!!. If your amount is debited from your account. Please contact our <a href="https://home.bingemeee.com/#contact">support team</a> for a refund.</h3></Alert>
  )
}
const PaymentProcessFailure = () => {
  return (
    <Alert severity="error" className={styles.paymentMessage}><h3>Unable to process payment currently!, Please try again after sometimes</h3></Alert>
  )
}
const fetcher = (query) => {
  if (query.username) {
    return getHomeDetailsByUsername(query);
  } else {
    return
  }
}

const initialState = {
  cardList: [],
  images: [],
  videos: [],
  buyerName: '',
  buyerPhoneNumber: '',
  buyerEmailId: '',
  user: {
    photoUrl: ''
  }
};

function reducer(state, action) {
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

const MainPage = (props)  => {
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [payableProductId, setPayableProductId] = useState('');
  const [isCard, setIsCard] = useState(false);
  const [paymentTitle, setPaymentTitle] = useState(false);
  const [isFreeProdcutOpen, setfreeProductOpen] = useState(false);
  const [openedProduct, setOpenedProduct] = useState({});
  const [currentAlbum, setCurrentAlbum] = useState('');
  const [naturalWidth, setNaturalWidth] = useState(0);
  const [naturalHeight, setNaturalHeight] = useState(0);
  const [loginModelOpen, setLoginModalOpen] = useState(false)
  const [signUpModelOpen, setSignupModalOpen] = useState(false)
  const [otpModalOpen, setOtpModalOpen] = useState(false)
  const [otpType, setOtpType] = useState('')
  const [otpEmail, setOtpEmail] = useState('')
  const [loggedInUser, setLoggedInUser] = useState({})
  const [purchasedProduct, setPurchasedProducts] = useState([])
  const [isPaymentSucess, setIsPaymentSucess] = useState(props.paymentSuccess)
  const [isPaymentFailure, setIsPaymentFailure] = useState(props.paymentFailure)
  const [isPaymentProcessFailure, setIsPaymentProcessFailure] = useState(false)
  const [isSubscription, setIsSubscription] = useState(false);
  const [subscription, setSubscription] = useState('')

  const [cookie, setCookie, removeCookie] = useCookies(["user"])
  const router = useRouter();
  const query = router.query;


  const handleOpen = (productId, title, isCard) => {
    setPayableProductId(productId);
    setIsCard(isCard);
    setPaymentTitle(title)
    if (Object.keys(loggedInUser).length > 0) {
      setIsPaymentOpen(true)
      
    }
    else {
      setLoginModalOpen(true)
    }
  };

  const handleClose = (paymentMade = false, instaFailure = false) => {
    setIsPaymentOpen(false)
    if (paymentMade) {
      router.reload()
    }
    if (instaFailure) {
      setIsPaymentProcessFailure(true)
    }
  };

  const subscribe = () => {
    if (Object.keys(loggedInUser).length > 0) {
      setIsSubscription(true);
      //setIsPaymentOpen(true)
    }
    else {
      setLoginModalOpen(true)
    }
  }

  const handleSubscribe = (name) => {
    setSubscription(name)
    setIsPaymentOpen(true)
    setIsSubscription(false);
  }

  const handleOtpSent = (type, email) => {
    setSignupModalOpen(false)
    setLoginModalOpen(false)
    setOtpModalOpen(true)
    setOtpType(type)
    setOtpEmail(email)
  }

  const processVerifiedOtp = (user, token, paidProductIds) => {
    setOtpModalOpen(false)
    setLoggedInUser({ name: user.name, email: user.email, mobile: user.mobile, photoUrl: user.photoUrl })
    setPurchasedProducts(paidProductIds);
    setCookie("user", token.refresh.token, {
      path: "/",
      maxAge: 86400, // Expires after 24hr
      sameSite: true,
    })

    if (query.validateEmail && query.email) {
      const newpath = router.pathname.replace('[username]', router.query.username)
      router.push(newpath)
    }
    else {
      router.reload()
    }
  }
  
  const handlePaymentComplete = (productId) => {
    const previousProductIds = purchasedProduct
    previousProductIds.push(productId)
    setPurchasedProducts(previousProductIds)
  }

  const logout = () => {
    setLoggedInUser({})
    removeCookie('user')
    setCookie("user", '', {
      path: "/",
      maxAge: 1, // Expires after 24hr
      sameSite: true,
    })
  }

  const getImageSize = (imageObj) => {
    setNaturalWidth(imageObj.naturalWidth);
    setNaturalHeight(imageObj.naturalHeight);
  }
  const loginModelClose = () => {
    setLoginModalOpen(false)
  }

  const openLoginModal = () => {
    setLoginModalOpen(true)
  }
  const signupModelClose = () => {
    setSignupModalOpen(false)
  }
  const otpModelClose = () => {
    setOtpModalOpen(false)
  }
  const openSignupModal = (e) => {
    e.preventDefault()
    setLoginModalOpen(false)
    setSignupModalOpen(true)
  }
  const paymentModelClose = (e) => {
    setIsPaymentFailure(false)
    setIsPaymentSucess(false)
    router.push(`/${query.username}`)
  }
  const albumPrev = (e) => {
    const prevIndex = currentAlbum.index <=1 ? 0 : currentAlbum.index -1
    const prevUrl = currentAlbum.albumUrl + currentAlbum.albums[prevIndex]
    setCurrentAlbum({...currentAlbum, index: prevIndex, url: prevUrl})
  }
  const albumNext = (e) => {
    const nextIndex = currentAlbum.index >= currentAlbum.length - 1 ? currentAlbum.length : currentAlbum.index + 1
    const nextUrl = currentAlbum.albumUrl + currentAlbum.albums[nextIndex]
    setCurrentAlbum({...currentAlbum, index: nextIndex, url: nextUrl})
    console.log(currentAlbum)
  }


  if (typeof cookie['user'] != "undefined") {
    query['token'] = cookie['user']
  }
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data, error } = useSWR(query, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  })
  
  useEffect(() => {
    if (data) {
      if (!data.data || !data.data.user || !data.data.user.photoUrl) {
        data.data.user.photoUrl = 'https://bingmee1.s3.ap-south-1.amazonaws.com/profile/defaultprof.jpg';
      }
      dispatch({ type: 'fetchfromdb', payload: data.data });
      setLoggedInUser(data.data.loginUser)
      setPurchasedProducts(data.data.currentProductIds)
    }
    if (query.validateEmail && query.email) {
      setOtpEmail(query.email)
      setOtpType('signup')
      setOtpModalOpen(true)
    }
  }, [data]);

  const onChange = (e) => {
    dispatch({ type: "generic", field: e.target.name, value: e.target.value });
  };

  const onClose = () => {
    setfreeProductOpen(false);
    setOpenedProduct({});
  }

  const openFreeProduct = (data, isImage) => {
    setfreeProductOpen(true);
    const albumFileNames = data.albumFileNames ? data.albumFileNames.split(',') : ''
    if (!albumFileNames) {
      const poster = data.fileUrl ? data.fileUrl.replace('videos/', 'thumbnail/').replace('.mp4', '-thumbnail.png') : ''
      setOpenedProduct({
        ...data, isImage, poster
      });
      setCurrentAlbum('')
    }
    else {
      let poster = ''
      if (data.albumUrl) {
        const albumUrl = data.albumUrl.slice(0, -1)
        poster = albumUrl.replace('videos/', 'thumbnail/') + '-thumbnail.png'
      }
      setCurrentAlbum({index: 0, albumUrl:data.albumUrl, url: data.albumUrl + albumFileNames[0], isImage, length: albumFileNames.length, albums: albumFileNames, poster})
    }
  }

  const navigateToContactus = () => {
    window.location.href = 'https://home.bingemeee.com/#contact';
  }
  console.log(state)
  
  const isUserLoggedIn = Object.keys(loggedInUser).length
  return (
    <div className={styles.container}>
      <Head>
        <title>{`Bingemeee - ${query.username}`}</title>
      </Head>
      <Popup18plus></Popup18plus>
      <div className={styles.main}>
        <div className={styles.header}>
          <Image src={Report} onClick={() => { navigateToContactus() }} />
          {!isUserLoggedIn && <div className={styles.LoginLink} onClick={openLoginModal}>
            Login
          </div>}
        </div>
        {isUserLoggedIn && <div className={styles.LoginLink}>
          Welcome {loggedInUser.name} | <Link href="#"><a onClick={logout} className={styles.LoginLink}>Logout</a></Link>
        </div>}
        <h5 className={styles.title} >{query.test}WELCOME TO MY OFFICIAL WEBSITE</h5>
        <p className={styles.subTitle} >CHECK OUT MY EXCLUSIVE PHOTOS AND VIDEOS</p>

        <div className={styles.contentSection}>
          <div className={styles.profileIconOuter}>
            <div className={styles.profileIconInner} style={{ backgroundImage: `url(${state.user?.photoUrl})` }}>
            </div>
          </div>
          <h3>{state?.user?.fullName}</h3>
          {state.subscriptions && state.expiryDuration == 0 && <button onClick={subscribe}>Subscribe</button>}
          {state.expiryDuration != 0 && <div className={styles.expiryDuration}>Your Subscrption will expire after {state.expiryDuration} days</div>}
          <p className={styles.subHeading}>Let's Connect</p>
          <div className={styles.cardContainer}>

            {state.cardList && state.cardList.map((data, index) => {
              return (
                <>
                  <div className={styles.slot} key={index.toString()}>
                    <div className={styles.around}>
                      <h4 className={styles.chattitle}>{data.title}</h4>
                      <p className={styles.chatContent}>{data.description}</p>
                    </div>
                    <div className={styles.bookContainer}>
                      <p className={styles.price}>₹ {data.price}</p>
                      <div className={styles.align}>
                        <a onClick={() => handleOpen(data.id, data.title, true)}>Book now</a>
                      </div>
                    </div>
                  </div>
                </>
              )
            }
            )}

          </div>

          {state.images?.length != 0 && <h4 className={styles.subHeading}>Images</h4>}
          <div className={styles.parentScroll}>
            {state.images && state.images.map((data, index) => {
              const displayUnlock = data.isPaid == 'Yes' && purchasedProduct.indexOf(data.id) == -1 ? true : false
              const albumImages = data.albumFileNames ? data.albumFileNames.split(',') : ''
              const albumImageCount = albumImages ? albumImages.length : 0
              return (
                <div key={index.toString()}>
                  <div className={styles.scroll}>
                    {displayUnlock &&
                      <>
                       {albumImageCount > 0 && <div className={styles.albumIcon}>
                            <Image src={AlbumIcon} width={20} height={20}/ >
                            &nbsp;{albumImageCount}
                            </div>}
                        <div className={styles.unlockWrapper}>
                          <svg viewBox="0 0 448 512" width="25" className={styles.alt} fill="#757575">
                            <path d="M400 256H152V152.9c0-39.6 31.7-72.5 71.3-72.9 40-.4 72.7 32.1 72.7 72v16c0 13.3 10.7 24 24 24h32c13.3 0 24-10.7 24-24v-16C376 68 307.5-.3 223.5 0 139.5.3 72 69.5 72 153.5V256H48c-26.5 0-48 21.5-48 48v160c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zM264 408c0 22.1-17.9 40-40 40s-40-17.9-40-40v-48c0-22.1 17.9-40 40-40s40 17.9 40 40v48z" />
                          </svg>

                        <p className={styles.unlock} onClick={() => handleOpen(data.id, "image", false)}>Unlock ₹{data.price}</p>
                        </div>
                      </>

                    }

                    {!displayUnlock &&
                    <>
                      {albumImageCount > 0 && <div className={styles.albumIcon}>
                        <Image src={AlbumIcon} width={20} height={20}/ >
                        &nbsp;{albumImageCount}
                        </div>
                      }

                      <div className={styles.unlockWrapper}>
                        <img
                          src={
                            data?.fileUrl
                          }
                        onClick={() => openFreeProduct(data, true)}


                        width="153"
                        className={styles.imgList}
                        height="160.5"
                      />
                      </div>
                      </>
                    }
                  </div>
                  <p className={styles.imgTitle}>{data.title}</p>
                </div>
              )
            }
            )}
          </div>

          {state.videos?.length != 0 && <h4 className={styles.subHeading}>Videos</h4>}
          <div className={styles.parentScroll}>
            {state.videos && state.videos.map((data, index) => {
              const displayUnlock = data.isPaid == "Yes" && purchasedProduct.indexOf(data.id) == -1 ? true : false
              const albumImages = data.albumFileNames ? data.albumFileNames.split(',') : ''
              const albumImageCount = albumImages ? albumImages.length : 0
              let poster = ''
              
              if (data.albumFileNames && data.albumUrl) {
                const albumUrl = data.albumUrl.slice(0, -1)
                poster= albumUrl.replace('videos/', 'thumbnail/') + '-thumbnail.png'
              }
              else {
                poster = data.fileUrl ? data.fileUrl.replace('videos/', 'thumbnail/').replace('.mp4', '-thumbnail.png') : ''
                
              }
              return (
                  <div key={index.toString()}>
                    
                    <div className={styles.scroll}>
                      {displayUnlock &&
                        <>
                          {albumImageCount > 0 && <div className={styles.albumIcon}>
                            <Image src={AlbumIcon} width={20} height={20}/ >
                            &nbsp;{albumImageCount}
                            </div>}
                          <svg viewBox="0 0 448 512" width="25" className={styles.alt} fill="#757575">
                            <path d="M400 256H152V152.9c0-39.6 31.7-72.5 71.3-72.9 40-.4 72.7 32.1 72.7 72v16c0 13.3 10.7 24 24 24h32c13.3 0 24-10.7 24-24v-16C376 68 307.5-.3 223.5 0 139.5.3 72 69.5 72 153.5V256H48c-26.5 0-48 21.5-48 48v160c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zM264 408c0 22.1-17.9 40-40 40s-40-17.9-40-40v-48c0-22.1 17.9-40 40-40s40 17.9 40 40v48z" />
                          </svg>

                          <p className={styles.unlock} onClick={() => handleOpen(data.id, "image", false)}>Unlock ₹{data.price}</p>
                        </>

                      }
                      {!displayUnlock &&
                        <>
                         {albumImageCount > 0 && <div className={styles.albumIcon}>
                            <Image src={AlbumIcon} width={20} height={20}/ >
                            &nbsp;{albumImageCount}
                            </div>}
                            <div className={styles.playIcon}> 
                          <PlayArrowIcon />
                        </div>
                        <video
                          onClick={() => openFreeProduct(data, false)}
                          key={index.toString()}
                          width="153"
                          className={styles.imgList}
                          height="160.5"
                          poster={poster}
                        >
                          <source src={data?.fileUrl} type='video/mp4'/>
                        </video>
                        </>
                      }
                  </div>
                  <p className={styles.imgTitle}>{data.title}</p>
                </div>
              )
            }
            )}
          </div>
        </div>


      </div>
      <Footer></Footer>

      <PaymentDetails handleclose={handleClose}
        open={isPaymentOpen}
        productid={payableProductId}
        username={query.username}
        isCard={isCard}
        paymentTitle={paymentTitle}
        subscription={subscription}
        loggedInUser={loggedInUser}
        handlePaymentComplete={handlePaymentComplete}
        paymentGateway={props.paymentGateway}
      >
      </PaymentDetails>

      <Modal
        open={isFreeProdcutOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <>
            {!currentAlbum && openedProduct.isImage && <Image
              loader={imageLoader}
              src={openedProduct.fileUrl}
              alt="Picture of the author"
              onLoadingComplete={getImageSize}
              width={naturalWidth}
              height={naturalHeight}
              layout="responsive"
            // height={500}
            />}

            {!currentAlbum && !openedProduct.isImage &&
              <video
                src={openedProduct.fileUrl}
                controls
                controlsList="nodownload"
                className={styles.video}
                alt="Picture of the author"
                poster={openedProduct.poster}
                //poster={openedProduct.fileUrl ? openedProduct.fileUrl.replace('videos/', 'thumbnail/').replace('.mp4', '-thumbnail.png'): ''}
                >
                  <source src={openedProduct?.fileUrl} type='video/mp4'/>
                </video>
            }
            {currentAlbum && 
            <div className={styles.carousel} >
              { currentAlbum.index>0 && <div className={styles.carouselPrev} onClick={albumPrev}><ArrowBackIosNew /></div>}
              <div className={styles.carouselItem}>
              { currentAlbum.isImage && <Image src={currentAlbum.url}
                loader={imageLoader}
                alt="Picture of the author"
                onLoadingComplete={getImageSize}
                width={naturalWidth}
                height={naturalHeight}
                layout="responsive"
                />}
                {!currentAlbum.isImage && 
                  <video
                  src={currentAlbum.url}
                  controls
                  controlsList="nodownload"
                  className={styles.video}
                  alt="Picture of the author"
                  poster={currentAlbum.poster}
                  >
                    <source src={currentAlbum?.url} type='video/mp4'/>
                  </video>
                }
              </div>
              <div className={styles.carouselPage}>{currentAlbum.index + 1}/{currentAlbum.length}</div>
              { currentAlbum.index < currentAlbum.length - 1 && <div className={styles.carouselNext} onClick={albumNext}><ArrowForwardIosIcon /></div> }
            </div>
            }
          </>
        </Box>
      </Modal>
      {loginModelOpen && <ModalComponent open={loginModelOpen} onClose={loginModelClose} modalStyle={modalStyle} >
        <Login openSignupModal={openSignupModal} handleOtpSent={handleOtpSent} />
      </ModalComponent>}
      {signUpModelOpen && <ModalComponent open={signUpModelOpen} onClose={signupModelClose} modalStyle={modalStyle} >
        <SignUp handleOtpSent={handleOtpSent} influencer={query.username} />
      </ModalComponent>}
      {otpModalOpen &&
        <ModalComponent open={otpModalOpen} onClose={otpModelClose} modalStyle={modalStyle} >
          <OtpForm type={otpType} email={otpEmail} processVerifiedOtp={processVerifiedOtp}/>
        </ModalComponent>}

        {isPaymentSucess &&
          <ModalComponent open={isPaymentSucess} onClose={paymentModelClose} modalStyle={alertModalStyle} >
          <div>
            <CloseIcon className={styles.closeIcon} onClick={paymentModelClose}/>
            <PaymentSuccess isCard = {props.paymentIsCard} isSubscription={props.paymentIsSubscription}/>
          </div>
          </ModalComponent>}
          {isPaymentFailure &&
            <ModalComponent open={isPaymentFailure} onClose={paymentModelClose} modalStyle={alertModalStyle} >
              <div>
              <CloseIcon className={styles.closeIcon} onClick={paymentModelClose}/>
              <PaymentFailure/>
            </div>
            </ModalComponent>}
          {isPaymentProcessFailure && 
            <ModalComponent open={isPaymentProcessFailure} onClose={()=>setIsPaymentProcessFailure(false)} modalStyle={alertModalStyle} >
            <div>
            <CloseIcon className={styles.closeIcon} onClick={()=>setIsPaymentProcessFailure(false)}/>
            <PaymentProcessFailure/>
          </div>
          </ModalComponent>}
          {isSubscription && 
            <ModalComponent open={isSubscription} onClose={()=>setIsSubscription(false)} modalStyle={modalStyle} >
            <div>
            <CloseIcon className={styles.closeIconInside} onClick={()=>setIsSubscription(false)}/>
            <SubscriptionForm subscription={state.subscriptions.subscription} handleSelection={handleSubscribe}/>
          </div>
          </ModalComponent>}
    </div>
  );
}

export const getServerSideProps = async(context) => {
  let paymentSuccess = false
  let paymentFailure = false
  let paymentIsCard = false
  let paymentIsSubscription = false
  if (context.query && ((context.query.payment_id && context.query.payment_request_id) || (context.query.order_id && context.query.order_token))) {
    const res = await storePaymentDetail(context.query)
    console.log(res)
    if (res && res.data && res.data.status && res.data.status == "payment success") {
      paymentSuccess = true
      paymentIsCard = res.data.isCard
      paymentIsSubscription = res.data.isSubscription
    }
    else {
      paymentFailure = true
    }
  }
  
  return { props: {paymentSuccess, paymentFailure, paymentIsCard, paymentIsSubscription, paymentGateway: process.env.PAYMENT_GATEWAY}}
}

export default MainPage