import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NoProfileImage from "../../../image/no_profile_picture.png";
import { successMessage } from "../../main-helper/desktop-notification";
import { connectionSpecificOperations } from "../helper/api_call";

const ProfileCard = ({ user, setrequestSentConnectionsIds }) => {
  const { darkMode } = useSelector((state) => state);
  const navigate = useNavigate();

  return (
    <div
      className="w-3/4 md:w-5/6 flex flex-col justify-center items-center border-lightSecondaryFgColor dark:border-darkSecondaryFgColor border-opacity-10 rounded-lg p-2 mx-auto transition-all duration-300 px-3 hover:shadow-md hover:shadow-slate-400 dark:hover:shadow-slate-500 bg-lightCardColor dark:bg-darkCardColor"
      style={{ borderWidth: "0.2px" }}
    >
      {/* Profile Image */}
      <div className="h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 bg-lightElevationColor dark:bg-darkElevationColor rounded-full">
        <img
          src={user.profilePic || NoProfileImage}
          alt="profile"
          className="rounded-full h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 object-cover"
        />
      </div>

      <div className="text-center">
        {/* User Name */}
        <h4
          className="text-base mt-1 tracking-wide hover:underline cursor-pointer"
          onClick={() => {
            navigate(`/${user.id}/profile`);
          }}
        >
          {user.name}
        </h4>

        {/* User description */}
        <p className="text-sm mt-1">
          {user.description.length > 50
            ? user.description.slice(0, 50) + "..."
            : user.description}
        </p>
      </div>

      {/* Button to Connect */}
      <button
        className={`${
          darkMode ? "hover:bg-blue-800" : "hover:bg-blue-400"
        } mt-3 text-lightPrimaryFgColor dark:text-darkPrimaryFgColor px-2 py-1 rounded-3xl w-full border-darkPrimaryFgColor  hover:bg-opacity-30  transition-all duration-300`}
        style={{ borderWidth: "0.2px" }}
        onClick={() => {
          connectionSpecificOperations(user.id, "sendConnectionRequest");
          successMessage("🙋 Connection Request Sent", 2000);
          setrequestSentConnectionsIds((prev) => [...prev, user.id]);
        }}
      >
        Connect
      </button>
    </div>
  );
};

export default ProfileCard;
