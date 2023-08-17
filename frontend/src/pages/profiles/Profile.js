// React / router
import React from "react";
import { Link } from "react-router-dom";
// Contexts
import { useCurrentUser } from "../../contexts/CurrentUserContext";
// Components
import Avatar from "../../components/Avatar";
// React Bootstrap components
import { Button } from "react-bootstrap";
// Contexts
import { useSetProfileData } from "../../contexts/ProfileDataContext";
// Styles
import styles from "../../styles/Profile.module.css";
import btnStyles from "../../styles/Button.module.css";

const Profile = (props) => {
  // Destructure props object
  const { profile, mobile, imageSize = 55 } = props;
  const { id, following_id, image, owner } = profile;
  // Get current user from context
  const currentUser = useCurrentUser();
  // Determine if current user is the owner of this profile
  const is_owner = currentUser?.username === owner;
  // Get follow/unfollow functions from context
  const { handleFollow, handleUnfollow } = useSetProfileData();

  return (
    <div
      className={`my-3  mt-1  d-flex align-items-center ${
        mobile && "flex-column"
      }`}
    >
      <div>
        {/* Link to the profile page */}
        <Link className="align-self-center" to={`/profiles/${id}`}>
          <Avatar src={image} height={imageSize} />
        </Link>
      </div>
      <div className={`mx-2 ${styles.WordBreak}`}>
        {/* Owner's username */}
        <strong>{owner}</strong>
      </div>

      {/* Follow/unfollow buttons */}
      <div className={`text-right ${!mobile && "ml-auto"}`}>
        {/* Show the button only if the current user is not the owner */}
        {!mobile &&
          currentUser &&
          !is_owner &&
          (following_id ? (
            <Button
              className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
              onClick={() => handleUnfollow(profile)}
            >
              unfollow
            </Button>
          ) : (
            <Button
              className={`${btnStyles.Button} ${btnStyles.Black}`}
              onClick={() => handleFollow(profile)}
            >
              follow
            </Button>
          ))}
      </div>
    </div>
  );
};

export default Profile;
