import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BaseCommonPart from "../base";
import ParticularConnectionPostCollection from "./post-collection";

const ProfileSection = () => {
  const { connectionId } = useParams();

  const desc =
    "Dwayne Douglas Johnson, also known by his ring name The Rock, is an American actor, producer, businessman, and former professional wrestler. Regarded as one of the greatest professional wrestlers of all time, he wrestled for WWE for eight years prior to pursuing an acting career. ";

  return (
    <BaseCommonPart>
      <div className="h-screen bg-lightBgColor dark:bg-darkBgColor overflow-y-scroll suggested-profiles-container">
        <div className="container mx-auto px-4 sm:px-6 md:px-4 lg:px-60 2xl:px-96 py-1">
          <div className="text-lightPostTextStyleColor dark:text-darkPostTextStyleColor justify-center  p-3 mt-5 flex flex-col rounded-lg">
            <div className="w-full ">
              <div className="relative w-16 h-16 lg:w-32 lg:h-32 mx-auto cursor-pointer">
                <img
                  className="rounded-full border-2 border-gray-100 shadow-sm"
                  src="https://www.newsbox.pk/wp-content/uploads/2019/08/the-rock-2.jpg"
                  alt="profile pic"
                />
                <div className="absolute bottom-0 right-0 lg:right-5 bg-lightBgColor rounded-full w-5 h-5 text-center shadow-2xl">
                  <i class="fas fa-plus" style={{ color: "#2299ff" }}></i>
                </div>
              </div>
            </div>

            <div>
              <div className="flex flex-col justify-center items-center">
                <div className="text-center">
                  <h1 className="text-xl font-semibold mt-3">Dwayne Johnson</h1>
                  <h2 className="text-sm mt-3">{desc}</h2>
                </div>
              </div>
            </div>

            <ProfileRelatedButtons />

            <div className="container mx-auto lg:px-20 2xl:px-96 mt-5">
              {/* Tabs Collection */}
              <ul className="flex justify-around mt-3">
                <li
                  className={`w-full text-center text-green-400 font-semibold tracking-wider`}
                >
                  Post
                </li>
              </ul>

              <ParticularConnectionPostCollection />
            </div>
          </div>
        </div>
      </div>
    </BaseCommonPart>
  );
};

const ProfileRelatedButtons = () => {
  const { darkMode } = useSelector((state) => state);

  // TODO: Use Suitable Button When Required according to condition

  return (
    <div className="mt-3 w-full px-32 sm:px-40 md:px-60 lg:px-72 2xl:px-96">
      <button
        className={`${
          darkMode ? "hover:bg-green-400" : "hover:bg-green-400"
        } mt-3 text-green-600 dark:text-green-400 px-2 py-1 rounded-3xl border-green-400  hover:bg-opacity-30  transition-all duration-300 sm:mr-3 w-full hover:shadow-sm hover:shadow-green-300`}
        style={{ borderWidth: "0.2px" }}
      >
        Connect
      </button>
      <button
        className={`${
          darkMode ? "hover:bg-blue-800" : "hover:bg-blue-400"
        } mt-3 text-lightPrimaryFgColor dark:text-darkPrimaryFgColor px-2 py-1 rounded-3xl border-darkPrimaryFgColor  hover:bg-opacity-30  transition-all duration-300 sm:ml-3 w-full hover:shadow-sm hover:shadow-darkPrimaryFgColor`}
        style={{ borderWidth: "0.2px" }}
      >
        Message
      </button>
    </div>
  );
};

export default ProfileSection;
