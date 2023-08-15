import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { useParams } from "react-router";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

const Bookmark = ({ book_id, bookmark_id, bookmark_status }) => {
  const [status, setStatus] = useState(bookmark_status);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    setStatus(event.target.value);
    formData.append("book", book_id);
    formData.append("status", status);

    try {
      if (bookmark_id) {
        alert(`bookmarkId: put ${book_id} ${bookmark_id} ${status}`);
        const { data } = await axiosReq.put("/bookmarks/", formData);
      } else {
        alert(`bookmarkId: post ${book_id} ${bookmark_id} ${status}`);
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
