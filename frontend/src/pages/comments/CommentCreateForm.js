import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import styles from "../../styles/CommentCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import NoResults from "../../assets/no-results.png";
import { useRedirect } from "../../hooks/useRedirect";

function CommentCreateForm() {
  useRedirect("loggedOut");
  const [errors, setErrors] = useState({});
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState({ results: [] });
  const [selectedBook, setSelectedBook] = useState("");
  const [commentData, setCommentData] = useState({
    book: "",
    comment: "",
  });
  const { book, comment } = commentData;

  const history = useHistory();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await axiosReq.get(
          `/books/?search=${query}&ordering=auth`
        );
        setBooks(data);
      } catch (err) {
        console.log(err);
      }
    };

    const timer = setTimeout(() => {
      fetchBooks();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  const handleChange = (event) => {
    setCommentData({
      ...commentData,
      [event.target.name]: event.target.value,
    });
  };

  const handleButton = (event) => {
    setCommentData({
      ...commentData,
      ["book"]: event.target.value,
    });
    setSelectedBook(event.target.textContent);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("book", book);
    formData.append("comment", comment);

    try {
      const { data } = await axiosReq.post("/comments/", formData);
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
      {!commentData.book ? (
        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            className="mr-sm-2"
            placeholder="Select the book to comment"
          />
          {books.results.length ? (
            <ListGroup variant="flush">
              {books.results.map((book) => (
                <ListGroup.Item
                  key={book.id}
                  option={book.id}
                  value={book.id}
                  action
                  onClick={handleButton}
                >
                  {`${book.auth} - ${book.title}`}
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <Container className={appStyles.Content}>
              <Asset src={NoResults} message="No results found!" />
            </Container>
          )}
        </Form>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Container className={appStyles.Content}>{textFields}</Container>
            </Col>
          </Row>
        </Form>
      )}
    </>
  );
}

export default CommentCreateForm;
