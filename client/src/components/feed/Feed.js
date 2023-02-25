import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import Axios from "axios";
import { useEffect, useState } from "react";
export default function Feed({ username }) {
  let [Posts, setPosts] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      let data = username
        ? await Axios.get("/posts/profile/" + username)
        : await Axios.get("/posts/timeline/63a94f41ddd77c3464aefcac");
      setPosts(data.data);
    };
    fetch();
  }, [username]);
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
