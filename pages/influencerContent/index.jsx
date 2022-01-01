import { useRouter } from "next/dist/client/router";
import * as React from "react";
import Layout from "../../src/components/Layout";
import Menu from "../../src/components/Menu";
import { useConfigSetState } from "../../utils/context/postContext";
import { getAllpost } from "../../utils/services/post.service";
import styles from "./influencerContent.module.scss";

export default function About() {
const [list,setList] = React.useState([]);
const [isVideo,setIsVideo] = React.useState(false);
const setConfigState = useConfigSetState();
const router = useRouter();
  React.useEffect(()=> {
    if(sessionStorage.getItem('token')){
      fetchAllImages();
    } else {
      router.push('./login');
    }
  }, [])

  const fetchAllVideos = async () => {
    setIsVideo(true);
    const result = await getAllpost(false);
      console.log(result.data);
      setList(result.data);
  }

  const fetchAllImages= async () => {
    setIsVideo(false);
    const result = await getAllpost(true);
      console.log(result.data);
      setList(result.data);
  }

  const onPostEdit = (data) => {
    setConfigState(data);
    router.push('./addOrEditPost');
  }
  return (
    <Layout>
        <div className={styles.align}>
          <a className={styles.border} onClick={() => fetchAllImages()}>Images({list.length})</a>
          <a className={styles.border} onClick={() => fetchAllVideos()}>Videos({list.length})</a>
        </div>
        <div className={styles.image}>
          {list && list.map((data, index) => {
            if(isVideo){
              return (<img
                src={
                  data?.image
                }
                onClick={() => onPostEdit(data)}
                key={index.toString()}
                width="110"
                className={styles.imgList}
                height="110"
              />)
            } else {
              return (<video
                src={
                  data?.image
                }
                onClick={() => onPostEdit(data)}
                key={index.toString()}
                width="110"
                className={styles.imgList}
                height="110"
              />)
            }
          })}
        </div>
    </Layout>
  );
}
