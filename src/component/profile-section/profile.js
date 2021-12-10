import { useState } from "react";
import { useParams } from "react-router-dom";
import BaseCommonPart from "../base";
import ProfileActivityOrPost from "./post-collection";

const ProfileSection = () => {
  const { connectionId } = useParams();
  const [currentTab, setcurrentTab] = useState(0);
  const desc =
    "Dwayne Douglas Johnson, also known by his ring name The Rock, is an American actor, producer, businessman, and former professional wrestler. Regarded as one of the greatest professional wrestlers of all time, he wrestled for WWE for eight years prior to pursuing an acting career. ";

  return (
    <BaseCommonPart>
      <div className="h-screen bg-lightBgColor dark:bg-darkBgColor  overflow-y-scroll">
        <div className="container mx-auto px-4 sm:px-6 md:px-4 lg:px-60 2xl:px-96 py-1">
          <div className="text-lightPostTextStyleColor dark:text-darkPostTextStyleColor justify-center  p-3 mt-5 flex flex-col rounded-lg">
            <div className="w-full ">
              <div className="relative w-16 h-16 lg:w-32 lg:h-32 mx-auto">
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

            <div className="container mx-auto lg:px-20 2xl:px-96">
              {/* Tabs Collection */}
              <ul className="flex justify-around mt-3">
                <li
                  className={`${
                    currentTab === 0
                      ? "invitation-tab-bar-item"
                      : "px-4 py-2 cursor-pointer"
                  }  w-full text-center `}
                  onClick={() => setcurrentTab(0)}
                >
                  Activity
                  <div
                    className={`${
                      currentTab === 0 ? "invitation-tab-bar-item-underbar" : ""
                    } mt-4`}
                  ></div>
                </li>
                <li
                  className={`${
                    currentTab === 1
                      ? "invitation-tab-bar-item"
                      : "px-4 py-2 cursor-pointer"
                  } w-full text-center `}
                  onClick={() => setcurrentTab(1)}
                >
                  Post
                  <div
                    className={`${
                      currentTab === 1 ? "invitation-tab-bar-item-underbar" : ""
                    } mt-4`}
                  ></div>
                </li>
              </ul>

              <ProfileActivityOrPost index={currentTab} />
            </div>
          </div>
        </div>
      </div>
    </BaseCommonPart>
  );
};

export default ProfileSection;
