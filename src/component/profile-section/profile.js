import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getDataFromLocalStorage } from "../common/local-storage-management";
import BaseCommonPart from "../page-builder/base";
import NoProfilePic from "../../image/no_profile_picture.png";
import PostDataShowingContainer from "../post-prototype/post-showing-section";
import { ConnectionType, PostCollectionDataTypes } from "../../types/types";
import {
  fetchUserProfile,
  particularUserConnectionStatus,
} from "./helper/api-call";
import {
  AcceptButton,
  CancelButton,
  ConnectButton,
  EditButton,
  MessageButton,
  RemoveConnectionButton,
  WithDrawConnectionRequestButton,
} from "../common/buttons";
import {
  onAcceptButtonClicked,
  onCancelButtonClicked,
  onConnectButtonClicked,
  onMessageButtonClicked,
  onWithdrawConnectionButtonClicked,
  removeConnectionButtonClicked,
} from "../common/common-button-operation";

const ProfileSection = () => {
  const { state } = useLocation();
  const { darkMode } = useSelector((state) => state);
  const { connectionId } = useParams();
  const [userInformation, setuserInformation] = useState({
    name: state?.name || "",
    description: state?.description || "",
    profilePic: state?.profilePic || "",
  });

  useEffect(() => {
    if (state !== null) return;

    fetchUserProfile(connectionId)
      .then((data) => {
        if (!data) return;

        setuserInformation({
          name: data?.name || "",
          description: data?.description || "",
          profilePic: data?.profilePic || "",
        });
      })
      .catch((e) => {});
  }, [state]);

  return (
    <BaseCommonPart>
      <div className="h-screen bg-lightBgColor dark:bg-darkBgColor overflow-y-scroll suggested-profiles-container">
        <UserInformationContainer
          darkMode={darkMode}
          userInformation={userInformation}
        />
        <UserActivityContainer
          darkMode={darkMode}
          userInformation={userInformation}
        />
      </div>
    </BaseCommonPart>
  );
};

const UserInformationContainer = ({ darkMode, userInformation }) => {
  const { name, description, profilePic } = userInformation;

  return (
    <div className="w-full rounded-lg lg:mr-5 p-3 flex flex-col justify-center items-center text-lightPostTextStyleColor dark:text-darkPostTextStyleColor">
      {/* Profile Image */}
      <div className="h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 bg-lightElevationColor dark:bg-darkElevationColor rounded-full mx-auto">
        <img
          src={(profilePic !== "undefined" && profilePic) || NoProfilePic}
          alt="profile"
          className="rounded-full h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 object-cover"
        />
      </div>

      <h1 className="text-xl font-semibold mt-3">{name}</h1>
      <h2 className="text-sm mt-3 text-center">{description}</h2>

      <ProfileRelatedButtons
        darkMode={darkMode}
        userInformation={userInformation}
      />
    </div>
  );
};

const UserActivityContainer = ({ darkMode, userInformation }) => {
  const { connectionId } = useParams();

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
          desiredProfileId={connectionId}
          desiredProfileData={userInformation}
        />
      </div>
    </div>
  );
};

const ProfileRelatedButtons = ({ darkMode, userInformation }) => {
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
        name: profileData?.name || userInformation?.name || "",
        description:
          profileData?.description || userInformation?.description || "",
        profilePic:
          profileData?.profilePic || userInformation?.profilePic || "",
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
          userInformation={userInformation}
        />
      </div>
    );
  }
};

const ButtonsManagement = ({ darkMode, connectionType, userInformation }) => {
  const { connectionId } = useParams();

  if (connectionType === ConnectionType.AlreadyConnected) {
    return (
      <div className="sm:flex justify-center items-center ">
        <MessageButton
          customClassName={"mt-3 text-sm"}
          darkMode={darkMode}
          onClickOperation={() => {
            onMessageButtonClicked(
              connectionId,
              userInformation?.name || "",
              userInformation?.description || "",
              userInformation?.profilePic || ""
            );
          }}
        />
        <RemoveConnectionButton
          customClassName={"mt-3 text-sm"}
          darkMode={darkMode}
          onClickOperation={() => {
            removeConnectionButtonClicked(connectionId);
            makeReload();
          }}
        />
      </div>
    );
  } else if (connectionType === ConnectionType.RequestSent) {
    return (
      <WithDrawConnectionRequestButton
        customClassName={"mt-3 text-sm"}
        darkMode={darkMode}
        onClickOperation={() => {
          onWithdrawConnectionButtonClicked(connectionId);
          makeReload();
        }}
      />
    );
  } else if (connectionType === ConnectionType.RequestReceived) {
    return (
      <div className="sm:flex justify-center items-center ">
        <AcceptButton
          customClassName={"mt-3 text-sm"}
          darkMode={darkMode}
          onClickOperation={() => {
            onAcceptButtonClicked(connectionId);
            makeReload();
          }}
        />
        <CancelButton
          customClassName={"mt-3 text-sm"}
          darkMode={darkMode}
          onClickOperation={() => {
            onCancelButtonClicked(connectionId);
            makeReload();
          }}
        />
      </div>
    );
  } else if (connectionType === ConnectionType.notConnected) {
    return (
      <ConnectButton
        customClassName={"mt-3 text-sm"}
        darkMode={darkMode}
        onClickOperation={() => {
          onConnectButtonClicked(connectionId);
          makeReload();
        }}
      />
    );
  } else {
    return <></>;
  }
};

const makeReload = () => {
  setTimeout(() => {
    window.location.reload();
  }, 1800);
};

export default ProfileSection;
