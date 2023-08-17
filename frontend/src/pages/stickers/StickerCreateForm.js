// React / router
import React, { useState } from "react";
import { Link } from "react-router-dom";
// React Bootstrap components
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
// Component
import Avatar from "../../components/Avatar";
// API
import { axiosRes } from "../../api/axiosDefaults";
// Hooks
import useRedirect from "../../hooks/useRedirect";
// Notifications
import { NotificationManager } from "react-notifications";
// Styles
import styles from "../../styles/StickerCreateEditForm.module.css";

function StickerCreateForm(props) {
  // Using the useRedirect hook to redirect if the user is logged out
  useRedirect("loggedOut");
  // Setting the initial state of the postData object with empty strings for the fields
  const { comment, setComment, setStickers, profileImage, profile_id } = props;
  // Setting the initial state of the errors object to an empty object
  const [content, setContent] = useState("");

  // Handling input changes and updating the postData object
  const handleChange = (event) => {
    setContent(event.target.value);
  };

  // Handling the form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Append the data and request the stickers request from the API
    try {
      const { data } = await axiosRes.post("/stickers/", {
        content,
        comment,
      });
      setStickers((prevStickers) => ({
        ...prevStickers,
        results: [data, ...prevStickers.results],
      }));
      setComment((prevComment) => ({
        results: [
          {
            ...prevComment.results[0],
            stickers_count: prevComment.results[0].stickers_count + 1,
          },
        ],
      }));
      setContent("");
      // Display success notification
      NotificationManager.success("Sticker Created", "Success!");
    } catch (err) {
      // Display error notification
      NotificationManager.error(
        "There was an issue creating your sticker",
        "Error"
      );
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profileImage} />
          </Link>
          <Form.Control
            className={styles.Form}
            placeholder="my sticker..."
            as="textarea"
            value={content}
            onChange={handleChange}
            rows={2}
          />
        </InputGroup>
      </Form.Group>
      <button
        className={`${styles.Button} btn d-block ml-auto`}
        disabled={!content.trim()}
        type="submit"
      >
        comment
      </button>
    </Form>
  );
}

export default StickerCreateForm;
