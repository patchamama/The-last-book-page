import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Book from "./Book";
import Sticker from "../stickers/Sticker";
import StickerCreateForm from "../stickers/StickerCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";

const BookPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [stickers, setStickers] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: book }] = await Promise.all([
          // const [{ data: book }, { data: stickers }] = await Promise.all([
          axiosReq.get(`/books/${id}`),
          //   axiosReq.get(`/bookmarks/?book=${id}`),
        ]);
        setBook({ results: [book] });
        setStickers(stickers);
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        <Book {...book.results[0]} setBook={setBook} onlyone="True" />
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
};

export default BookPage;
