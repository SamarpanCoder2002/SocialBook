import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getDataFromLocalStorage } from "../main-helper/local-storage-management";
import BaseCommonPart from "../page-builder/base";
import NoProfilePic from "../../image/no_profile_picture.png";
import Waiting from "../main-helper/waiting";
import PostDataShowingContainer from "../post-prototype/post-showing-section";
import { ConnectionType, PostCollectionDataTypes } from "../../types/types";
import { particularUserConnectionStatus } from "./helper/api-call";
import {
  AcceptButton,
  CancelButton,
  ConnectButton,
  EditButton,
  MessageButton,
  RemoveConnectionButton,
  WithDrawConnectionRequestButton,
} from "../common/buttons";

const ProfileSection = () => {
  const [isLoading, setisLoading] = useState(false);
  const { darkMode } = useSelector((state) => state);

  return isLoading ? (
    <Waiting />
  ) : (
    <BaseCommonPart>
      <div className="h-[92vh] bg-lightBgColor dark:bg-darkBgColor overflow-y-scroll suggested-profiles-container">
        <UserInformationContainer darkMode={darkMode} />
        <UserActivityContainer darkMode={darkMode} />
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
  });
  const { name, description, profilePic } = userInformation;

  return (
    <div className="w-full rounded-lg lg:mr-5 p-3 flex flex-col justify-center items-center text-lightPostTextStyleColor dark:text-darkPostTextStyleColor">
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
  const { state } = useLocation();

  return (
    <div className="h-[90vh] rounded-lg mt-3 container mx-auto px-4 sm:px-6 md:px-20 lg:px-48 xl:px-80 2xl:px-96">
      <div className="w-full">
        {/* Tabs Collection */}
        <div className="flex justify-around mb-3 rounded-lg">
          <button
            className={`${
              darkMode ? "hover:bg-green-500" : "hover:bg-green-400"
            } text-green-600 dark:text-green-400 px-5 py-1 rounded-3xl hover:bg-opacity-30  transition-all duration-300`}
          >
            Posts
          </button>
        </div>

        <PostDataShowingContainer
          postCollectionDataTypes={
            PostCollectionDataTypes.particularAccPostData
          }
          desiredProfileId={useParams().connectionId}
          desiredProfileData={state}
        />
      </div>
    </div>
  );
};

const ProfileRelatedButtons = ({ darkMode }) => {
  const { connectionId } = useParams();
  const profileData = getDataFromLocalStorage();
  const [connectionType, setconnectionType] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (profileData && profileData.user !== connectionId) {
      particularUserConnectionStatus(connectionId).then((data) => {
        if (!data) return;
        setconnectionType(data);
      });
    }
  }, [connectionId]);

  const handleOwnProfileEdit = () => {
    navigate("/update-user-information", {
      state: {
        name: profileData?.name || "",
        description: profileData?.description || "",
        profilePic: profileData?.profilePic || "",
      },
    });
  };

  // ** NOTE: 1) if own user profile, then show edit button
  // ** NOTE: 2) if the viewer is connected to current user, then show remove and Message button
  // ** NOTE: 3) if the viewer is not connected to current user, then show connect button

  if (profileData?.user === connectionId) {
    return (
      <EditButton
        darkMode={darkMode}
        customClassName={"mt-3 text-sm"}
        onClickOperation={handleOwnProfileEdit}
      />
    );
  } else {
    return (
      <div className="mt-3 flex justify-center items-center">
        <ButtonsManagement
          darkMode={darkMode}
          connectionType={connectionType}
        />
      </div>
    );
  }
};

const ButtonsManagement = ({ darkMode, connectionType }) => {
  if (connectionType === ConnectionType.AlreadyConnected) {
    return (
      <div className="sm:flex justify-center items-center ">
        <MessageButton customClassName={"mt-3 text-sm"} darkMode={darkMode} />
        <RemoveConnectionButton
          customClassName={"mt-3 text-sm"}
          darkMode={darkMode}
        />
      </div>
    );
  } else if (connectionType === ConnectionType.RequestSent) {
    return (
      <WithDrawConnectionRequestButton
        customClassName={"mt-3 text-sm"}
        darkMode={darkMode}
      />
    );
  } else if (connectionType === ConnectionType.RequestReceived) {
    return (
      <div className="sm:flex justify-center items-center ">
        <AcceptButton customClassName={"mt-3 text-sm"} darkMode={darkMode} />
        <CancelButton customClassName={"mt-3 text-sm"} darkMode={darkMode} />
      </div>
    );
  } else if (connectionType === ConnectionType.notConnected) {
    return (
      <ConnectButton customClassName={"mt-3 text-sm"} darkMode={darkMode} />
    );
  } else {
    return <></>;
  }
};

export default ProfileSection;
