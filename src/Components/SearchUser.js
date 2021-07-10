import React from "react";
import { Link } from "react-router-dom";
import "../Css/SearchUser.css";

function SearchUser({ user }) {
  console.log(user);
  return (
    <Link to={`/profile/${user.id}`}>
      <div className="searchUser">
        <img
          className="searchUserImage"
          src={user.dp}
          alt="displaypicture"
        ></img>
        <p>{user.name}</p>
      </div>
    </Link>
  );
}

export default SearchUser;
