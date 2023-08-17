// React / router
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
// React Bootstrap components
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// API
import { axiosReq } from "../../api/axiosDefaults";
// Other pages
import Book from "./Book";
import PopularProfiles from "../profiles/PopularProfiles";

const BookPage = () => {
  // Get id from the URL parameter
  const { id } = useParams();
  // State for book and stickers
  const [book, setBook] = useState({ results: [] });

  useEffect(() => {
    // Hook to fetch book on component mount
    const handleMount = async () => {
      try {
        const [{ data: book }] = await Promise.all([
          axiosReq.get(`/books/${id}`),
        ]);
        // update book state with fetched book
        setBook({ results: [book] });
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
    // Hook will re-run when the ID changes
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        {/* Display PopularProfiles mobile display page */}
        <PopularProfiles mobile />
        <Book
          {...book.results[0]}
          setBook={setBook}
          onlyone={true}
          fromBooksPage={true}
        />
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        {/* Display PopularProfiles display page */}
        <PopularProfiles />
      </Col>
    </Row>
  );
};

export default BookPage;
