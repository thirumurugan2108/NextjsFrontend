import { Fragment, useState } from "react";
import classes from "./upladBox.module.scss";

export const siteTitle = "Next.js Sample Website";

export default function UploadBox() {
  const [fileName, setfileName] = useState();
  async function onFileChange(event: any) {
    // setSelectedFile(event.target.files[0]);
    setfileName(event.target.files[0].name);

    // const formData = new FormData();
    // formData.append("file", event.target.files[0], fileName);
  }

  return (
    <>
      <div className={classes.uploadContainer}>
        <input type="file" onChange={onFileChange} />
        {!fileName ? (
          <p>Drag your excel here or click in this area to choose a file.</p>
        ) : (
          <Fragment>
            <p>
              <strong>{fileName}</strong> file has beed added successfully..
            </p>
            <p> Click here to change the file.</p>
          </Fragment>
        )}
      </div>
    </>
  );
}
