import "./post.css";
import { AuthContext } from "../../context/AuthContext";
import { MoreVert } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import Axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import axios from "axios";

const PF = process.env.REACT_APP_PUBLIC_FOLDER;

export default function Post({ post }) {
  useEffect(() => {
    const fetchUser = async () => {
      let user = await Axios.get(`/users?userId=${post.userId}`);
      setUser(user.data.user);
    };
    fetchUser();
  }, [post.userId]);

  const { user } = useContext(AuthContext);
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  let [User, setUser] = useState({});
  const likeHandler = async () => {
    try {
      await axios.put("/posts/" + post._id + "/like", { userId: user._id });
    } catch (err) {
      console.log(err)
      window.alert(err);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  useEffect(() => {
    setIsLiked(post.likes.includes(user._id));
  }, [post, user._id]);

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link
              to={`/profile/${User.username}`}
              style={{ textDecoration: "none" }}
            >
              <img
                className="postOwnerImg"
                src={
                  User.profilePicture
                    ? PF + "person/" + User.profilePicture
                    : PF + "/person/0.jpeg"
                }
                alt=""
              />
            </Link>
            <span className="postUserName">{User.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <div className="postText">{post?.desc}</div>
          {post.img ? (
            <img className="postImg" src={PF + "files/" + post?.img} alt="" />
          ) : (
            ""
          )}
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
            <span className="postLikeCounter">{like} like it</span>
          </div>
          <div className="postBottomRight">
            {/* <div className="postComments">{post.comment} comments</div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
