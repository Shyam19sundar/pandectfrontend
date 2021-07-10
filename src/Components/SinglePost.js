import React, { useEffect, useState, Suspense } from "react";
import axios from "./axios";
import "../Css/SinglePost.css";
import { Avatar } from "@material-ui/core";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import { useStateValue } from "../StateProvider";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import $ from "jquery";
import SingleComment from "./SingleComment";
const InstagramComponent = React.lazy(() => import("./InstagramEmbed"));

function SinglePost({ match }) {
  const [userr, setUser] = useState();
  const [{ user, postToLiked }, dispatch] = useStateValue();
  const [commentAdded, setCommentAdded] = useState(false);
  const [replyClicked, setReplyClicked] = useState(null);

  useEffect(() => {
    axios
      .get("/feedSinglePost", {
        params: {
          postId: match.params.id,
        },
      })
      .then((res) => {
        dispatch({
          type: "SET_POST",
          postToLiked: res.data,
        });
        setCommentAdded(false);
      });
  }, [commentAdded]);

  useEffect(() => {
    axios
      .get("/feedSinglePost", {
        params: {
          postId: match.params.id,
        },
      })
      .then((res) => {
        dispatch({
          type: "SET_POST",
          postToLiked: res.data,
        });
        axios
          .get("/selecteduser", {
            params: {
              userId: res.data.user_id,
            },
          })
          .then((res) => setUser(res.data));
      })
      .catch((err) => console.log(err));
  }, [match.params.id]);

  const addLike = () => {
    dispatch({
      type: "SET_POST_ADD_LIKE",
      postToLiked: postToLiked,
    });
  };

  const removeLike = () => {
    dispatch({
      type: "SET_POST_REMOVE_LIKE",
      postToLiked: postToLiked,
    });
  };

  const handlecomment = (e) => {
    e.preventDefault();
    var comment = $("#comment").val();
    dispatch({
      type: "ADD_COMMENT",
      postToLiked: postToLiked,
      comment: comment,
    });
    setCommentAdded(true);
    $("#comment").val("");
  };
  const replyCancel = (e) => {
    e.preventDefault();
    setReplyClicked(null);
  };
  const replySubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_REPLY",
      reply: $("#replyForm input").val(),
      commentId: replyClicked?._id,
    });

    $("#replyForm input").val("");
  };
  return (
    <div>
      <div className="post_body">
        <div className="postuser_info">
          <Avatar src={userr?.dp} className="postuser_dp" />
          <h2 className="postuser_name">{userr?.name}</h2>
        </div>
        <div className="post_content">
          <h4 className="">{postToLiked?.post_title}</h4>
          <div>
            <div>
              <p>{postToLiked?.post_content}</p>
              {postToLiked?.post_image.map(image => (
                <img src={image} height="300px" width="300px" />
              ))}
            </div>
            {postToLiked?.post_youtubeLink ? (
              <iframe
                src={postToLiked.post_youtubeLink}
                className="post_youtube"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen="allowfullscreen"
                mozallowfullscreen="mozallowfullscreen"
                msallowfullscreen="msallowfullscreen"
                oallowfullscreen="oallowfullscreen"
                webkitallowfullscreen="webkitallowfullscreen"
              ></iframe>
            ) : null}
          </div>
        </div>
        {postToLiked?.post_instaLink ? (
          <Suspense fallback={<div>Loading...</div>}>
            <InstagramComponent />
          </Suspense>
        ) : null}
        <p>{postToLiked?.post_tag}</p>
        <div className="likecommentshare">
          {/* {postToLiked?.post_likes?.length != 0 && */}
          <div className="likeCommentOnly">
            <div className="likeAndNumber">
              {!postToLiked?.post_likes?.some(
                (like) => like.email == user?.email
              ) ? (
                <div onClick={addLike}>
                  <FavoriteBorderIcon />
                </div>
              ) : (
                <div onClick={removeLike}>
                  <FavoriteIcon color="secondary" />
                </div>
              )}
              <h3>{postToLiked ? postToLiked.post_likes.length : "0"}</h3>
            </div>

            <div>
              <ModeCommentIcon />
            </div>
            <h3>{postToLiked ? postToLiked.post_comments.length : "0"}</h3>
          </div>
          <form id="commentForm" className="commentBox">
            <input id="comment" type="text" placeholder="Add a Comment..." />
            <div onClick={handlecomment}>
              <SendRoundedIcon style={{ marginRight: "0.75vw" }} />
            </div>
          </form>
        </div>
        <hr />
        {postToLiked?.post_comments?.length != 0 ? (
          <div>
            {postToLiked?.post_comments?.map((comm) => (
              <SingleComment
                comment={comm}
                key={comm._id}
                setReplyClicked={setReplyClicked}
              />
            ))}
          </div>
        ) : null}
        {replyClicked ? (
          <div className="box">
            <form className="commentBox" id="replyForm">
              <input
                id="reply"
                type="text"
                placeholder={`Reply to ${replyClicked?.name}`}
              />
              <div className="button" style={{ marginLeft: "2vw" }}>
                <button onClick={replySubmit}>Submit</button>
                <button onClick={replyCancel}>Cancel</button>
              </div>
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default SinglePost;
