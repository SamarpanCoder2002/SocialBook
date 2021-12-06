import { useSelector } from "react-redux";
import NoProfileImage from "../../../image/no_profile_picture.png";

const ProfileCard = ({ user }) => {
  const { darkMode } = useSelector((state) => state);

  return (
    <div
      className="w-3/4 md:w-5/6 flex flex-col justify-center items-center border-lightSecondaryFgColor dark:border-darkSecondaryFgColor border-opacity-10 rounded-lg p-2 mx-auto cursor-pointer discover-connection-card transition-all duration-300 px-3 "
      style={{ borderWidth: "0.2px" }}
    >
      {/* Profile Image */}
      <img
        src={user.profileImage ? user.profileImage : NoProfileImage}
        alt="profile"
        className="rounded-full h-24 w-24"
      />

      <div className="text-center">
        {/* User Name */}
        <h4 className="text-xl mt-1 font-bold">{user.name}</h4>

        {/* User Title */}
        <p className="text-sm mt-1">
          {user.title.length > 45
            ? user.title.slice(0, 45) + "..."
            : user.title}
        </p>
      </div>

      {/* Mutual Connections */}
      <p className="text-xs mt-3 text-center">{`🔗 ${user.mutual_connections} mutual connections`}</p>

      {/* Button to Connect */}
      <button
        className={`${
          darkMode ? "hover:bg-blue-800" : "hover:bg-blue-400"
        } mt-3 text-lightPrimaryFgColor dark:text-darkPrimaryFgColor px-2 py-1 rounded-3xl w-full border-darkPrimaryFgColor  hover:bg-opacity-30  transition-all duration-300`}
        style={{ borderWidth: "0.2px" }}
      >
        Connect
      </button>
    </div>
  );
};

export default ProfileCard;
