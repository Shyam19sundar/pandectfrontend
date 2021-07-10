import React, { useState, useEffect } from "react";
import Avatar from "avataaars";
import "../Css/MyProfile.css";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Avatar as Ava } from "@material-ui/core";
import { Button } from "react-bootstrap";
import { useStateValue } from "../StateProvider";
import HomePost from "./HomePost";
import { useLocation } from "react-router-dom";
import axios from "./axios";

function MyProfile() {
  const [{ user, users, posts }, dispatch] = useStateValue();
  const [id, setid] = useState("");
  const location = useLocation();
  console.log(posts);
  useEffect(() => {
    users?.map((singleUser) => {
      if (singleUser.email === user?.email) {
        setid(singleUser.id);
      }
    });
  });
  useEffect(() => {
    axios
      .get("/feed")
      .then((res) =>
        dispatch({
          type: "SET_POSTS",
          posts: res.data,
        })
      )
      .catch((err) => console.log(err));
  }, []);

  console.log(id);
  console.log(posts);
  return (
    <div>
      <div className="top">
        <div className="inner-top-left">
          <div className="inner_content">
            <div className="image">
              <img src={user?.photoURL} alt="" />
            </div>
            <div className="inner_name">{user?.displayName}</div>
            <div className="button">
              <Button className="inner_button">Edit Profile</Button>
            </div>
          </div>
        </div>
        <div className="inner-top-right" style={{ marginRight: "3vw" }}>
          <div className="form-row">
            <div class="form-group col-md-6">
              <label
                for="inputEmail4"
                id="first"
                class="col-sm-2 col-form-label"
              >
                FirstName
              </label>
              <input
                type="text"
                class="form-control "
                id="inputEmail4"
                placeholder="FirstName"
              />
            </div>
            <div className="form-group col-md-6">
              <label
                for="inputPassword4"
                id="last"
                class="col-sm-2 col-form-label "
              >
                Lastname
              </label>
              <input
                type="text"
                class="form-control formip"
                placeholder="Lastname"
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              for="inputGmail3"
              class="col-sm-2 col-form-label col-form-label"
            >
              Gmail:
            </label>
            <div className="col-sm-10">
              <input
                type="email"
                class="form-control formip"
                placeholder="Email"
              />
            </div>
          </div>
          <div className="form-group row">
            <label for="input" class="col-sm-2 col-form-label ">
              Instagram:
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                class="form-control formip"
                placeholder="Insta ID"
              />
            </div>
          </div>
          <div className="form-group row">
            <label for="input" class="col-sm-2 col-form-label ">
              Twitter:
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                class="form-control formip "
                placeholder="Account"
              />
            </div>
          </div>
          <div className="form-group row">
            <label for="input" class="col-sm-2 col-form-label ">
              Youtube:
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                class="form-control formip "
                placeholder="Channel"
              />
            </div>
          </div>
          <div className="form-group row">
            <label for="input" class="col-sm-2 col-form-label ">
              Website:
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                class="form-control formip"
                placeholder="Address"
              />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="bottom">
        {posts?.map((post) => {
          if (post.user_id === id)
            return (
              <div>
                <HomePost post={post} />
              </div>
            );
        })}
      </div>
      {/* <div className="user">
        <div className="user-name">
          <p>
            PANDECT{" "}
            <CheckCircleIcon
              style={{ fontSize: "25px", color: " rgb(0, 125, 209)" }}
            />
          </p>
        </div> */}
      {/* {user?.email == visited ?
          <Button className='profilebut'>Follow</Button>
          : */}
      {/* </div> */}

      {/* <div className="bottom">
        <div>
          <div className="postbox">
            <p>post1</p>
          </div>
          <div className="userava">
            <Ava />
            <div className="posttitle">
              <p>title</p>
            </div>
          </div>
        </div>
        <div>
          <div className="postbox">
            <p>post2</p>
          </div>
          <div className="userava"></div>
        </div>
        <div>
          <div className="postbox">
            <p>post3</p>
          </div>
          <div className="userava">
            <Ava />
            <div className="posttitle">
              <p>title</p>
            </div>
          </div>
        </div>
        <div>
          <div className="postbox">
            <p>post4</p>
          </div>
          <div className="userava">
            <Ava />
            <div className="posttitle">
              <p>title</p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default MyProfile;
