import { useState } from "react";
import { useSelector } from "react-redux";
import { NotificationType } from "../../types/posttypes";
import BaseCommonPart from "../page-builder/base";

const NotificationScreen = () => {
  return (
    <BaseCommonPart>
      <NotificationContainer />
    </BaseCommonPart>
  );
};

const NotificationContainer = () => {
  const [notificationContainer, setnotificationContainer] = useState([
    {
      id: 1,
      title: "Samarpan Dasgupta react to your post",
      status: NotificationType.unread,
      link: "",
    },
    {
      id: 2,
      title: "Sukannya Paul comment to your post",
      status: NotificationType.read,
      link: "",
    },
  ]);

  const { darkMode } = useSelector((state) => state);

  return (
    <div className="h-screen bg-lightBgColor dark:bg-darkBgColor text-lightPostTextStyleColor dark:text-darkPostTextStyleColor p-5">
      <div className="container mx-auto sm:px-6 md:px-24 lg:px-52 2xl:px-96">
        <div className="bg-lightElevationColor dark:bg-darkElevationColor rounded-lg shadow-md">
          {notificationContainer.map((notification, index) => {
            return (
              <div
                className={`${
                  darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"
                } flex flex-col cursor-pointer p-3`}
                key={index}
              >
                <div className="flex flex-row justify-between items-center">
                  <div className="text-sm font-semibold tracking-wider text-yellow-500">
                    {notification.title}
                  </div>

                  <div className="text-xs font-semibold tracking-wider p-2 rounded-full hover:bg-gray-600">
                    <i class="far fa-trash-alt" style={{ color: "red" }}></i>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NotificationScreen;
