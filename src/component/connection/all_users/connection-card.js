import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NoProfileImage from "../../../image/no_profile_picture.png";
import { ConnectButton } from "../../common/buttons";
import { onConnectButtonClicked } from "../../common/common-button-operation";

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
          src={
            (user.profilePic !== "undefined" && user.profilePic) ||
            NoProfileImage
          }
          alt="profile"
          className="rounded-full h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 object-cover"
        />
      </div>

      <div className="text-center">
        {/* User Name */}
        <h4
          className="text-base mt-1 tracking-wide hover:underline cursor-pointer pt-1"
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
          {user.name.length > 20 ? user.name.slice(0, 20) + "..." : user.name}
        </h4>

        {/* User description */}
        <p className="text-sm mt-1">
          {user.description.length > 25
            ? user.description.slice(0, 25) + "..."
            : user.description}
        </p>
      </div>

      {/* Button to Connect */}
      <ConnectButton
        darkMode={darkMode}
        customClassName={"mt-3"}
        onClickOperation={() => {
          onConnectButtonClicked(user.id);
          setrequestSentConnectionsIds((prev) => [...prev, user.id]);
        }}
      />
    </div>
  );
};

export default ProfileCard;
