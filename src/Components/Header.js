import React, { useEffect } from "react";
import { Navbar, Form, Button, Nav, FormControl } from "react-bootstrap";
import SearchIcon from "@material-ui/icons/Search";
import "../Css/Header.css";
import Login from "./Login";
import { useStateValue } from "../StateProvider";
import { auth } from "../firebase";
import $ from "jquery";
import { Link, useHistory } from "react-router-dom";
import _ from "lodash";
import SearchUser from "./SearchUser";

function Header() {
  const [modalShow, setModalShow] = React.useState(false);
  const [{ user, users }, dispatch] = useStateValue();
  const [search, setSearch] = React.useState([]);
  const history = useHistory();
  useEffect(() => {
    $(".formSearch").val(null);
    setSearch(null);
  }, []);

  const signOut = () => {
    auth.signOut();
  };
  const profile = () => {
    history.push("/myprofile");
  };
  function showDropdown() {
    $(".userDp_container").show();
  }

  function hideDropdown() {
    $(".userDp_container").hide();
  }

  const searchUser = () => {
    var userList = [];
    var searchInput = _.lowerCase(_.camelCase($(".formSearch").val())).replace(
      /\s+/g,
      ""
    );
    users?.map((userTemp) => {
      if (
        _.lowerCase(_.camelCase(userTemp.name))
          .replace(/\s+/g, "")
          .includes(searchInput)
      ) {
        userList.push(userTemp);
      }
    });
    setSearch(userList);
  };

  const closeShowdown = () => {
    $(".formSearch").val(null);
    setSearch(null);
  };

  return (
    <div className="headcomp">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand className="header" href="#home">
          THE PANDECT
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link>
              <Link to="/" id="nav-select">
                HOME
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/latest/blogs" id="nav-select">
                {" "}
                BLOGS
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/auctions" id="nav-select">
                AUCTIONS
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/about" id="nav-select">
                ABOUT
              </Link>
            </Nav.Link>
          </Nav>
          <Form inline className="search">
            <div className="searchContents">
              <div className="searchContainer">
                <FormControl
                  type="text"
                  placeholder="Search profile"
                  className="formSearch"
                  onChange={searchUser}
                />
                <SearchIcon className="searchIcon" />
              </div>

              <div className="displaySearch">
                {/* <ReactLoading type='spinningBubbles' width='40px' height='40px' className='displaySearchLoading' color='black' /> */}
                <div className="displaySearchContents">
                  {$(".formSearch").val() !== "" ? (
                    search.length !== 0 ? (
                      search.map((searchedUser) => {
                        if (searchedUser.email !== user?.email)
                          return (
                            <div onClick={closeShowdown}>
                              <SearchUser
                                className="searchUser"
                                user={searchedUser}
                              />
                            </div>
                          );
                      })
                    ) : (
                        <p className="searchUser" id="notFound">
                          User not found
                        </p>
                      )
                  ) : null}
                </div>
              </div>
            </div>
          </Form>
          <Form inline className="blog">
            <Link to="/newpost">
              <Button className="blog">CREATE BLOGS</Button>
            </Link>
          </Form>
          {!user ? (
            <Button id="signin" onClick={() => setModalShow(true)}>
              SIGN IN
            </Button>
          ) : (
              <div
                className="userDp"
                onClick={showDropdown}
                onMouseLeave={hideDropdown}
              >
                <img src={user?.photoURL} alt="UserDP" className="userDp_image" />
                <div className="userDp_container">
                  <p>My Posts</p>
                  <p onClick={profile}>My Profile</p>

                  <p onClick={signOut}>Logout</p>
                </div>
              </div>
            )}
          <Login show={modalShow} onHide={() => setModalShow(false)} />
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
export default Header;
