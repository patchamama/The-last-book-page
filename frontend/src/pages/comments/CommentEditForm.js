import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";

function CommentEditForm() {
  const [errors, setErrors] = useState({});
  const [selectedBook, setSelectedBook] = useState("");
  const [commentData, setCommentData] = useState({
    book: "",
    comment: "",
  });
  const { book, comment } = commentData;
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/comments/${id}/`);
        const { book, comment, book_title, is_owner } = data;
        setSelectedBook(book_title);
        is_owner ? setCommentData({ book, comment }) : history.push("/");
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [history, id]);

  const handleChange = (event) => {
    setCommentData({
      ...commentData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("book", book);
    formData.append("comment", comment);

    try {
      const { data } = await axiosReq.put("/comments/", formData);
      history.push(`/comments/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

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
}

export default CommentEditForm;
