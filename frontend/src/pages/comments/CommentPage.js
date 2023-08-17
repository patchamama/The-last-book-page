// React / router
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
// React Bootstrap components
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
// API
import { axiosReq } from "../../api/axiosDefaults";
// Other pages
import Comment from "./Comment";
import Sticker from "../stickers/Sticker";
import StickerCreateForm from "../stickers/StickerCreateForm";
// Contexts
import { useCurrentUser } from "../../contexts/CurrentUserContext";
// React components
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
// Utils
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
// Styles
import appStyles from "../../App.module.css";

const CommentPage = () => {
  // Get id from the URL parameter
  const { id } = useParams();
  // State for comment
  const [comment, setComment] = useState({ results: [] });
  // Get current user from CurrentUserContext
  const currentUser = useCurrentUser();
  // Get current user's profile image
  const profile_image = currentUser?.profile_image;
  // State for stickers
  const [stickers, setStickers] = useState({ results: [] });

  useEffect(() => {
    // Hook to fetch comments and stickers on component mount
    const handleMount = async () => {
      try {
        const [{ data: comment }, { data: stickers }] = await Promise.all([
          axiosReq.get(`/comments/${id}`),
          axiosReq.get(`/stickers/?comment=${id}`),
        ]);
        // update comment state with fetched comments
        setComment({ results: [comment] });
        // update stickers state with fetched stickers
        setStickers(stickers);
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
        <Comment {...comment.results[0]} setComments={setComment} commentPage />
        <Container className={appStyles.Content}>
          {/* If the user is logged in, display StickerCreateForm */}
          {currentUser ? (
            <StickerCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              comment={id}
              setComment={setComment}
              setStickers={setStickers}
            />
          ) : (
            stickers.results.length && "Stickers"
          )}

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
};

export default CommentPage;
