import React from "react";
import styles from "./pop18.module.scss"
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};


export default function Pop18(props) {
	return (

		<Modal
			open={props.open}
			// onClose={onClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<div className={styles.popup}>
					<h2>You need to be 18 Years of age or over to enter this site</h2>
					{/* <!-- 		<a class="close" href="#">&times;</a> --> */}
					<div className={styles.content}>

						<p>By clicking here you are declaring you are 18 years of age or over </p>
						<Button>Yes I'm over 18 years old </Button>
					</div>
				</div>
			</Box>
		</Modal>

	);
}
