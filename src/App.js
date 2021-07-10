import "./App.css";
import { Route, HashRouter as Router, Switch } from "react-router-dom";
import Auctions from "./Components/Auctions";
import About from "./Components/About";
import Header from "./Components/Header";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { useEffect } from "react";
import Post from "./Components/Post";
import Home from "./Components/Home";
import Profile from "./Components/Profile";
import axios from "./Components/axios";
import MyProfile from "./Components/MyProfile";
import CinemaBlogs from "./Components/CinemaBlogs";
import CookingBlogs from "./Components/CookingBlogs";
import LatestBlogs from "./Components/LatestBlogs";
import MusicBlogs from "./Components/MusicBlogs";
import ArtBlogs from "./Components/ArtBlogs";
import CraftBlogs from "./Components/CraftBlogs";
import LitretaureBlogs from "./Components/LitretaureBlogs";
import PhotographyBlogs from "./Components/PhotographyBlogs";
import TrendingBlogs from "./Components/TrendingBlogs";
import MostViewedBlogs from "./Components/MostViewedBlogs";
import MostLikedBlogs from "./Components/MostLikedBlogs";
import SinglePost from "./Components/SinglePost";

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: "SET_USER",
          user: user,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
    axios
      .get("/searchusers")
      .then((res) => {
        dispatch({
          type: "SET_USERS",
          users: res.data,
        });
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <Router>
      <div className="header">
        <Header />
      </div>
      <Switch>
        <Route path="/profile/:id" exact component={Profile} />
        <Route path="/auctions">
          <Auctions />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/newpost">
          <Post />
        </Route>
        <Route path="/latest/blogs" exact component={LatestBlogs} />
        <Route path="/post/:id" component={SinglePost} />
        <Route path="/blogs/cinema" component={CinemaBlogs} />
        <Route path="/blogs/cooking" component={CookingBlogs} />
        <Route path="/blogs/music" component={MusicBlogs} />
        <Route path="/blogs/art" component={ArtBlogs} />
        <Route path="/blogs/craft" component={CraftBlogs} />
        <Route path="/blogs/literature" component={LitretaureBlogs} />
        <Route path="/blogs/photography" component={PhotographyBlogs} />
        <Route path="/trending" component={TrendingBlogs} />
        <Route path="/mostviewed" component={MostViewedBlogs} />
        <Route path="/mostliked" component={MostLikedBlogs} />
        <Route path="/myprofile">
          <MyProfile />
        </Route>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/edit-post">
          <Post />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
