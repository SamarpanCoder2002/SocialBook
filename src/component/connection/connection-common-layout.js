import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NoProfileImage from "../../image/no_profile_picture.png";
import { ConnectionType } from "../../types/types";
import {
  AcceptButton,
  CancelButton,
  MessageButton,
  RemoveConnectionButton,
  WithDrawConnectionRequestButton,
} from "../common/buttons";
import {
  onAcceptButtonClicked,
  onCancelButtonClicked,
  onMessageButtonClicked,
  onWithdrawConnectionButtonClicked,
  removeConnectionButtonClicked,
} from "../common/common-button-operation";

const ConnectionCollectionItem = ({
  user,
  connectionType,
  setCollectiveIds,
}) => {
  const { darkMode } = useSelector((state) => state);

  return (
    <div
      className={` ${
        darkMode ? "hover:bg-darkCardColor" : "hover:bg-lightBgColor"
      } flex justify-between items-center p-4 rounded-md transition-all duration-300 ease-in-out`}
    >
      <div className="flex justify-between w-full">
        <ConnectionTile user={user} />

        <ButtonCollectionPrediction
          darkMode={darkMode}
          connectionType={connectionType}
          partnerUserId={user.id}
          setCollectiveIds={setCollectiveIds}
          userData={user}
        />
      </div>
    </div>
  );
};

const ButtonCollectionPrediction = ({
  connectionType,
  darkMode,
  partnerUserId,
  setCollectiveIds,
  userData,
}) => {
  if (connectionType === ConnectionType.AlreadyConnected) {
    return (
      <ConnectedUsersButtonCollection
        darkMode={darkMode}
        partnerUserId={partnerUserId}
        setCollectiveIds={setCollectiveIds}
        userData={userData}
      />
    );
  } else if (connectionType === ConnectionType.RequestReceived) {
    return (
      <ReceivedInvitationButtonsCollection
        darkMode={darkMode}
        partnerUserId={partnerUserId}
        setCollectiveIds={setCollectiveIds}
      />
    );
  } else if (connectionType === ConnectionType.RequestSent) {
    return (
      <SentRequestButtonCollection
        darkMode={darkMode}
        partnerUserId={partnerUserId}
        setCollectiveIds={setCollectiveIds}
      />
    );
  }

  return <></>;
};

const ConnectionTile = ({ user }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex items-center w-full md:w-2/3 cursor-pointer"
      onClick={() => {
        navigate(`/${user.id}/profile`, {
          state: {
            name: user.name,
            profilePic: user.profilePic,
            description: user.description,
          },
        });
      }}
    >
      <div className="w-10 h-10 md:w-16 md:h-16 bg-lightCardColor dark:bg-darkCardColor rounded-full">
        <img
          className="rounded-full w-10 h-10 md:w-16 md:h-16 object-cover"
          src={
            (user.profilePic !== "undefined" && user.profilePic) ||
            NoProfileImage
          }
          alt="profile"
        />
      </div>
      <div className="ml-4">
        <p className="text-sm md:text-lg md:font-semibold">{user.name.length > 20 ? user.name.slice(0, 20) + "..." : user.name}</p>
        <p className="hidden sm:block sm:text-sm opacity-60">
          {" "}
          {user.description.length > 45
            ? user.description.slice(0, 45) + "..."
            : user.description}
        </p>
      </div>
    </div>
  );
};

const ConnectedUsersButtonCollection = ({
  darkMode,
  partnerUserId,
  setCollectiveIds,
  userData,
}) => {
  // ** NOTE: Message Button Will be redirect to the specific chat..
  // ** We will do it after implement chat feature.

  const { name, profilePic, description } = userData;

  return (
    <div className="md:flex items-center sm:ml-5 text-sm md:text-md 2xl:text-lg md:tracking-wider">
      <MessageButton
        darkMode={darkMode}
        customClassName={"connection-screens-common-button-layout mx-3 md:mx-0"}
        onClickOperation={() =>
          onMessageButtonClicked(partnerUserId, name, description, profilePic)
        }
      />

      <RemoveConnectionButton
        darkMode={darkMode}
        customClassName={
          "connection-screens-common-button-layout mt-3 md:mt-0 mx-3 md:ml-5"
        }
        onClickOperation={() => {
          // connectionSpecificOperations(partnerUserId, "removeConnections");
          // successMessage("😔 Connection Removed", 2000);
          removeConnectionButtonClicked(partnerUserId);
          setCollectiveIds((prev) => [...prev, partnerUserId]);
        }}
      />
    </div>
  );
};

const ReceivedInvitationButtonsCollection = ({
  darkMode,
  partnerUserId,
  setCollectiveIds,
}) => {
  return (
    <div className="md:flex items-center text-sm md:text-md 2xl:text-lg md:tracking-wider">
      <AcceptButton
        darkMode={darkMode}
        customClassName={"connection-screens-common-button-layout mx-3"}
        onClickOperation={() => {
          onAcceptButtonClicked(partnerUserId);
          setCollectiveIds((prev) => [...prev, partnerUserId]);
        }}
      />

      <CancelButton
        darkMode={darkMode}
        customClassName={
          "mr-5 connection-screens-common-button-layout mt-3 md:mt-0 mx-3 md:mx-0"
        }
        onClickOperation={() => {
          onCancelButtonClicked(partnerUserId);
          setCollectiveIds((prev) => [...prev, partnerUserId]);
        }}
      />
    </div>
  );
};

const SentRequestButtonCollection = ({
  darkMode,
  partnerUserId,
  setCollectiveIds,
}) => {
  return (
    <div className="flex items-center">
      <WithDrawConnectionRequestButton
        darkMode={darkMode}
        customClassName={
          "ml-3 md:mr-5 connection-screens-common-button-layout text-sm md:text-md 2xl:text-lg md:tracking-wider"
        }
        onClickOperation={() => {
          onWithdrawConnectionButtonClicked(partnerUserId);
          setCollectiveIds((prev) => [...prev, partnerUserId]);
        }}
      />
    </div>
  );
};

export default ConnectionCollectionItem;
