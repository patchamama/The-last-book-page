// React / router
import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// Contexts
import { useCurrentUser } from "../../contexts/CurrentUserContext";
// React Bootstrap components
import { Card, Media } from "react-bootstrap";
// Components
import Avatar from "../../components/Avatar";
import { MoreDropdown } from "../../components/MoreDropdown";
// API
import { axiosRes } from "../../api/axiosDefaults";
// Other patees
import Bookmark from "../bookmarks/Bookmark";
// Notifications
import { NotificationManager } from "react-notifications";
// Styles
import styles from "../../styles/Book.module.css";

const Book = (props) => {
  // Destructure the props object
  const {
    id,
    title,
    auth,
    pub_date,
    pages_no,
    genre,
    synopsis,
    cover,
    bookmark_id,
    bookmark_status,
    book_id,
    profile_id,
    profile_image,
    owner,
    is_owner,
    updated_on,
    comments_count,
    bookmarks_count,
    onlyone,
    showfooter = true,
    fromBooksPage = true,
  } = props;
  // Get the current user from CurrentUserContext.js
  const currentUser = useCurrentUser();
  // const is_owner = currentUser?.username === created_by;
  // Using the useHistory hook to handle navigation history
  const history = useHistory();

  // Handle edit
  const handleEdit = () => {
    history.push(`/books/${id}/edit`);
  };

  // Handle delete a book
  const handleDelete = async () => {
    if (!is_owner) {
      alert("Only the owner of the book cand delete it!");
      return;
    }
    try {
      // Send a request to delete a book by its ID
      await axiosRes.delete(`/books/${id}/`);
      // Navigating to the previous page in the navigation history
      history.goBack();
      // Display a success notification
      NotificationManager.info("Book deleted");
    } catch (err) {
      // Display error notification
      NotificationManager.error(
        "There was an issue deleting the book",
        "Error"
      );
    }
  };

  return (
    <Card className={styles.Book}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          {/* Link to profile id of post */}
          {!fromBooksPage ? (
            <Link to={`/profiles/${profile_id}`}>
              {/* Display Avatar component */}
              <Avatar src={profile_image} height={40} />
              {owner}
            </Link>
          ) : (
            <Link to="#"></Link>
          )}
          {/* If there is a active user logged */}
          {currentUser && (
            <div className="d-flex align-items-center">
              <span>{updated_on}</span>
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            </div>
          )}
        </Media>
      </Card.Body>
      <Card.Body>
        <Media>
          {onlyone ? (
            <Card.Img
              src={cover}
              alt={`Bookcover of ${title}`}
              className={`mr-3 ${styles.Image}`}
            />
          ) : (
            <Link to={`/books/${book_id}`}>
              <Card.Img
                src={cover}
                alt={`Bookcover of ${title}`}
                className={`mr-3 ${styles.Image}`}
              />
            </Link>
          )}

          <Media.Body className="text-left">
            {title && (
              <>
                <Card.Title className="text-left">{title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  by {auth}
                </Card.Subtitle>
              </>
            )}
            {((currentUser && fromBooksPage) || !fromBooksPage) && (
              <Bookmark
                book_id={book_id}
                bookmark_id={bookmark_id}
                bookmark_status={bookmark_status}
                owner={owner}
                fromBooksPage={fromBooksPage}
              />
            )}

            {synopsis && <Card.Text>{synopsis}</Card.Text>}

            <Card.Text>
              <small className="text-muted">
                {genre && `Genres: ${genre}`}
              </small>
            </Card.Text>
            <Card.Text>
              <small className="text-muted">
                {pages_no && `${pages_no} pages`}
                {pub_date && `, published ${pub_date}`}
              </small>
            </Card.Text>
          </Media.Body>
        </Media>
        <hr />
        {showfooter && (
          <Card.Text className="text-center">
            {comments_count ? (
              <Link to={`/comments/book/${id}`}>
                <i className="far fa-comments" />
              </Link>
            ) : (
              <i className="far fa-comments" />
            )}
            {comments_count}

            {bookmarks_count ? (
              <Link to={`/bookmarks/${id}`}>
                <i className="far fa-bookmark" />
              </Link>
            ) : (
              <i className="far fa-bookmark" />
            )}
            {bookmarks_count}
          </Card.Text>
        )}
      </Card.Body>

      {onlyone && currentUser && showfooter && (
        <Link className="align-self-center" to={`/comments/${id}/create`}>
          <i className="fas fa-plus-circle"></i> Add comment
        </Link>
      )}
    </Card>
  );
};

export default Book;
