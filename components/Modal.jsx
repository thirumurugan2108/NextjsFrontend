import React from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

export default function Model({open, onClose, modalStyle, ...props}) {

return (<Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          {props.children}
        </Box>
      </Modal>)
}