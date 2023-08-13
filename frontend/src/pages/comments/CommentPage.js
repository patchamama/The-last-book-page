import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Comment from "./Comment";
import Sticker from "../stickers/Sticker";
import StickerCreateForm from "../stickers/StickerCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";

function CommentPage() {
  const { id } = useParams();
  const [comment, setComment] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [stickers, setStickers] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: comment }, { data: stickers }] = await Promise.all([
          axiosReq.get(`/comments/${id}`),
          axiosReq.get(`/stickers/?comment=${id}`),
        ]);
        setComment({ results: [comment] });
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
        <Comment {...comment.results[0]} setComments={setComment} commentPage />
        <Container className={appStyles.Content}>
          {currentUser ? (
            <StickerCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              comment={id}
              setComment={setComment}
              setStickers={setStickers}
            />
          ) : stickers.results.length ? (
            "Stickers"
          ) : null}

          {stickers.results.length ? (
            <InfiniteScroll
              children={stickers.results.map((sticker) => (
                <Sticker
                  key={sticker.id}
                  {...sticker}
                  setComment={setComment}
                  setStickers={setStickers}
                />
              ))}
              dataLength={stickers.results.length}
              loader={<Asset spinner />}
              hasMore={!!stickers.next}
              next={() => fetchMoreData(stickers, setStickers)}
            />
          ) : currentUser ? (
            <span>No stickers yet, be the first to create a sticker!</span>
          ) : (
            <span>No stickers... yet</span>
          )}
        </Container>
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default CommentPage;
