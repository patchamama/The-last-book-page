import React from "react";
import styles from "../../styles/Comment.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, NavLink, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Book = (props) => {
  const {
    id,
    title,
    auth,
    pub_date,
    publisher,
    pages_no,
    isbn,
    lang_orig,
    lang,
    translators,
    genre,
    synopsis,
    cover,
    created_by,
    updated_by,
    created_on,
    updated_on,
    comments_count,
    bookmarks_count,
    setBooks,
    onlyone,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === created_by;
  const history = useHistory();

  return (
    <Card className={styles.Comment}>
      <Card.Body>
        <Media>
          {onlyone === "True" ? (
            <Card.Img
              src={cover}
              alt={`Bookcover of ${title}`}
              className={`mr-3 ${styles.Image}`}
            />
          ) : (
            <Link to={`/books/${id}`}>
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
            {synopsis && <Card.Text>{synopsis}</Card.Text>}

            <Card.Text>
              <small className="text-muted">
                Genres: <cite title="Genre">{genre}</cite>
              </small>
            </Card.Text>
            <Card.Text>
              <small className="text-muted">
                {pages_no ? `${pages_no} pages` : null}
                {pub_date ? `, published ${pub_date}` : null}
              </small>
            </Card.Text>
          </Media.Body>
        </Media>
        <Card.Text className="text-center">
          <Link to={`/comments/book/${id}`}>
            <i className="far fa-comments" />
          </Link>
          {comments_count}
          <Link to={`/bookmarks/${id}`}>
            <i className="far fa-bookmark" />
          </Link>
          {bookmarks_count}
        </Card.Text>
      </Card.Body>
      {onlyone === "True" && currentUser ? (
        <Link className="align-self-center" to={`/comments/${id}/create`}>
          <i className="far fa-plus-square"></i> comment
        </Link>
      ) : null}
    </Card>
  );
};

export default Book;
