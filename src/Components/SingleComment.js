import React, { useEffect, useState } from "react";
import axios from "./axios";
import DeleteIcon from "@material-ui/icons/Delete";
import { useStateValue } from "../StateProvider";
import "../Css/SingleComment.css";
import { Button, Comment, Form, Header } from "semantic-ui-react";
import { Avatar } from "@material-ui/core";
import Reply from "./Reply";

function SingleComment({ comment, setReplyClicked }) {
  const [deleted, setdeleted] = useState(false);
  const [{ user, postToLiked }, dispatch] = useStateValue();
  const [postEmail, setpostEmail] = useState("");

  const handledelete = () => {
    dispatch({
      type: "REMOVE_COMMENT",
      postToLiked: postToLiked,
      comment: comment,
    });
  };

  useEffect(() => {
    axios
      .get("/selecteduser", {
        params: {
          userId: postToLiked.user_id,
        },
      })
      .then((res) => {
        setpostEmail(res.data.email);
      });
  }, []);

  const replyClick = (e) => {
    e.preventDefault();
    setReplyClicked(comment);
  };

  return (
    <div className="comment__full">
      <div className="comment__user">
        <Avatar src={comment?.dp} />
        <div className="comment__user__name">{comment?.name}</div>
        <div className="delete">
          {comment?.email == user?.email || postEmail == user?.email ? (
            <div onClick={() => setdeleted(!deleted)}>
              <DeleteIcon />
            </div>
          ) : (
              <div></div>
            )}
        </div>
      </div>
      <div className="details">
        <div className="comment">{comment?.comment}</div>
        <div className="commentReply" onClick={replyClick}>
          Reply to this comment
        </div>
      </div>
      {deleted ? (
        <div className="deletedConfirm">
          <p>
            Are you Sure
            <br /> You Wanna Delete
          </p>
          <button
            onClick={() => {
              handledelete();
              setdeleted(false);
            }}
          >
            Confirm
          </button>
          <button onClick={() => setdeleted(false)}>No</button>
        </div>
      ) : (
          <div></div>
        )}
      <div className="comment_replies">
        {comment.replies?.map((reply) => (
          <Reply
            reply={reply}
            postEmail={postEmail}
            commentEmail={comment?.email}
            commentId={comment?._id}
          />
        ))}
      </div>
      <hr />
    </div>
  );
}
export default SingleComment;
