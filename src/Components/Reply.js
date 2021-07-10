import React, { useEffect, useState } from 'react'
import { useStateValue } from '../StateProvider';
import { Avatar } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import "../Css/Reply.css"


function Reply({ reply, postEmail, commentEmail, commentId }) {
    const [{ users, user }, dispatch] = useStateValue();
    const [dp, setDp] = useState()
    const [name, setName] = useState()
    const [deleted, setdeleted] = useState(false);

    useEffect(() => {
        users?.map(replyUser => {
            if (reply.email == replyUser.email) {
                console.log(replyUser)
                setDp(replyUser.dp)
                setName(replyUser.name)
            }
        })
    }, [users])

    const handledelete = () => {
        dispatch({
            type: 'DELETE_REPLY',
            commentId: commentId,
            replyId: reply._id
        })
    }
    return (
        <div className="reply-full">
            <div className="reply_user">
                <img src={dp} />
                <h6>{name}</h6>
            </div>
            <div className="replyAndDelete">
                <p className="reply-content">{reply.reply}</p>
                <div>
                    {(reply.email === user?.email) || (postEmail === user?.email) || (commentEmail === user?.email) ? (
                        <div onClick={() => setdeleted(!deleted)}>
                            <DeleteIcon />
                        </div>
                    ) : (
                            <div></div>
                        )}
                </div>
            </div>
            {deleted ? (
                <div className="deletedConfirm">
                    <p>
                        Are you Sure
            <br /> You Wanna Delete
          </p>
                    <button onClick={() => {
                        handledelete();
                        setdeleted(false);
                    }}>Confirm</button>
                    <button onClick={() => setdeleted(false)}>No</button>
                </div>
            ) : (
                    <div></div>
                )}
        </div>
    )
}

export default Reply
