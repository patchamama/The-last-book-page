// React / router
import React, { useState } from "react";
// API
import { axiosReq } from "../../api/axiosDefaults";
// React Bootstrap components
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
// Contexts
import { useCurrentUser } from "../../contexts/CurrentUserContext";
// Notifications
import { NotificationManager } from "react-notifications";

const Bookmark = ({
  book_id,
  bookmark_id,
  bookmark_status,
  owner,
  fromBooksPage = false,
}) => {
  bookmark_status = bookmark_status ? bookmark_status : "-";
  // State variables
  const [status, setStatus] = useState(bookmark_status);
  const [errors, setErrors] = useState({});

  // Get the current user from CurrentUserContext.js
  const currentUser = useCurrentUser();
  // Declare is_owner
  const is_owner = currentUser?.username === owner;

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    setStatus(event.target.value);
    formData.append("book", book_id);
    formData.append("owner", currentUser.username);
    formData.append("status", event.target.value);

    try {
      if (bookmark_id) {
        if (event.target.value && event.target.value !== "-") {
          // Submit updated formdata to the API
          await axiosReq.put(`/bookmarks/${bookmark_id}`, formData);
        } else {
          // Submit to delete the bookmark_id
          await axiosReq.delete(`/bookmarks/${bookmark_id}`);
        }
      } else {
        // Submit to add a bookmark with formdata to the API
        await axiosReq.post("/bookmarks/", formData);
      }
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
        // Show error notification
        NotificationManager.error(
          "There was an issue changing the bookmark",
          "Error"
        );
      }
    }
  };

  const statusOptions = (
    <>
      <option value="-"> - No status - </option>
      <option value="Want to read">Want to read</option>
      <option value="Currently Reading">Currently Reading</option>
      <option value="Read">Read</option>
      <option value="To Check">To Check</option>
    </>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="text-left">
        <Form.Control
          as="select"
          value={status}
          onChange={handleSubmit}
          name="status"
          rows={7}
          placeholder=""
          disabled={!fromBooksPage && !is_owner}
        >
          {statusOptions}
        </Form.Control>
      </Form.Group>
      {errors?.lang_orig?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
    </Form>
  );
};

export default Bookmark;
