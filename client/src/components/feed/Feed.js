import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import Axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
export default function Feed({ username }) {
  let { user } = useContext(AuthContext);
  let [Posts, setPosts] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      let data = username
        ? await Axios.get("/posts/profile/" + username)
        : await Axios.get(`/posts/timeline/${user._id}`);
      setPosts(
        data.data.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
      );
    };
    fetch();
  }, [username, user]);
  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || user.username === username) && <Share/>}
        {Posts.map((post) => {
          return <Post key={post._id} post={post}></Post>;
        })}
      </div>
    </div>
  );
}
