import React, { useEffect, useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
// React components
import DatePicker from "react-datepicker";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
// Styles
import styles from "../../styles/BookEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";

function BookEditForm() {
  const [errors, setErrors] = useState({});
  const [selectedBook, setSelectedBook] = useState("");
  const history = useHistory();
  const { id } = useParams();
  const { dateOfPub, setDateOfPub } = useState(new Date());
  const [bookData, setBookData] = useState({
    title: "",
    auth: "",
    pub_date: "",
    publisher: "",
    pages_no: "",
    isbn: "",
    lang_orig: "",
    lang: "",
    translators: "",
    genre: "",
    synopsis: "",
    cover: "",
  });
  const imageFile = useRef();
  // Destructuring the values from the profileData object
  const {
    title,
    auth,
    pub_date,
    publisher,
    pages_no,
    isbn,
    lang_orig,
    lang,
    translators,
    genre,
    synopsis,
    cover,
  } = bookData;

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/books/${id}/`);
        const {
          title,
          auth,
          pub_date,
          publisher,
          pages_no,
          isbn,
          lang_orig,
          lang,
          translators,
          genre,
          synopsis,
          cover,
        } = data;
        setBookData({
          title,
          auth,
          pub_date,
          publisher,
          pages_no,
          isbn,
          lang_orig,
          lang,
          translators,
          genre,
          synopsis,
          cover,
        });

        setDateOfPub(new Date(pub_date));
        console.log(data);
      } catch (err) {
        console.log(err);
        // history.push("/");
      }
    };

    handleMount();
  }, [history, id]);

  const handleChange = (event) => {
    setBookData({
      ...bookData,
      [event.target.name]: event.target.value,
    });
  };
  const handleDateChange = (date) => {
    setDateOfPub(date);
    setBookData({
      ...bookData,
      pub_date: date.toISOString().split("T")[0],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("auth", auth);
    formData.append("pub_date", pub_date);
    formData.append("publisher", publisher);
    formData.append("pages_no", pages_no);
    formData.append("isbn", isbn);
    formData.append("lang_orig", lang_orig);
    formData.append("lang", lang);
    formData.append("translators", translators);
    formData.append("genre", genre);
    formData.append("synopsis", synopsis);
    formData.append("cover", cover);
    if (imageFile?.current?.files[0]) {
      formData.append("cover", imageFile?.current?.files[0]);
    }

    try {
      const { data } = await axiosReq.put("/books/", formData);
      history.push(`/books/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group as={Row} controlId="formHorizontalTitle">
        <Form.Label column sm={2}>
          Title
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
            placeholder="Select the title"
          />
        </Col>
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group as={Row} controlId="formHorizontalAuth">
        <Form.Label column sm={2}>
          Author
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            name="auth"
            value={auth}
            onChange={handleChange}
            placeholder="Select the auth"
          />
        </Col>
      </Form.Group>
      {errors?.auth?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group as={Row} controlId="formHorizontalPubDate">
        <Form.Label>Date of publication</Form.Label>
        <DatePicker
          selected={dateOfPub}
          name="pub_date"
          value={pub_date}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          rows={7}
        />
      </Form.Group>

      <Form.Group as={Row} controlId="formHorizontalPublisher">
        <Form.Label column sm={2}>
          Publisher
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            as="textarea"
            rows={6}
            name="publisher"
            value={publisher}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>
      {errors?.publisher?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group as={Row} controlId="formHorizontalPagesNo">
        <Form.Label column sm={2}>
          Number of pages
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            name="pages_no"
            value={pages_no}
            onChange={handleChange}
            placeholder="Select the auth"
          />
        </Col>
      </Form.Group>
      {errors?.pages_no?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group as={Row} controlId="formHorizontalIsbn">
        <Form.Label column sm={2}>
          ISBN
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            name="isbn"
            value={isbn}
            onChange={handleChange}
            placeholder="Select the auth"
          />
        </Col>
      </Form.Group>
      {errors?.isbn?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group as={Row} controlId="formHorizontalLangOrig">
        <Form.Label column sm={2}>
          Language orig.
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            name="lang_orig"
            value={lang_orig}
            onChange={handleChange}
            placeholder="Select the auth"
          />
        </Col>
      </Form.Group>
      {errors?.lang_orig?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group as={Row} controlId="formHorizontalLanguage">
        <Form.Label column sm={2}>
          Language
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            name="lang"
            value={lang}
            onChange={handleChange}
            placeholder="Select the auth"
          />
        </Col>
      </Form.Group>
      {errors?.lang?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group as={Row} controlId="formHorizontalTranslators">
        <Form.Label column sm={2}>
          Translators
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            name="translators"
            value={lang}
            onChange={handleChange}
            placeholder="Select the auth"
          />
        </Col>
      </Form.Group>
      {errors?.translators?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group as={Row} controlId="formHorizontalGenre">
        <Form.Label column sm={2}>
          Genre
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            name="genre"
            value={genre}
            onChange={handleChange}
            placeholder="Select the auth"
          />
        </Col>
      </Form.Group>
      {errors?.genre?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group as={Row} controlId="formHorizontalSynopsis">
        <Form.Label column sm={2}>
          Synopsis
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            as="textarea"
            rows={6}
            name="synopsis"
            value={synopsis}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>
      {errors?.synopsis?.map((message, idx) => (
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
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2 text-center" md={4} lg={5}>
          <Container className={`${appStyles.Content} ${styles.Container}`}>
            <Form.Group>
              {cover && (
                <figure>
                  <Image src={cover} fluid />
                </figure>
              )}
              {/* Displaying any errors with the cover */}
              {errors?.cover?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
              <div>
                <Form.Label
                  className={`${btnStyles.Button} ${btnStyles.Blue} btn my-auto`}
                  htmlFor="image-upload"
                >
                  Change the cover
                </Form.Label>
              </div>
              <Form.File
                id="image-upload"
                ref={imageFile}
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files.length) {
                    setBookData({
                      ...bookData,
                      cover: URL.createObjectURL(e.target.files[0]),
                    });
                  }
                }}
              />
            </Form.Group>
            <div className={`${styles.TextFieldsContainer} d-md-none`}>
              {textFields}
            </div>
          </Container>
        </Col>
        <Col md={5} lg={6} className="d-none d-md-block p-0 p-md-2 text-center">
          <Container
            className={`${styles.TextFieldsContainer} ${appStyles.Content}`}
          >
            {textFields}
          </Container>
        </Col>
      </Row>
    </Form>
  );
}

export default BookEditForm;
