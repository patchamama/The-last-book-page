// React / router
import React from "react";
import { NavLink } from "react-router-dom";
// React Bootstrap components
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
// Images
import logo from "../assets/logo.png";
// Styles
import styles from "../styles/NavBar.module.css";
// Contexts
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
// Utils
import { removeTokenTimestamp } from "../utils/utils";
// Component
import Avatar from "./Avatar";
// API
import axios from "axios";
// Hooks
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
// Notifications
import { NotificationManager } from "react-notifications";

const NavBar = () => {
  const currentUser = useCurrentUser();
  // Getting the setCurrentUser function from the CurrentUserContext
  const setCurrentUser = useSetCurrentUser();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  // Function to handle sign out
  const handleSignOut = async () => {
    try {
      // Sending a POST request to log the user out
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null); // Setting the current user to null to log them out
      removeTokenTimestamp(); // Remove local storage timestamp
      NotificationManager.info("You are now signed out"); // Show a success notification
    } catch (err) {
      // Show an error notification if there was an issue with sign out
      NotificationManager.error("There was an issue signing you out", "Error");
    }
  };

  const loggedInIcons = (
    <>
      <NavLink
        exact
        className={`sm-screen ${styles.NavLink}`}
        activeClassName={styles.Active}
        to="/"
      >
        <i className="fas fa-home"></i>Home
      </NavLink>
      <NavLink
        exact
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/comments/create"
      >
        <i className="fas fa-plus-circle"></i>Comment
      </NavLink>
      <NavLink
        className={`sm-screen ${styles.NavLink}`}
        activeClassName={styles.Active}
        to="/books"
      >
        <i className="fas fa-book"></i>Books
      </NavLink>
      <NavLink
        className={`sm-screen ${styles.NavLink}`}
        activeClassName={styles.Active}
        to="/bookmarks"
      >
        <i className="fas fa-bookmark"></i>Bookmarks
      </NavLink>
      <NavLink
        className={`sm-screen ${styles.NavLink}`}
        activeClassName={styles.Active}
        to="/feed"
      >
        <i className="fas fa-rss"></i>Feed
      </NavLink>
      <NavLink
        className={`sm-screen ${styles.NavLink}`}
        activeClassName={styles.Active}
        to="/liked"
      >
        <i className="fas fa-heart"></i>Liked
      </NavLink>
      <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
        <i className="fas fa-sign-out-alt"></i>Sign out
      </NavLink>
      <NavLink
        className={styles.NavLink}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
      </NavLink>
    </>
  );

  const loggedInIconsLargeScreen = (
    <>
      <NavLink
        className={styles.NavLink}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
      </NavLink>
    </>
  );

  const loggedOutIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signin"
      >
        <i className="fas fa-sign-in-alt"></i>Sign in
      </NavLink>
      <NavLink
        to="/signup"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i className="fas fa-user-plus"></i>Sign up
      </NavLink>
    </>
  );

  return (
    <>
      <Navbar
        expanded={expanded}
        className={styles.NavBar}
        expand="lg"
        fixed="top"
      >
        <Container>
          <NavLink to="/">
            <Navbar.Brand>
              <img
                className="d-none d-md-inline"
                src={logo}
                alt="logo"
                height="45"
              />
            </Navbar.Brand>
          </NavLink>
          <Navbar.Toggle
            ref={ref}
            onClick={() => setExpanded(!expanded)}
            aria-controls="basic-navbar-nav"
          />
          <Navbar.Collapse id="basic-navbar-nav" className={`sm-screen`}>
            <Nav className="ml-auto text-left">
              {currentUser ? loggedInIcons : loggedOutIcons}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Navbar
        expanded={expanded}
        className={styles.NavBarLarge}
        expand="lg"
        fixed="top"
      >
        <Container>
          <NavLink to="/">
            <Navbar.Brand>
              <img src={logo} alt="logo" height="45" />
            </Navbar.Brand>
          </NavLink>
          <Navbar.Toggle
            ref={ref}
            onClick={() => setExpanded(!expanded)}
            aria-controls="basic-navbar-nav"
          />
          <Navbar.Collapse id="basic-navbar-nav" className={`sm-screen`}>
            <Nav className="ml-auto text-left">
              {currentUser ? loggedInIconsLargeScreen : loggedOutIcons}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
