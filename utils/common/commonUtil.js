import MuiAlert from '@mui/material/Alert';
import {forwardRef} from "react";
import axios from 'axios';
import {getInstaPaymentUrl} from '../services/payment.service'

export function getExtensionFromFileName (filename){
    return filename.split('.').pop();
}
export const alertModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  "min-width": "300px",
  border: "0px",
  background: "transparent",
  text: "#fff",
}
export const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "90%",
    "max-width": "400px",
    // height:800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
    "box-shadow":  "0 0 10px  rgba(0,0,0,0.6)",
    "-moz-box-shadow": "0 0 10px  rgba(0,0,0,0.6)",
    "-webkit-box-shadow": "0 0 10px  rgba(0,0,0,0.6)",
    "-o-box-shadow": "0 0 10px  rgba(0,0,0,0.6)",
}

export const imageLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
}

export const ErrorMessage = ({errors = []}) => {
    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    if (errors.length !== 0) {
      return (
        <Alert severity="error">
          {errors.map((data, key) => {
            return (<li key={key}>{data}</li>)
          })}
        </Alert>
      )
    } else {
      return <></>
    }
}
