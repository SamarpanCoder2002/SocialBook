import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PostCollectionDataTypes } from "../../types/types";
import { DesktopNotification } from "../common/desktop-notification";
import { getDataFromLocalStorage } from "../common/local-storage-management";
import { manageExtraSpace} from "../common/extra-space-management";
import BaseCommonPart from "../page-builder/base";
import { fetchUserProfile } from "../profile-section/helper/api-call";
import NoProfilePic from "../../image/no_profile_picture.png";
import PostDataShowingContainer from "../post-prototype/post-showing-section";

const HomePage = () => {
  const {darkMode} = useSelector(state => state);

  useEffect(() => {
    manageExtraSpace(darkMode);
  }, [darkMode])

  return (
    <BaseCommonPart>
      <div className="h-auto min-h-[92vh] bg-lightBgColor dark:bg-darkBgColor pt-1">
        <div className="container mx-auto px-4 sm:px-6 md:px-4 lg:px-0 2xl:px-96 py-1">
          <div className="flex flex-wrap text-lightPostTextStyleColor dark:text-darkPostTextStyleColor justify-center">
            <LeftProfileShortSection />
            <RightFeedSection />
          </div>
        </div>
      </div>
      <DesktopNotification />
    </BaseCommonPart>
  );
};

const LeftProfileShortSection = () => {
  const { darkMode } = useSelector((state) => state);
  const navigate = useNavigate();
  const storedData = getDataFromLocalStorage();
  const [userInformation, setuserInformation] = useState({
    name: "",
    description: "",
    profilePic: "",
    email: "",
    phone: "",
  });

  const { name, description, profilePic } = userInformation;

  useEffect(() => {
    fetchUserProfile(storedData?.user).then((res) => {
      res &&
        setuserInformation((prev) => {
          return {
            ...prev,
            name: res.name,
            description: res.description,
            profilePic: res.profilePic,
            email: res?.email || "",
            interests: res?.interests || [],
          };
        });
    });
  }, []);

  return (
    <div className="h-2/6 w-full lg:w-1/5 mb-5 bg-lightElevationColor dark:bg-darkElevationColor rounded-lg lg:mr-5 p-3 flex flex-col text-lightPostTextStyleColor dark:text-darkPostTextStyleColor shadow-lg border-2 border-lightBorderColor dark:border-0">
      <div className="w-full ">
        <div className="h-16 w-16 md:h-20 md:w-20 2xl:h-24 2xl:w-24 bg-lightElevationColor dark:bg-darkElevationColor rounded-full mx-auto">
          <img
            src={profilePic || NoProfilePic}
            alt="profile"
            className="rounded-full h-16 w-16 md:h-20 md:w-20 2xl:h-24 2xl:w-24 object-cover"
          />
        </div>
      </div>

      <div className="mt-1">
        <div className="flex flex-col justify-center items-center">
          <div className="text-center">
            <h1 className="xl:text-lg 2xl:text-xl font-semibold">{name}</h1>
            <h2 className="text-sm mt-3">{description}</h2>
          </div>
        </div>
      </div>

      <div className="w-full text-center">
        <button
          className={`${
            darkMode ? "hover:bg-blue-800" : "hover:bg-blue-400"
          } mt-5 text-lightPrimaryFgColor dark:text-darkPrimaryFgColor px-2 py-1 rounded-3xl w-32 lg:w-full border-darkPrimaryFgColor  hover:bg-opacity-30  transition-all duration-300`}
          style={{ borderWidth: "0.2px" }}
          onClick={() => {
            const result = getDataFromLocalStorage();

            if (result) {
              const { user } = result;
              navigate(`/${user}/profile`, {
                state: {
                  name: name,
                  profilePic: profilePic,
                  description: description,
                },
              });
            }
          }}
        >
          Visit Profile
        </button>
      </div>
    </div>
  );
};

export const RightFeedSection = () => {
  return (
    <div className="h-[90vh] overflow-y-scroll suggested-profiles-container w-full lg:w-1/2  suggested-profiles-container rounded-lg">
      <PostDataShowingContainer
        postCollectionDataTypes={PostCollectionDataTypes.feedData}
      />
    </div>
  );
};

export default HomePage;
