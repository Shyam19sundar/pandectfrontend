import axios from "./Components/axios";

export const initialState = {
  user: null,
  posts: [],
  users: null,
  userToFollow: null,
  postToLiked: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER": {
      return {
        ...state,
        user: action.user,
      };
    }

    case "SET_POSTS": {
      return {
        ...state,
        posts: action.posts,
      };
    }

    case "SET_USERS": {
      return {
        ...state,
        users: action.users,
      };
    }

    case "SET_TO_FOLLOW": {
      return {
        ...state,
        userToFollow: action.userToFollow,
      };
    }

    case "SET_FOLLOW": {
      var userToFollowTemp = action.userToFollow;
      axios
        .post("/newfollow", {
          toWhomHeGivesFollow: userToFollowTemp.email,
          personGivingFollow: state.user.email,
        })
        .then((res) => {
          updated = res.data;
        });
      userToFollowTemp.followers.push(state.user.email);
      return {
        ...state,
        userToFollow: userToFollowTemp,
      };
    }
    case "SET_UNFOLLOW": {
      var userTounFollowTemp = action.userToFollow;
      var updated;
      axios
        .post("/unfollow", {
          toWhomHeGivesunFollow: userTounFollowTemp.email,
          personGivingunFollow: state.user.email,
        })
        .then((res) => {
          updated = res.data;
          return {
            ...state,
            userToFollow: updated,
          };
        });
    }

    case "SET_POST": {
      return {
        ...state,
        postToLiked: action.postToLiked,
      };
    }

    case "SET_POST_REMOVE_LIKE": {
      var postToLiked = action.postToLiked;
      postToLiked.post_likes.map((liker) => {
        if (liker.email == state.user?.email) {
          console.log("HELLO");
          axios
            .post("/removelike", {
              postId: postToLiked?._id,
              email: state.user?.email,
            })
            .then((res) => {
              console.log(res.data);
            });
        }
      });
      var index = postToLiked.post_likes.findIndex(
        (like) => like.email == state.user?.email
      );
      postToLiked.post_likes.splice(index, 1);
      console.log(postToLiked.post_likes);

      return {
        ...state,
        postToLiked: postToLiked,
      };
    }

    case "SET_POST_ADD_LIKE": {
      var postToLiked = action.postToLiked;
      var dp;
      var name;
      state.users.map((singleUser) => {
        if (state.user?.email === singleUser.email) {
          dp = singleUser.dp;
          name = singleUser.name;
        }
      });
      const obj = {
        dp: dp,
        name: name,
        email: state.user.email,
      };
      postToLiked?.post_likes.push(obj);
      axios
        .post("/addlike", {
          postId: postToLiked?._id,
          likerDp: dp,
          likerName: name,
          likerEmail: state.user.email,
        })
        .then((res) => {
          console.log(res.data);
        });
      return {
        ...state,
        postToLiked: postToLiked,
      };
    }
    case "ADD_COMMENT": {
      var postToLiked = action.postToLiked;
      var dp;
      var name;
      var comment = action.comment;

      state.users.map((singleUser) => {
        if (state.user?.email == singleUser.email) {
          dp = singleUser.dp;
          name = singleUser.name;
        }
      });
      const obj = {
        dp: dp,
        name: name,
        email: state.user.email,
        comment: comment,
      };
      postToLiked.post_comments.push(obj);
      axios
        .post("/add-comment", {
          postId: postToLiked?._id,
          commentDp: dp,
          commentName: name,
          commentEmail: state.user?.email,
          comment: comment,
        })
        .then((res) => console.log(res.data));
      return {
        ...state,
        postToLiked: postToLiked,
      };
    }
    case "REMOVE_COMMENT": {
      var postToLiked = action.postToLiked;
      var comment = action.comment;
      if (comment.email == state.user?.email) {
        axios
          .post("/removecomment", {
            postId: postToLiked?._id,
            comm: comment,
          })
          .then((res) => {
            console.log(res.data);
          });
      }
      var index = postToLiked.post_comments.findIndex(
        (comm) => comm.comment == comment.comment
      );
      postToLiked.post_comments.splice(index, 1);
      return {
        ...state,
        postToLiked: postToLiked,
      };
    }

    case "ADD_REPLY": {
      var postToLiked = state.postToLiked;
      var reply = action.reply;
      var commentId = action.commentId;
      const obj = {
        email: state.user.email,
        reply: reply,
      };
      postToLiked.post_comments.map((comment) => {
        if (comment._id == commentId) {
          comment.replies.push(obj);
        }
      });
      axios
        .post("/addreply", {
          postId: postToLiked._id,
          commentId: commentId,
          replyEmail: state.user.email,
          reply: reply,
        })
        .then((res) => console.log(res.data));
      return {
        ...state,
        postToLiked: postToLiked,
      };
    }

    case "DELETE_REPLY": {
      var postToLikedTemp = state.postToLiked;
      var replyId = action.replyId;
      var commentId = action.commentId;
      postToLikedTemp.post_comments.map((comment) => {
        if (comment._id == commentId) {
          var index = comment.replies.findIndex(
            (replyTemp) => replyTemp._id == replyId
          );
          comment.replies.splice(index, 1);
        }
      });
      axios
        .post("/deletereply", {
          postId: postToLikedTemp._id,
          commentId: commentId,
          replyId: replyId,
        })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
      return {
        ...state,
        postToLiked: postToLikedTemp,
      };
    }

    default:
      return state;
  }
};
