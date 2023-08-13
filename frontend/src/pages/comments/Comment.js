import React from "react";
import styles from "../../styles/Comment.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Comment = (props) => {
  const {
    id,
    owner,
    comment,
    profile_id,
    profile_image,
    book_cover,
    book_title,
    book_auth,
    updated_on,
    like_id,
    likes_count,
    stickers_count,
    setComments,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/comments/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}/`);
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };

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
    } catch (err) {
      console.log(err);
    }
  };

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
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className={styles.Comment}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={40} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_on}</span>
            {/* {is_owner && commentPage && <MoreDropdown />} */}
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
          <Link to={`/books/${id}`}>
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
        <Card.Text className={`text-center ${styles.CommentBar}`}>
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
            <i className="far fa-comments" />
          </Link>
          {stickers_count}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Comment;
