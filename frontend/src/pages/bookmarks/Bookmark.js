import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { useParams } from "react-router";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const Bookmark = ({ book_id, bookmark_id, bookmark_status, owner }) => {
  const [status, setStatus] = useState(bookmark_status);
  const [errors, setErrors] = useState({});

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleSubmit = async (event) => {
    // event.preventDefault();
    const formData = new FormData();

    setStatus(event.target.value);
    formData.append("book", book_id);
    formData.append("owner", currentUser.username);
    formData.append("status", event.target.value);

    try {
      if (bookmark_id) {
        event.target.value ? (
          const { data } = await axiosReq.put(
            `/bookmarks/${bookmark_id}`,
            formData
          );
        ) : (
          await axiosReq.delete(
            `/bookmarks/${bookmark_id}`);
        )
        
      } else {
        const { data } = await axiosReq.post("/bookmarks/", formData);
      }
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const statusOptions = (
    <>
      <option value=""> - No status - </option>
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
          disabled={!currentUser}
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
