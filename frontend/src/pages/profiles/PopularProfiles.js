// React / router
import React from "react";
// React Bootstrap components
import { Container } from "react-bootstrap";
// Components
import Asset from "../../components/Asset";
// Contexts
import { useProfileData } from "../../contexts/ProfileDataContext";
// Other pages
import Profile from "./Profile";
// Styles
import appStyles from "../../App.module.css";

const PopularProfiles = ({ mobile }) => {
  // Get popular profiles data from contexts
  const { popularProfiles } = useProfileData();
  return (
    <Container
      className={`${appStyles.Content} ${
        mobile && "d-lg-none text-center mb-3"
      }`}
    >
      {/* Check if the popular profiles data has been loaded */}
      {popularProfiles.results.length ? (
        <>
          <p>Most followed profiles</p>
          <hr />
          {mobile ? (
            <div className="d-flex justify-content-around">
              {popularProfiles.results.slice(0, 4).map((profile) => (
                <Profile key={profile.id} profile={profile} mobile />
              ))}
            </div>
          ) : (
            popularProfiles.results.map((profile) => (
              <Profile key={profile.id} profile={profile} />
            ))
          )}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default PopularProfiles;
