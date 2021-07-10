import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "../Css/Home.css";
import { useStateValue } from "../StateProvider";
import axios from "./axios";
import HomePost from "./HomePost";

function Home() {
  const [{ posts }, dispatch] = useStateValue();
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

  return (
    <div className="home">
      <div className="title">
        <h1>THE PANDECT</h1>
        <p1>Where Talent Meets Opportunity</p1>
        <div className="p2">
          <p2>
            The Pandect is a platform that focuses on every ambient of Art and
            tries to bring it under one roof{" "}
          </p2>
        </div>
        <div className="b4">
          <Button>Create</Button>
        </div>
        <img src="Home.png" />
      </div>
      <div className="p5">
        <p3>#Trending</p3>
      </div>
      <div className="bottom">
        {posts?.map((post) => (
          <div>
            <HomePost post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
