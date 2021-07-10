import React, { useEffect, useState } from "react";
import Avatar from "avataaars";
import "../Css/Profile.css";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import axios from "./axios";
import _ from "lodash";
import { Button } from "react-bootstrap";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useStateValue } from "../StateProvider";

function Profile({ match }) {
  const [{ user, userToFollow, users }, dispatch] = useStateValue();
  const [userId, setUserId] = useState();

  useEffect(() => {
    axios
      .get("/selecteduser", {
        params: {
          userId: match.params.id,
        },
      })
      .then((res) => {
        dispatch({
          type: "SET_TO_FOLLOW",
          userToFollow: res.data,
        });
        users?.map((temp) => {
          if (temp.email === user?.email) {
            setUserId(temp.id);
          }
        });
      });
  }, [match.params.id, userToFollow]);

  const follow = () => {
    dispatch({
      type: "SET_FOLLOW",
      userToFollow: userToFollow,
    });
  };
  const unFollow = () => {
    dispatch({
      type: "SET_UNFOLLOW",
      userToFollow: userToFollow,
    });
  };

  return (
    <div>
      <div className="profile">
        <div className='left-container'>
          <div className="profile_dp">
            <Avatar
              className="avatar"
              avatarStyle="Circle"
              topType="ShortHairDreads01"
              accessoriesType="Prescription02"
              hairColor="Black"
              facialHairType="BeardLight"
              clotheType="BlazerSweater"
              clotheColor="PastelBlue"
              eyeType="Wink"
              eyebrowType="Default"
              mouthType="Smile"
              skinColor="Light"
            />
          </div>
          <div className="user">
            <div className="user-name">
              <p>
                PANDECT{" "}
                <CheckCircleIcon
                  style={{ fontSize: "25px", color: " rgb(0, 125, 209)" }}
                />
              </p>
            </div>

          </div>

          <div >
            {userToFollow?.followers?.includes(userId) ? (
              <div id='follow-state'>
                <Button onClick={unFollow}>
                  Following
                  <ExpandMoreIcon />
                </Button>
              </div>
            ) : (
                <Button id='follow-state' onClick={follow}>Follow</Button>
              )}
          </div>
        </div>

        <div className="profile_details">
          <div className="userDetail">
            <label> FirstName: </label>
            <p>{userToFollow?.name} </p>
          </div>
          <div className="userDetail">
            <label>Gmail:</label>
            <p> {userToFollow?.email} </p>
          </div>
          <div className="userDetail">
            <label>Followers:</label>
            <p> {userToFollow?.followers?.length} </p>
          </div>
          <div className="userDetail">
            <label>Followings:</label>
            <p> {userToFollow?.following?.length} </p>
          </div>
          <div className="userDetail">
            <label>Posts:</label>
            <p> {userToFollow?.posts?.length} </p>
          </div>
        </div>
      </div>


    </div>
  );
}

export default Profile;
