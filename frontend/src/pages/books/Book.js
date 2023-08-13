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
          </Media.Body>
        </Media>
      </Card.Body>

      {onlyone === "True" ? (
        <NavLink to={`/comments/${id}/create`}>
          <i className="far fa-plus-square"></i>Add book comment
        </NavLink>
      ) : (
        <></>
      )}
    </Card>
  );
};

export default Book;
