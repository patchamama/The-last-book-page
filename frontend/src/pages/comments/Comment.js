// React / router
import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom";
// Contexts
import { useCurrentUser } from "../../contexts/CurrentUserContext";
// React Bootstrap components
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
// Components
import Avatar from "../../components/Avatar";
import { MoreDropdown } from "../../components/MoreDropdown";
// Notifications
import { NotificationManager } from "react-notifications";
// API
import { axiosRes } from "../../api/axiosDefaults";
// Styles
import styles from "../../styles/Comment.module.css";

const Comment = (props) => {
  // Destructure the props object
  const {
    id,
    owner,
    comment,
    profile_id,
    profile_image,
    book,
    book_cover,
    book_title,
    book_auth,
    updated_on,
    like_id,
    likes_count,
    stickers_count,
    setComments,
  } = props;

  // Get the current user from CurrentUserContext.js
  const currentUser = useCurrentUser();
  // Declare is_owner
  const is_owner = currentUser?.username === owner;
  // Using the useHistory hook to handle navigation history
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/comments/${id}/edit`);
  };

  // Handle deleting a post
  const handleDelete = async () => {
    try {
      // Send a request to delete a post by its ID
      await axiosRes.delete(`/comments/${id}/`);
      // Display a success notification
      NotificationManager.info("Comment Removed");
      // Navigating to the previous page in the navigation history
      history.goBack();
    } catch (err) {
      NotificationManager.error(
        "There was an issue deleting your comment",
        "Error"
      );
    }
  };

  // Like a comment functionality
  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { comment: id });
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
                ...comment,
                likes_count: comment.likes_count + 1,
                like_id: data.id,
              }
            : comment;
        }),
      }));
      // Display a notification
      NotificationManager.info("Comment liked");
    } catch (err) {
      NotificationManager.error(
        "There was an issue adding a like to your comment",
        "Error"
      );
    }
  };

  // Unlike a comment functionality
  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}`);
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
                ...comment,
                likes_count: comment.likes_count - 1,
                like_id: null,
              }
            : comment;
        }),
      }));
      // Display a notification
      NotificationManager.info("Comment Unliked");
    } catch (err) {
      NotificationManager.error(
        "There was an issue adding unlike to your comment",
        "Error"
      );
    }
  };

  return (
    <Card className={styles.Comment}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          {/* Link to profile id of comment */}
          <Link to={`/profiles/${profile_id}`}>
            {/* Display Avatar component */}
            <Avatar src={profile_image} height={40} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_on}</span>
            {/* {is_owner && commentPage && <MoreDropdown />} */}
            {/* If the user is the owner of the comment display PostDropdownBar component */}
            {is_owner && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
      </Card.Body>
      <Card.Body>
        <Media>
          <Link to={`/books/${book}`}>
            <Card.Img
              src={book_cover}
              alt={`Bookcover of ${book_title}`}
              className={`mr-3 ${styles.Image}`}
            />
          </Link>

          <Media.Body className="text-left">
            {book_title && (
              <>
                <Card.Title className="text-left">{book_title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  by {book_auth}
                </Card.Subtitle>
              </>
            )}
            {comment && <Card.Text>{comment}</Card.Text>}
          </Media.Body>
        </Media>
        <hr />
        <Card.Text className={`text-center ${styles.CommentBar}`}>
          {/* If the user is the owner of the comment, display message */}
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own comments!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          ) : like_id ? (
            <span onClick={handleUnlike}>
              <i className={`fas fa-heart ${styles.Heart}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleLike}>
              <i className={`far fa-heart ${styles.HeartOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like comments!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          )}
          {likes_count}

          <Link to={`/comments/${id}`}>
            <i className="far fa-comment-dots" />
          </Link>
          {stickers_count}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Comment;
