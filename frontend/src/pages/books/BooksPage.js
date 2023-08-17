// React / router
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
// Contexts
import { useCurrentUser } from "../../contexts/CurrentUserContext";
// React Bootstrap components
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Asset from "../../components/Asset";
import NoResults from "../../assets/no-results.png";
import Book from "./Book.js";
// React components
import InfiniteScroll from "react-infinite-scroll-component";
// API
import { axiosReq } from "../../api/axiosDefaults";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
// Styles
import appStyles from "../../App.module.css";
import styles from "../../styles/BooksPage.module.css";

const BooksPage = ({ message, filter = "" }) => {
  // State variables
  const [books, setBooks] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const [query, setQuery] = useState("");
  const currentUser = useCurrentUser();

  useEffect(() => {
    // Setup async function to fetch books
    const fetchBooks = async () => {
      // Set the books state variable to the returned data
      try {
        const { data } = await axiosReq.get(
          `/books/?${filter}&search=${query}`
        );
        setBooks(data);
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
  }, [filter, query, pathname]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        {/* Render PopularProfiles mobile page */}
        <PopularProfiles mobile />
        <i className={`fas fa-search ${styles.SearchIcon}`} />
        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            className="mr-sm-2"
            placeholder="Search books"
          />
        </Form>

        {hasLoaded ? (
          <>
            {books.results.length ? (
              <InfiniteScroll
                children={books.results.map((book) => (
                  <Book
                    key={book.id}
                    {...book}
                    setBooks={setBooks}
                    onlyone={false}
                    showfooter={true}
                    fromBooksPage={true}
                  />
                ))}
                dataLength={books.results.length}
                loader={<Asset spinner />}
                hasMore={!!books.next}
                next={() => fetchMoreData(books, setBooks)}
              />
            ) : (
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

export default BooksPage;
