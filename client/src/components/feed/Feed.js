import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import Axios from "axios";
import { useEffect, useState } from "react";
import { Posts } from "../../dummyData";
export default function Feed() {
  // let [Posts, setPosts] = useState([]);
  // useEffect(() => {
  //     const fetch = async () => {
  //         let data = await Axios.get("/posts/timeline/63a94f41ddd77c3464aefcac");
  //         setPosts(data.data);
  //     }
  //     fetch();
  // }, []);
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share></Share>
        {Posts.map((post) => {
          return <Post key={post._id} post={post}></Post>;
        })}
      </div>
    </div>
  );
}
