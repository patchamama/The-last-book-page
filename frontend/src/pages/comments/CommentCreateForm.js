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
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import NoResults from "../../assets/no-results.png";
import { useRedirect } from "../../hooks/useRedirect";
import { Card, Media } from "react-bootstrap";

function CommentCreateForm() {
  useRedirect("loggedOut");
  const [errors, setErrors] = useState({});
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState({ results: [] });
  const [cover, setCover] = useState("");
  const [selectedBook, setSelectedBook] = useState("");
  const [commentData, setCommentData] = useState({
    book: "",
    comment: "",
  });
  const { book, comment } = commentData;

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await axiosReq.get(
          id ? `/books/${id}` : `/books/?search=${query}&ordering=auth`
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
      book: event.target.value,
    });
    setSelectedBook(event.target.textContent);

    const coverurl = books.results.filter((book) => {
      return book.id === parseInt(event.target.value);
    });
    setCover(coverurl[0].cover);
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
      <Media>
        <Card.Img
          src={cover}
          alt="book cover"
          className={`mr-3 ${styles.Image}`}
        />
        <Media.Body className="text-left">
          <Form.Group>
            <Form.Label>Book</Form.Label>
            <Form.Control
              type="text"
              name="book"
              value={selectedBook}
              onChange={handleChange}
              placeholder="Select the book to comment"
              disabled
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              name="comment"
              value={comment}
              onChange={handleChange}
            />
          </Form.Group>
          {errors?.comment?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Media.Body>
      </Media>

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
