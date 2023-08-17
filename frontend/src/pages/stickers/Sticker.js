// React / router
import React, { useState } from "react";
// React Bootstrap components
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
// Components
import Avatar from "../../components/Avatar";
// Contexts
import { useCurrentUser } from "../../contexts/CurrentUserContext";
// React components
import { MoreDropdown } from "../../components/MoreDropdown";
// API
import { axiosRes } from "../../api/axiosDefaults";
// Ohter pages
import StickerEditForm from "./StickerEditForm";
// Notifications
import { NotificationManager } from "react-notifications";
// Styles
import styles from "../../styles/Sticker.module.css";

const Sticker = (props) => {
  // Destructure the props object
  const {
    profile_id,
    profile_image,
    owner,
    updated_on,
    content,
    id,
    setComment,
    setStickers,
  } = props;
  // Set state values
  const [showEditForm, setShowEditForm] = useState(false);
  // Get the current user from CurrentUserContext.js
  const currentUser = useCurrentUser();
  // Declare is_owner
  const is_owner = currentUser?.username === owner;

  // Handle deleting a sticker
  const handleDelete = async () => {
    try {
      // Send a request to delete a sticker by its ID
      await axiosRes.delete(`/stickers/${id}/`);
      setComment((prevComment) => ({
        results: [
          {
            ...prevComment.results[0],
            stickers_count: prevComment.results[0].stickers_count - 1,
          },
        ],
      }));

      setStickers((prevStrickers) => ({
        ...prevStrickers,
        results: prevStrickers.results.filter((stricker) => stricker.id !== id),
      }));
      // Display a success notification
      NotificationManager.info("Sticker Removed");
    } catch (err) {
      // Display error notification
      NotificationManager.error(
        "There was an issue deleting your post",
        "Error"
      );
    }
  };

  return (
    <>
      <hr />
      <Media>
        {/* Link to profile id of post */}
        <Link to={`/profiles/${profile_id}`}>
          {/* Display Avatar component */}
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_on}</span>
          {showEditForm ? (
            <StickerEditForm
              id={id}
              profile_id={profile_id}
              content={content}
              profileImage={profile_image}
              setStickers={setStickers}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            <p>{content}</p>
          )}
        </Media.Body>
        {is_owner && !showEditForm && (
          <MoreDropdown
            handleEdit={() => setShowEditForm(true)}
            handleDelete={handleDelete}
          />
        )}
      </Media>
    </>
  );
};

export default Sticker;
