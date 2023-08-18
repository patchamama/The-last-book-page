// React / router
import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { useRedirect } from "../../hooks/useRedirect";
// React Bootstrap components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "react-router-dom/Link";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { Card, Media } from "react-bootstrap";
// Images
import NoResults from "../../assets/no-results.png";
// API
import { axiosReq } from "../../api/axiosDefaults";
// Components
import Asset from "../../components/Asset";
// Notifications
import { NotificationManager } from "react-notifications";
// Styles
import styles from "../../styles/CommentCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

const CommentCreateForm = () => {
  // Using the useRedirect hook to redirect if the user is logged out
  useRedirect("loggedOut");
  // Setting the initial state of the errors object to an empty object
  const [errors, setErrors] = useState({});
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState({ results: [] });
  const [cover, setCover] = useState("");
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
  const { id } = useParams();
  const currentUser = useCurrentUser();

  useEffect(() => {
    if (!currentUser) {
      history.push("/");
    }
    const fetchBooks = async () => {
      try {
        const { data } = await axiosReq.get(
          id ? `/books/${id}` : `/books/?search=${query}&ordering=auth`
        );
        if (id) {
          setBooks({ results: [data] });
          setCommentData({
            ...commentData,
            book: data.id,
          });
          setSelectedBook(`${data.auth} - ${data.title}`);
          setCover(data.cover);
        } else {
          setBooks(data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, id]);

  // Handling input changes and updating the commentData object
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

  // Handling the form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("book", book);
    formData.append("comment", comment);
    // Append the data and request the post request from the API
    try {
      const { data } = await axiosReq.post("/comments/", formData);
      history.push(`/comments/${data.id}`);
      // Display success notification
      NotificationManager.success("Comment Created", "Success!");
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
        // Display error notification
        NotificationManager.error(
          "There was an issue adding your comment",
          "Error"
        );
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
          {/* Displaying any comment errors */}
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
          {books.results?.length ? (
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
            !id && (
              <Container className={appStyles.Content}>
                <Asset
                  src={NoResults}
                  message="No results found. Adjust the search keyword or add a new book."
                />
                {currentUser && (
                  <div className="text-center">
                    <Link
                      className="align-self-center"
                      to={`/books/create/${query}`}
                    >
                      <i className="fas fa-plus-circle"></i> Add book
                    </Link>
                  </div>
                )}
              </Container>
            )
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
};

export default CommentCreateForm;
