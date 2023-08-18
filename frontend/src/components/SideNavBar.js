// React / router
import React from "react";
import { NavLink } from "react-router-dom";
// React Bootstrap components
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
// Components
// Styles
import styles from "../styles/SideNavBar.module.css";
// Context
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
// API
import axios from "axios";

const SideNavBar = () => {
  const currentUser = useCurrentUser();
  // Getting the setCurrentUser function from the CurrentUserContext
  const setCurrentUser = useSetCurrentUser();

  // Function to handle sign out
  const handleSignOut = async () => {
    try {
      // Sending a POST request to log the user out
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null); // Setting the current user to null to log them out
    } catch (err) {}
  };
  // Add comment icon
  const addCommentIcon = (
    <Nav.Item>
      <NavLink
        exact
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/comments/create"
      >
        <i className="fas fa-plus-circle"></i>
        <span className="d-none d-md-inline">Comment</span>
      </NavLink>
    </Nav.Item>
  );
  return (
    <Navbar className={styles.SideNavBar}>
      {/* Navigation items */}
      <Container>
        <Nav className="ml-auto flex-column">
          {/* Home Icon */}
          <Nav.Item>
            <NavLink
              exact
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/"
            >
              <i className="fas fa-home"></i>
              <span className="d-none d-md-inline">Home</span>
            </NavLink>
          </Nav.Item>
          {/* Only show the comment icon if the current user is logged in*/}
          {currentUser && addCommentIcon}
          <Nav.Item>
            <NavLink
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/books"
            >
              <i className="fas fa-book"></i>
              <span className="d-none d-md-inline">Books</span>
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/bookmarks"
            >
              <i className="fas fa-bookmark"></i>
              <span className="d-none d-md-inline">Bookmarks</span>
            </NavLink>
          </Nav.Item>
          {/* Feed Icon */}
          <Nav.Item>
            <NavLink
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/feed"
            >
              <i className="fas fa-rss"></i>
              <span className="d-none d-md-inline">Feed</span>
            </NavLink>
          </Nav.Item>
          {/* Liked comment (heart) Icon */}
          <Nav.Item>
            <NavLink
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/liked"
            >
              <i className="fas fa-heart"></i>{" "}
              <span className="d-none d-md-inline">Liked</span>
            </NavLink>
          </Nav.Item>
          {/* Sign out Icon */}
          <Nav.Item>
            <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
              <i className="fas fa-sign-out"></i>{" "}
              <span className="d-none d-md-inline">Sign Out</span>
            </NavLink>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default SideNavBar;
