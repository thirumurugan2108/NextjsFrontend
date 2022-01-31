import React, { useState } from "react";
import Layout from "../../src/components/layout";
import styles from './service-history1.module.scss';
import styles1 from "./card.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneSquare, faWallet,faMoneyCheckAlt,faRupeeSign,faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { faFacebook} from "@fortawesome/free-brands-svg-icons";
import { faGooglePlusSquare} from "@fortawesome/free-brands-svg-icons";

import { faInstagram} from "@fortawesome/free-brands-svg-icons";
import Box from '@mui/material/Box';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import NativeSelect from '@mui/material/NativeSelect';

import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


import { useReducer } from "react";
import { borderRadius } from "@mui/system";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 100,
  borderRadius:4,
  bgcolor: 'background.paper',
  boxShadow: 4,
  p: 4,
};

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
        cardlist: state.cardList.map((data, index) => {
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

const ServiceHistory = (_props) => {
  const [fileName, setfileName] = useState();
  const [isDisplayModal, setdisplayModal] = useState(false);
  const [isStatusEditable, setStatusEditabe] = useState(false);
  const [isCardEditMode, setisCardEditMode] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  async function onFileChange(event) {
    // setSelectedFile(event.target.files[0]);
    setfileName(event.target.files[0].name);


    // props.updateFile(event);
  }

  const onEdit = (index) => {
    dispatch({ type: "editToggle", index: index, isEdit: true })
  }

  const onEditCancel = (index) => {
    dispatch({ type: "editToggle", index: index, isEdit: false })
  }

  const onCardSubmit = (index) => {
    dispatch({ type: "editToggle", index: index, isEdit: true })
  }

  const viewDetails = () => {
    console.log('view');
    setdisplayModal(true);
  };


  const editStatus = () => {
    setStatusEditabe(true);
  };

  const hideDetails = () => {
    setdisplayModal(false);
  }

  const saveSatus = () => {
    setStatusEditabe(false);
    // save the status to backend..call the service here
  }


  const cancelStatus = () => {
    setStatusEditabe(false);
  }
  const [status, setstatus] = React.useState('');

  const handleChange = (event) => {
    setstatus(event.target.value);
  };

  return (
    <Layout>
      <h3 id={styles.head1}>Hi Names</h3>
        <h2 id={styles.head2}>Welcome Back!</h2>
      <div className={styles.container}>
        <div id={styles.total}> 
        <div className={styles.left}> 
        <a ><FontAwesomeIcon icon={faWallet} size="6x">
    </FontAwesomeIcon></a>
    <h3>Total Revenue</h3>
          </div> 
    <div className={styles.right}>
     <h2> <FontAwesomeIcon icon={faRupeeSign} size="1x">
    </FontAwesomeIcon> : 65478</h2> 
      </div>
      </div>
        <div id={styles.bal}><h3>Balance</h3><p><FontAwesomeIcon icon={faRupeeSign} size="1x">
    </FontAwesomeIcon> :  9872</p><a ><FontAwesomeIcon className={styles.money} icon={faMoneyCheckAlt} size="4x">
    </FontAwesomeIcon></a></div>
        <div id={styles.paid}><h3>Paid</h3><p><FontAwesomeIcon icon={faRupeeSign} size="1x">
    </FontAwesomeIcon> : 7654  </p> <a ><CreditScoreIcon className={styles.svg_icons}></CreditScoreIcon></a></div>
        <h2 id={styles.head3}>Pending</h2>

        <a  onClick={viewDetails} id={styles.detail}>
          <div  className={styles.column1}><a ><FontAwesomeIcon icon={faArrowAltCircleRight} size="2x">
    </FontAwesomeIcon></a></div>

          <div className={styles.column2} >
            <h3>Thirumurugan</h3>
            {!isStatusEditable && <p>Pending</p>}
          </div>
          <div className={styles.column3}>
          <p><FontAwesomeIcon icon={faRupeeSign} size="1x">
    </FontAwesomeIcon> : 400</p>
    {/* <button style={{marginRight:5}} onClick={viewDetails}>View details</button>
            {isStatusEditable && <select name="status" id="status">
              <option value="pending">pending</option>
              <option value="success">success</option>
            </select>
            }  */}
            {/* <p >
            {!isStatusEditable &&  <button style={{marginRight:5}}onClick={editStatus}>edit</button>}
            {isStatusEditable &&  <button  style={{marginRight:5}}onClick={saveSatus}>save</button>}
            {!isStatusEditable && <button style={{marginRight:5}} onClick={viewDetails}>View</button>}
            {isStatusEditable && <button  style={{marginRight:5}}onClick={cancelStatus}>Cancel</button>}
            </p> */}
          </div>
          
        </a>


        <Modal
          open={isDisplayModal}
          onClose={hideDetails}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          
        >
         
          <Box id={styles1.cardloginContainer} sx={style}>
          
          
    
    
   
    <h1>
     User details
    </h1>
    <div className={styles1.cardsocial}>
    <div style={{padding:10}}><b>Name</b>&nbsp;&nbsp;:&nbsp;&nbsp;Thirumurugan</div>
    <div style={{padding:10}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Email Id</b>&nbsp;:&nbsp;&nbsp;name123@gmail.com</div>
    <div style={{padding:10}}><b>Info</b>&nbsp;&nbsp;:&nbsp;&nbsp;instaidname</div>
    <div style={{padding:10}}><b>Contact</b>&nbsp;:&nbsp;&nbsp;911234567890</div>
    <div style={{padding:10}}><b>Status</b>&nbsp;:&nbsp;&nbsp; <NativeSelect
          defaultValue={30}
          inputProps={{
            name: 'age',
            id: 'uncontrolled-native',
          }}
        >
          <option value={10}>Pending</option>
          <option value={20}>Finished</option>
          
        </NativeSelect></div>
    </div>
   
  <div>
        <Button variant="outlined" onClick={hideDetails} style={{left:50}}>Close</Button>
  `     <Button variant="outlined" style={{left:150}}>OK</Button>
            </div>
  
  </Box>
        </Modal>
      </div>
    </Layout>
  );
};

export default ServiceHistory;
