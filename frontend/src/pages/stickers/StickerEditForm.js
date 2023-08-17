// React / router
import React, { useState } from "react";
// React Bootstrap components
import Form from "react-bootstrap/Form";
// API
import { axiosRes } from "../../api/axiosDefaults";
// Notifications
import { NotificationManager } from "react-notifications";
// Styles
import styles from "../../styles/StickerCreateEditForm.module.css";

function StickerEditForm(props) {
  // Destructure the props object
  const { id, content, setShowEditForm, setStickers } = props;
  // Define state variables
  const [formContent, setFormContent] = useState(content);

  // Event handler for input change
  const handleChange = (event) => {
    setFormContent(event.target.value);
  };

  // Event handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Make an API call to edit the sticker by id
      await axiosRes.put(`/stickers/${id}/`, {
        content: formContent.trim(),
      });
      // Update the sticker state with the updated sticker
      setStickers((prevStickers) => ({
        ...prevStickers,
        results: prevStickers.results.map((sticker) => {
          return sticker.id === id
            ? {
                ...sticker,
                content: formContent.trim(),
                updated_on: "now",
              }
            : sticker;
        }),
      }));
      setShowEditForm(false);
      // Show a success notification
      NotificationManager.info("Sticker Updated");
    } catch (err) {
      // Show an error notification if there was an issue updating the comment
      NotificationManager.error(
        "There was an issue updating your sticker",
        "Error"
      );
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="pr-1">
        <Form.Control
          className={styles.Form}
          as="textarea"
          value={formContent}
          onChange={handleChange}
          rows={2}
        />
      </Form.Group>
      <div className="text-right">
        <button
          className={styles.Button}
          onClick={() => setShowEditForm(false)}
          type="button"
        >
          cancel
        </button>
        <button
          className={styles.Button}
          disabled={!content.trim()}
          type="submit"
        >
          save
        </button>
      </div>
    </Form>
  );
}

export default StickerEditForm;
