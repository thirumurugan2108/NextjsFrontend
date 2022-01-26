import React from "react";
import styles from "./pop18.module.scss"
import Button from '@mui/material/Button';



export default function Pop18() {
  return (
      
<div id={styles.popup1}>
	<div className={styles.popup}>
		<h2>You need to be 18 Years of age or over to enter this site</h2>
{/* <!-- 		<a class="close" href="#">&times;</a> --> */}
		<div className={styles.content}>
			
      <p>By clicking here you are declaring you are 18 years of age or over </p>
      <Button>Yes I'm over 18 years old </Button>
		</div>
	</div>
</div>
  );
}
