// React / router
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useLocation } from "react-router";
// React Bootstrap components
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
// Components
import Asset from "../../components/Asset";
// Other pages
import Book from "../books/Book.js";
// React components
import InfiniteScroll from "react-infinite-scroll-component";
// API
import { axiosReq } from "../../api/axiosDefaults";
// Utils
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
// Images
import NoResults from "../../assets/no-results.png";
// Styles
import styles from "../../styles/BookmarkPage.module.css";
import appStyles from "../../App.module.css";

const BookmarkPage = ({ message, filter = "" }) => {
  // State variables
  const [bookmarks, setBookmarks] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const [query, setQuery] = useState("");
  // Get id from the URL parameter
  const { id } = useParams();

  // Options to select from book status
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
    // Hook to fetch bookmarks on component mount
    const fetchBooks = async () => {
      try {
        const { data } = await axiosReq.get(
          `/bookmarks/?book=${id}&status=${query}`
        );
        // update bookmarks state with fetched bookmarks
        setBookmarks(data);
        // Set hasLoaded state variable to true
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    // Add timer to delay the fetchPosts function by 1 second
    const timer = setTimeout(() => {
      fetchBooks();
    }, 1000);
    // Clean up function for the useEffect hook
    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname, id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        {/* Render PopularProfiles mobile page */}
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
        {/* // If posts have loaded and there are results, render infinite scroll component with bookmarks page */}
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
                    fromBooksPage={false}
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
        {/* Render PopularProfiles page */}
        <PopularProfiles />
      </Col>
    </Row>
  );
};
export default BookmarkPage;
