import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getDataFromLocalStorage } from "../main-helper/local-storage-management";
import BaseCommonPart from "../page-builder/base";
import NoProfilePic from "../../image/no_profile_picture.png";
import Waiting from "../main-helper/waiting";
import PostDataShowingContainer from "../post-prototype/post-showing-section";
import { PostCollectionDataTypes } from "../../types/posttypes";

const ProfileSection = () => {
  const [isLoading, setisLoading] = useState(false);
  const { darkMode } = useSelector((state) => state);

  return isLoading ? (
    <Waiting />
  ) : (
    <BaseCommonPart>
      <div className="h-[92vh] bg-lightBgColor dark:bg-darkBgColor overflow-y-scroll suggested-profiles-container">
        <div className="container mx-auto px-4 sm:px-6 md:px-4 lg:px-0 2xl:px-96 py-1">
          <div className="flex flex-wrap text-lightPostTextStyleColor dark:text-darkPostTextStyleColor justify-center">
            <UserInformationContainer darkMode={darkMode} />
            <UserActivityContainer darkMode={darkMode} />
          </div>
        </div>
      </div>
    </BaseCommonPart>
  );
};

const UserInformationContainer = ({ darkMode }) => {
  const { state } = useLocation();
  const [userInformation, setuserInformation] = useState({
    name: state?.name || "",
    description: state?.description || "",
    profilePic: state?.profilePic || "",
    email: "",
    phone: "",
  });
  const { name, description, profilePic } = userInformation;

  return (
    <div className="h-2/6 w-full lg:w-1/5 bg-lightElevationColor dark:bg-darkElevationColor rounded-lg lg:mr-5 p-3 flex flex-col justify-center items-center text-lightPostTextStyleColor dark:text-darkPostTextStyleColor shadow-lg">
      
        {/* Profile Image */}
        <div className="h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 bg-lightElevationColor dark:bg-darkElevationColor rounded-full mx-auto">
          <img
            src={profilePic || NoProfilePic}
            alt="profile"
            className="rounded-full h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 object-cover"
          />
        </div>
      

      <h1 className="text-xl font-semibold mt-3">{name}</h1>
      <h2 className="text-sm mt-3 text-center">{description}</h2>

      <ProfileRelatedButtons darkMode={darkMode} />
    </div>
  );
};

const UserActivityContainer = ({ darkMode }) => {
  return (
    <div className="h-[90vh] overflow-y-scroll suggested-profiles-container w-full lg:w-1/2 rounded-lg mt-5 lg:mt-0">
      <div className="w-full">
        {/* Tabs Collection */}
        <div className="flex justify-around bg-lightCardColor dark:bg-darkCardColor mb-3 rounded-lg">
          <button
            className={`${
              darkMode ? "hover:bg-green-500" : "hover:bg-green-400"
            } text-green-600 dark:text-green-400 px-5 py-1 rounded-3xl hover:bg-opacity-30  transition-all duration-300`}
          >
            My-Posts
          </button>
        </div>

        <PostDataShowingContainer
          postCollectionDataTypes={PostCollectionDataTypes.myPostsData}
        />
      </div>
    </div>
  );
};

const ProfileRelatedButtons = ({ darkMode }) => {
  const { connectionId } = useParams();
  const profileData = getDataFromLocalStorage();

  useEffect(() => {
    if (profileData && profileData.user !== connectionId) {
    }
  }, [connectionId]);

  // ** NOTE: 1) if own user profile, then show edit button
  // ** NOTE: 2) if the viewer is connected to current user, then show remove and Message button
  // ** NOTE: 3) if the viewer is not connected to current user, then show connect button

  return profileData?.user === connectionId ? (
    <EditButton darkMode={darkMode} />
  ) : (
    <div className="grid sm:grid-cols-2 mt-3 w-full px-32 sm:px-40 md:px-60 lg:px-72 2xl:px-96">
      {/* {<ConnectButton darkMode={darkMode} /> || (
        <MessageButton darkMode={darkMode} />
      )}
      
      <RemoveConnectionButton darkMode={darkMode} /> */}
    </div>
  );
};

const ConnectButton = ({ darkMode }) => {
  return (
    <button
      className={`${
        darkMode ? "hover:bg-green-400" : "hover:bg-green-400"
      } mt-3 text-green-600 dark:text-green-400 px-2 py-1 rounded-3xl border-green-400  hover:bg-opacity-30  transition-all duration-300 sm:mr-3 w-full hover:shadow-sm hover:shadow-green-300`}
      style={{ borderWidth: "0.2px" }}
    >
      Connect
    </button>
  );
};

const MessageButton = ({ darkMode }) => {
  return (
    <button
      className={`${
        darkMode ? "hover:bg-blue-800" : "hover:bg-blue-400"
      } mt-3 text-lightPrimaryFgColor dark:text-darkPrimaryFgColor px-2 py-1 rounded-3xl border-darkPrimaryFgColor  hover:bg-opacity-30  transition-all duration-300 sm:ml-3 w-full hover:shadow-sm hover:shadow-darkPrimaryFgColor`}
      style={{ borderWidth: "0.2px" }}
    >
      Message
    </button>
  );
};

const EditButton = ({ darkMode }) => {
  return (
    <button
      className={`${
        darkMode ? "hover:bg-blue-800" : "hover:bg-blue-400"
      } mt-5 text-lightPrimaryFgColor dark:text-darkPrimaryFgColor px-10 py-1 rounded-3xl border-darkPrimaryFgColor  hover:bg-opacity-30  transition-all duration-300`}
      style={{ borderWidth: "0.2px" }}
    >
      Edit
    </button>
  );
};

const RemoveConnectionButton = ({ darkMode }) => {
  return (
    <button
      className={`${
        darkMode ? "hover:bg-red-800" : "hover:bg-red-400"
      } mt-3 text-red-600 dark:text-red-400 px-2 py-1 rounded-3xl border-red-400  hover:bg-opacity-30  transition-all duration-300 sm:ml-3 w-full hover:shadow-sm hover:shadow-red-300`}
      style={{ borderWidth: "0.2px" }}
    >
      Remove
    </button>
  );
};

export default ProfileSection;
