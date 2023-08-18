// React / router
import { createContext, useContext, useEffect, useState } from "react";
// API
import { axiosReq, axiosRes } from "../api/axiosDefaults";
// Contexts
import { useCurrentUser } from "./CurrentUserContext";
// Utils
import { followHelper, unfollowHelper } from "../utils/utils";
// Notifications
import { NotificationManager } from "react-notifications";

const ProfileDataContext = createContext();
const SetProfileDataContext = createContext();

// Create context for profile data & export
export const useProfileData = () => useContext(ProfileDataContext);
// Create context for updating profile data & export
export const useSetProfileData = () => useContext(SetProfileDataContext);

// Component for providing profile data
export const ProfileDataProvider = ({ children }) => {
  // Initialize state for profile data
  const [profileData, setProfileData] = useState({
    // we will use the pageProfile later!
    pageProfile: { results: [] },
    popularProfiles: { results: [] },
  });

  // Get the current user from the CurrentUserContext
  const currentUser = useCurrentUser();

  // Function to handle following a profile
  const handleFollow = async (clickedProfile) => {
    try {
      const { data } = await axiosRes.post("/followers/", {
        followed: clickedProfile.id,
      });
      // Update the pageProfile and popularProfiles lists with the new follower data
      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) =>
            followHelper(profile, clickedProfile, data.id)
          ),
        },
        popularProfiles: {
          ...prevState.popularProfiles,
          results: prevState.popularProfiles.results.map((profile) =>
            followHelper(profile, clickedProfile, data.id)
          ),
        },
      }));
      // Show a success notification
      NotificationManager.success("Following user", "Success!");
    } catch (err) {
      // Show an error notification
      NotificationManager.error(
        "There was an issue following this user",
        "Error"
      );
    }
  };

  // Function to handle unfollowing a profile
  const handleUnfollow = async (clickedProfile) => {
    try {
      // Send a DELETE request to delete the follower relationship
      await axiosRes.delete(`/followers/${clickedProfile.following_id}/`);
      // Update the pageProfile and popularProfiles lists with the removed follower data
      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) =>
            unfollowHelper(profile, clickedProfile)
          ),
        },
        popularProfiles: {
          ...prevState.popularProfiles,
          results: prevState.popularProfiles.results.map((profile) =>
            unfollowHelper(profile, clickedProfile)
          ),
        },
      }));
      // Show an info notification
      NotificationManager.info("Unfollowed user");
    } catch (err) {
      // Show an error notification
      NotificationManager.error(
        "There was an issue unfollowing this user",
        "Error"
      );
    }
  };
  // Fetch the list of popular profiles on mount and whenever the currentUser changes
  useEffect(() => {
    const handleMount = async () => {
      // Send a GET request to fetch the list of popular profiles
      try {
        const { data } = await axiosReq.get(
          "/profiles/?ordering=-followers_count"
        );
        setProfileData((prevState) => ({
          ...prevState,
          popularProfiles: data,
        }));
      } catch (err) {
        // console.log(err);
      }
    };

    handleMount();
  }, [currentUser]);
  // Render context providers with current profile data and functions to update it
  return (
    <ProfileDataContext.Provider value={profileData}>
      <SetProfileDataContext.Provider
        value={{ setProfileData, handleFollow, handleUnfollow }}
      >
        {children}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  );
};
