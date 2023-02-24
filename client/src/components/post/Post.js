import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useEffect, useState } from "react";
import Axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
const PF = process.env.REACT_APP_PUBLIC_FOLDER;
export default function Post({ post }) {
  
  const [like, setLike] = useState(post.like.length);
  const [isLiked, setIsLiked] = useState(false);
  let [User, setUser] = useState({});
  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  useEffect(() => {
    const fetchUser = async () => {
      let user = await Axios.get(`/users/${post.userId}`);
      setUser(user);
      console.log("user", user);
    };
    fetchUser();
  }, [post.userId]);
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link
              to={`profile/${User.username}`}
              style={{ textDecoration: "none" }}
            >
              <img
                className="postOwnerImg"
                src={User.profilePicture || PF + "person/0.jpeg"}
                alt=""
              />
            </Link>
            <span className="postUserName">{User.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert></MoreVert>
          </div>
        </div>
        <div className="postCenter">
          <div className="postText">{post?.desc}</div>
          <img className="postImg" src={PF + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              onClick={likeHandler}
              src={PF + "/like.png"}
              alt=""
            />
            <img
              className="likeIcon"
              onClick={likeHandler}
              src={PF + "/heart.png"}
              alt=""
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <div className="postComments">{post.comment} comments</div>
          </div>
        </div>
      </div>
    </div>
  );
}
