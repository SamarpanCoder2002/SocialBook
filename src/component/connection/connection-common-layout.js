import { useSelector } from "react-redux";
import NoProfileImage from "../../image/no_profile_picture.png";
import { ConnectionType } from "../../types/posttypes";

const ConnectionCollectionItem = ({ user, connectionType }) => {
  const { darkMode } = useSelector((state) => state);

  return (
    <div
      className={` ${
        darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"
      } flex justify-between items-center p-4 cursor-pointer rounded-md transition-all duration-300 ease-in-out`}
    >
      <div className="flex justify-between w-full">
        <ConnectionTile user={user} />

        <ButtonCollectionPrediction
          darkMode={darkMode}
          connectionType={connectionType}
        />
      </div>
    </div>
  );
};

const ButtonCollectionPrediction = ({ connectionType, darkMode }) => {
  if (connectionType === ConnectionType.AlreadyConnected) {
    return <ConnectedUsersButtonCollection darkMode={darkMode} />;
  } else if (connectionType === ConnectionType.RequestReceived) {
    return <ReceivedInvitationButtonsCollection darkMode={darkMode} />;
  } else if (connectionType === ConnectionType.RequestSent) {
    return <SentRequestButtonCollection darkMode={darkMode} />;
  }

  return <></>;
};

const ConnectionTile = ({ user }) => {
  return (
    <div className="flex items-center w-full md:w-2/3">
      <img
        className="rounded-full w-10 h-10"
        src={user.profileImage ? user.profileImage : NoProfileImage}
        alt="profile"
      />
      <div className="ml-4">
        <p className="text-lg font-semibold">{user.name}</p>
        <p className="text-sm opacity-60">{user.title}</p>
      </div>
    </div>
  );
};

const ConnectedUsersButtonCollection = ({ darkMode }) => {
  return (
    <div className="md:flex items-center hidden">
      <button
        className={`${
          darkMode ? "hover:bg-red-400" : "hover:bg-red-300"
        } mr-5 text-red-500  border-red-500  connection-screens-common-button-layout hover:bg-opacity-30 `}
        style={{ borderWidth: "0.2px" }}
      >
        Remove
      </button>

      <button
        className={`${
          darkMode ? "hover:bg-blue-800" : "hover:bg-blue-300"
        }  text-lightPrimaryFgColor dark:text-darkPrimaryFgColor  border-darkPrimaryFgColor  connection-screens-common-button-layout hover:bg-opacity-30 `}
        style={{ borderWidth: "0.2px" }}
      >
        Message
      </button>
    </div>
  );
};

const ReceivedInvitationButtonsCollection = ({ darkMode }) => {
  return (
    <div className="md:flex items-center hidden">
      <button
        className={`${
          darkMode ? "hover:bg-red-400" : "hover:bg-red-300"
        } mr-5 text-red-500  border-red-500  connection-screens-common-button-layout hover:bg-opacity-30 `}
        style={{ borderWidth: "0.2px" }}
      >
        Cancel
      </button>

      <button
        className={`${
          darkMode ? "hover:bg-green-400" : "hover:bg-green-300"
        }  text-green-600  border-green-600 dark:text-green-400 dark:border-green-400   connection-screens-common-button-layout hover:bg-opacity-30 `}
        style={{ borderWidth: "0.2px" }}
      >
        Accept
      </button>
    </div>
  );
};

const SentRequestButtonCollection = ({ darkMode }) => {
  return (
    <div className="md:flex items-center hidden">
      <button
        className={`${
          darkMode ? "hover:bg-red-400" : "hover:bg-red-300"
        } mr-5 text-red-500  border-red-500 connection-screens-common-button-layout hover:bg-opacity-30`}
        style={{ borderWidth: "0.2px" }}
      >
        Withdraw
      </button>
    </div>
  );
};

export default ConnectionCollectionItem;
