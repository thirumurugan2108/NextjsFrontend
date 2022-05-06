import { Fragment, useState } from "react";
import classes from "./upladBox.module.scss";

export const siteTitle = "Next.js Sample Website";

export default function UploadBox(props) {
  const [fileNames, setfileNames] = useState([]);
  async function onFileChange(event) {
    // setSelectedFile(event.target.files[0]);
    // if (event?.target?.files.length >5) {
    //   alert("You can able to upload upto 5 images only.")
    // }
    // else {
      let flnames = []
      if (event?.target?.files) {
        console.log(event?.target?.files)
        Array.from(event.target.files).map((fl)=> {
          flnames.push(fl.name)
        })
        setfileNames(flnames);
        props.updateFile(event);
      }
    //}
  }


  return (
    <>
      <div className={classes.uploadContainer}>
        <input type="file" onChange={onFileChange} multiple/>
        {!fileNames ? (
          <p>Drag your image here or click in this area to choose a file.</p>
        ) : (
          <Fragment>
            <p>
              <span className={classes.filename}>{fileNames.join(', ')}</span> file has beed added successfully..
            </p>
            <p> Click here to change the file.</p>
          </Fragment>
        )}
      </div>
    </>
  );
}
