import { useRouter } from "next/dist/client/router";
import * as React from "react";
import Layout from "../../src/components/Layout";
import Menu from "../../src/components/Menu";
import { useConfigSetState } from "../../utils/context/postContext";
import { getAllpost } from "../../utils/services/post.service";
import styles from "./influencerContent.module.scss";

export default function About() {
  const [imageList, setImageList] = React.useState([]);
  const [videoList, setVideoList] = React.useState([]);
  const [isVideo, setIsVideo] = React.useState(false);
  const setConfigState = useConfigSetState();
  const router = useRouter();
  React.useEffect(() => {
    if (sessionStorage.getItem('token')) {
      fetchAllPosts();
    } else {
      router.push('./login');
    }
  }, [])

  const fetchAllPosts = async () => {
    try {setIsVideo(false);
    const result = await getAllpost();
    console.log(result.data);
    setImageList(result.data.images);
    setVideoList(result.data.videos);
  } catch(err){
    console.log(err);
    router.push('./login');
  }
  }

  const fetchAllVideos = async () => {
    setIsVideo(true);
  }

  const onPostEdit = (data) => {
    setConfigState(data);
    router.push('./addOrEditPost');
  }
  return (
    <Layout>
      <div className={styles.align}>
        <a className={styles.border} onClick={() => fetchAllPosts()}>Images({imageList.length})</a>
        <a className={styles.border} onClick={() => fetchAllVideos()}>Videos({videoList.length})</a>
      </div>
      <div className={styles.image}>
        {/* if(!isVideo && imageList){ */}
        {!isVideo && imageList
          && imageList.map((data, index) => {
            return (
              <img
                src={
                  data?.fileUrl
                }
                onClick={() => onPostEdit(data)}
                key={index.toString()}
                width="110"
                className={styles.imgList}
                height="110"
              />
            )
          }
          )
        }
        {isVideo && videoList && videoList.map((data, index) => {
          return(<video
            src={
              data?.fileUrl
            }
            onClick={() => onPostEdit(data)}
            key={index.toString()}
            width="110"
            className={styles.imgList}
            height="110"
          />)
        })
        }
      </div>
    </Layout>
  );
}
