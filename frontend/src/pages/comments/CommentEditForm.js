// React / router
import React, { useEffect, useState } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
// React Bootstrap components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
// API
import { axiosReq } from "../../api/axiosDefaults";
// Hooks
import useRedirect from "../../hooks/useRedirect";
// Notifications
import { NotificationManager } from "react-notifications";
// Styles
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

const CommentEditForm = () => {
  // Using the useRedirect hook to redirect if the user is logged out
  useRedirect("loggedOut");
  // Setting the initial state of the errors object to an empty object
  const [errors, setErrors] = useState({});
  const [selectedBook, setSelectedBook] = useState("");
  // Setting the initial state of the commentData object with empty strings for the fields
  const [commentData, setCommentData] = useState({
    book: "",
    comment: "",
  });
  // Destructuring the values of fields from the commentData object
  const { book, comment } = commentData;
  // Using the useHistory hook to handle navigation history
  const history = useHistory();
  // get id from the URL parameter
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/comments/${id}/`);
        const { book, comment, book_title, is_owner } = data;
        setSelectedBook(book_title);
        // If the user is not the owner of the comment, redirect to the home page
        is_owner ? setCommentData({ book, comment }) : history.push("/");
      } catch (err) {
        // Display error notification
        NotificationManager.error(
          "There was an issue with the request of the data",
          "Error"
        );
      }
    };

    handleMount();
  }, [history, id]);

  // Handle input changes
  const handleChange = (event) => {
    setCommentData({
      ...commentData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("book", book);
    formData.append("comment", comment);

    try {
      // Submit updated formdata to the API
      const { data } = await axiosReq.put(`/comments/${id}`, formData);
      // Redirect to the updated comment page
      history.push(`/comments/${data.id}`);
      // Show success notification
      NotificationManager.success("Comment Updated", "Success!");
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
        NotificationManager.error(
          "There was an issue updating your comment",
          "Error"
        );
      }
    }
  };
  // Text input fields for the book and comment
  const textFields = (
    <div className="text-center">
      <Form.Group as={Row} controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
          Book
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            name="book"
            value={selectedBook}
            onChange={handleChange}
            placeholder="Select the book to comment"
            disabled
          />
        </Col>
      </Form.Group>
      {/* Display any book errors */}
      {errors?.book?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group as={Row} controlId="formHorizontalPassword">
        <Form.Label column sm={2}>
          Comment
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            as="textarea"
            rows={6}
            name="comment"
            value={comment}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>
      {/* Display any comment errors */}
      {errors?.comment?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        create
      </Button>
    </div>
  );

  return (
    <>
      {commentData.book ? (
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Container className={appStyles.Content}>{textFields}</Container>
            </Col>
          </Row>
        </Form>
      ) : (
        () => history.goBack()
      )}
    </>
  );
};

export default CommentEditForm;
