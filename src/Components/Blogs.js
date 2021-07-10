import React from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import "../Css/Blogs.css"
function Blogs() {
  let location = useLocation();
  console.log(location);

  return (
    <div className="blog__type">
      <NavLink to="/latest/blogs" activeClassName="active">
        <div className="topButton">ALL</div>
      </NavLink>
      <NavLink to="/blogs/cinema">
        <div className="topButton">Cinema</div>
      </NavLink>
      <NavLink to="/blogs/cooking">
        <div className="topButton">Cooking</div>
      </NavLink>
      <NavLink to="/blogs/music">
        <div className="topButton">Music</div>
      </NavLink>
      <NavLink to="/blogs/art">
        <div className="topButton">Art</div>
      </NavLink>
      <NavLink to="/blogs/craft">
        <div className="topButton">Craft</div>
      </NavLink>
      <NavLink to="/blogs/literature">
        <div className="topButton">Literature</div>
      </NavLink>
      <NavLink to="/blogs/photography">
        <div className="topButton">Photography</div>
      </NavLink>
      <NavLink to="/trending">
        <div className="topButton">Trending</div>
      </NavLink>
      <NavLink to="/mostviewed">
        <div className="topButton">Most Views</div>
      </NavLink>
      {/* <div className="topButton">Most Recent</div> */}
      <NavLink to="/mostliked">
        <div className="topButton">Most Liked</div>
      </NavLink>
    </div>


  )
}

export default Blogs
