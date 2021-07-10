import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import axios from "./axios";
import "../Css/HomePost.css";

import { Route, withRouter } from "react-router";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "@material-ui/core";

import {
  faHeart,
  faTrash,
  faCommentAlt,
  faShareSquare,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import Tooltip from "@material-ui/core/Tooltip";

function HomePost({ post }) {
  const [user, setuser] = useState({});
  const location = useLocation();
  console.log(post);
  console.log(post);
  useEffect(() => {
    axios
      .get("/selecteduser", {
        params: {
          userId: post.user_id,
        },
      })
      .then((res) => setuser(res.data));
  }, [post]);

  return (
    <div className="homePost">
      <Link to={`/post/${post._id}`}>
        <div className="postbox">
          {post.post_image[0] ? (
            <img src={post.post_image[0]} alt="post Image" />
          ) : (
              <img src="../../def.jpg" alt="post Image" />
            )}
        </div>
      </Link>
      <div className="user__details">
        <Avatar src={user.dp} />
        <div className="posttitle">
          {/* <h4>{post.post_title}</h4> */}
          {location.pathname === "/myprofile" ? (
            <div className="content" style={{ display: "flex" }}>
              <div style={{ marginRight: "7vw" }}>
                <h4>{post.post_title}</h4>
                <p>{user.name}</p>
              </div>
              <Tooltip title="Edit">
                <IconButton aria-label="Edit">
                  <Link
                    to={{
                      pathname: "/edit-post",
                      state: { _id: post._id },
                    }}
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </Link>
                </IconButton>
              </Tooltip>
            </div>
          ) : (
              <div className='userInfo-home'>
                <h4>{post.post_title}</h4>
                <p>{user.name}</p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default withRouter(HomePost);
