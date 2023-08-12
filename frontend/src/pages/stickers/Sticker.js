import React, { useState } from "react";
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Sticker.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { MoreDropdown } from "../../components/MoreDropdown";
import { axiosRes } from "../../api/axiosDefaults";
import StickerEditForm from "./StickerEditForm";

const Sticker = (props) => {
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

  const [showEditForm, setShowEditForm] = useState(false);

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleDelete = async () => {
    try {
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
    } catch (err) {}
  };

  return (
    <>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
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
