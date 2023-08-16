import React, { useEffect, useState } from "react";
import styles from "../../styles/BooksPage.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Asset from "../../components/Asset";
import NoResults from "../../assets/no-results.png";
import Book from "../books/Book.js";
import appStyles from "../../App.module.css";
import { useLocation } from "react-router";
import InfiniteScroll from "react-infinite-scroll-component";
import { axiosReq } from "../../api/axiosDefaults";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const BookmarkPage = ({ message, filter = "" }) => {
  const [bookmarks, setBookmarks] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const [query, setQuery] = useState("");
  const currentUser = useCurrentUser();

  const { id } = useParams();

  const statusOptions = (
    <>
      <option value=""> - No filter - </option>
      <option value="Want to read">Want to read</option>
      <option value="Currently Reading">Currently Reading</option>
      <option value="Read">Read</option>
      <option value="To Check">To Check</option>
    </>
  );

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await axiosReq.get(
          `/bookmarks/?book=${id}&status=${query}`
        );

        setBookmarks(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchBooks();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />

        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            as="select"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="mr-sm-2"
            placeholder="Search books"
          >
            {statusOptions}
          </Form.Control>
        </Form>
        <br />
        {hasLoaded ? (
          <>
            {bookmarks.results.length ? (
              <InfiniteScroll
                children={bookmarks.results.map((book) => (
                  <Book
                    key={book.id}
                    {...book}
                    setBookmarks={setBookmarks}
                    onlyone={false}
                    showfooter={false}
                    showBookmark={true}
                  />
                ))}
                dataLength={bookmarks.results.length}
                loader={<Asset spinner />}
                hasMore={!!bookmarks.next}
                next={() => fetchMoreData(bookmarks, setBookmarks)}
              />
            ) : (
              <Container className={appStyles.Content}>
                <Asset
                  src={NoResults}
                  message="No results found. Adjust the search keyword or add a new book."
                />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
};
export default BookmarkPage;
