import * as React from "react";
import Layout from "../../src/components/Layout";
import Menu from "../../src/components/Menu";
import { getAllpostImages } from "../../utils/services/post.service";
import styles from "./influencerContent.module.scss";

export default function About() {
const [list,setList] = React.useState([]);
  React.useEffect(()=> {
    async function fetchAllpost(){
      const result = await getAllpostImages();
      console.log(result.data);
      setList(result.data);
    };
    fetchAllpost();
  }, [])
  return (
    <Layout>

        <div className={styles.align}>
          <a className={styles.border}>Images(0)</a>
          <a className={styles.border}>Videos(1)</a>
        </div>
        <div className={styles.image}>
          {list && list.map((data:any, index) => {
            return (<img
              src={
                data?.image
              }
              key={index.toString()}
              width="110"
              className={styles.imgList}
              height="110"
            />)
          })}
          <img
            src={
              "https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554__340.jpg"
            }
            width="110"
            className={styles.imgList}
            height="110"
          />
          <img
            src={
              "https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554__340.jpg"
            }
            width="110"
            className={styles.imgList}
            height="110"
          />
          <img
            src={
              "https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554__340.jpg"
            }
            width="110"
            className={styles.imgList}
            height="110"
          />
          <img
            src={
              "https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554__340.jpg"
            }
            width="110"
            className={styles.imgList}
            height="110"
          />
         
        </div>
        <Menu></Menu>
    
    </Layout>
  );
}
