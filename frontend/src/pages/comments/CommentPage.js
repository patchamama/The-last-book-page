import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Comment from "./Comment";

function CommentPage() {
  const { id } = useParams();
  const [comment, setComment] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: comment }] = await Promise.all([
          axiosReq.get(`/comments/${id}`),
        ]);
        setComment({ results: [comment] });
        console.log(comment);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles for mobile</p>
        <Comment {...comment.results[0]} setComments={setComment} commentPage />
        <Container className={appStyles.Content}>Comments???</Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular profiles for desktop
      </Col>
    </Row>
  );
}

export default CommentPage;
