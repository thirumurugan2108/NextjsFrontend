import MuiAlert from '@mui/material/Alert';
import {forwardRef} from "react";

export function getExtensionFromFileName (filename){
    return filename.split('.').pop();
}

export const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    // height:800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
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


    
