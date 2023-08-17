// React / router
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
// React Bootstrap components
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
// Images
import NoResults from "../../assets/no-results.png";
// React components
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
// API
import { axiosReq } from "../../api/axiosDefaults";
// Utils
import { fetchMoreData } from "../../utils/utils";
// Other pages
import PopularProfiles from "../profiles/PopularProfiles";
import Comment from "./Comment";
// Styles
import appStyles from "../../App.module.css";
import styles from "../../styles/CommentsPage.module.css";

const CommentsPage = ({ message, filter = "" }) => {
  // State variables
  const [comments, setComments] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const [query, setQuery] = useState("");
  const { id } = useParams();
  filter = filter.includes("book=") ? `book=${id}&` : filter;

  useEffect(() => {
    // Setup async function to fetch comments
    const fetchComments = async () => {
      try {
        const { data } = await axiosReq.get(
          `/comments/?${filter}search=${query}`
        );
        // Set the comments state variable to the returned data
        setComments(data);
        // Set hasLoaded state variable to true
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    // Add timer to delay the fetchPosts function by 1 second
    const timer = setTimeout(() => {
      fetchComments();
    }, 1000);
    // Clean up function for the useEffect hook
    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
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
            placeholder="Search comments"
          />
        </Form>
        {/* // If posts have loaded and there are results, render infinite scroll component with Comment page */}
        {hasLoaded ? (
          <>
            {comments.results.length ? (
              <InfiniteScroll
                children={comments.results.map((comment) => (
                  <Comment
                    key={comment.id}
                    {...comment}
                    setComments={setComments}
                  />
                ))}
                dataLength={comments.results.length}
                loader={<Asset spinner />}
                hasMore={!!comments.next}
                next={() => fetchMoreData(comments, setComments)}
              />
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
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

export default CommentsPage;
