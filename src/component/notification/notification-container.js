import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Waiting from "../common/waiting";
import BaseCommonPart from "../page-builder/base";
import {
  deleteParticularNotification,
  fetchAllNotifications,
} from "./helper/api_call";

const NotificationScreen = () => {
  const [isLoading, setisLoading] = useState(true);
  const [notificationContainer, setnotificationContainer] = useState();

  useEffect(() => {
    setisLoading(true);

    fetchAllNotifications().then((data) => {
      setnotificationContainer(data);
      setisLoading(false);
    });
  }, []);

  return isLoading ? (
    <Waiting />
  ) : (
    <NotificationContainerScreen
      notificationContainer={notificationContainer}
    />
  );
};

const NotificationContainerScreen = ({ notificationContainer }) => {
  const [particularScreenLoading, setparticularScreenLoading] = useState(false);

  return (
    <BaseCommonPart isLoading={particularScreenLoading}>
      {notificationContainer && notificationContainer.length ? (
        <NotificationContainer
          notificationContainer={notificationContainer}
          particularScreenLoading={particularScreenLoading}
          setparticularScreenLoading={setparticularScreenLoading}
        />
      ) : (
        <NoNotificationFound />
      )}
    </BaseCommonPart>
  );
};

const NotificationContainer = ({
  notificationContainer,
  particularScreenLoading,
  setparticularScreenLoading,
}) => {
  const [deletedNotificationIdContainer, setdeletedNotificationIdContainer] =
    useState([]);

  return (
    <div className="h-screen bg-lightBgColor dark:bg-darkBgColor text-lightPostTextStyleColor dark:text-darkPostTextStyleColor p-3">
      <div className="h-full container mx-auto sm:px-6 md:px-24 lg:px-52 2xl:px-96 ">
        <div className="h-full bg-lightElevationColor dark:bg-darkElevationColor rounded-lg shadow-md  overflow-y-scroll scroller">
          {deletedNotificationIdContainer.length ===
            notificationContainer.length && <NoNotificationFound />}

          {notificationContainer?.length &&
            notificationContainer.map((notification, index) => {
              return deletedNotificationIdContainer?.includes(
                notification.id
              ) ? (
                <Fragment key={index}></Fragment>
              ) : (
                <ParticularNotification
                  notification={notification}
                  setdeletedNotificationIdContainer={
                    setdeletedNotificationIdContainer
                  }
                  particularScreenLoading={particularScreenLoading}
                  setparticularScreenLoading={setparticularScreenLoading}
                  deletedNotificationIdContainer={
                    deletedNotificationIdContainer
                  }
                  key={index}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

const ParticularNotification = ({
  notification,
  setdeletedNotificationIdContainer,
  particularScreenLoading,
  setparticularScreenLoading,
  deletedNotificationIdContainer,
}) => {
  const { darkMode } = useSelector((state) => state);
  const navigate = useNavigate();

  const openRedirectLink = () => {
    navigate(notification.navigateTo, {
      state: notification.additionalInformation,
    });
  };

  const deleteNotification = async () => {
    (await deleteParticularNotification(notification.id)) &&
      setdeletedNotificationIdContainer([
        ...deletedNotificationIdContainer,
        notification.id,
      ]);
  };

  return (
    <div
      className={`${
        darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"
      } flex flex-col`}
      key={notification.id}
    >
      <div className="flex flex-row justify-between items-center">
        <div
          className="w-full py-5 px-3 cursor-pointer"
          onClick={openRedirectLink}
        >
          <div className="text-sm tracking-wider">{notification.message}</div>
        </div>

        {!particularScreenLoading && (
          <div
            className="text-xs font-semibold tracking-wider p-2 rounded-full hover:bg-gray-600"
            onClick={deleteNotification}
          >
            <i className="far fa-trash-alt" style={{ color: "red" }}></i>
          </div>
        )}
      </div>
      <div className="pb-[0.5px] bg-[rgba(0,0,0,0.08)] dark:bg-[rgba(256,256,256,0.08)]"></div>
    </div>
  );
};

const NoNotificationFound = () => {
  return (
    <div className="notification-container bg-lightBgColor dark:bg-darkBgColor h-[92vh] flex flex-wrap justify-center items-center text-lightPostTextStyleColor dark:text-darkPostTextStyleColor">
      <div className="no-notification-found">
        <h1 className="text-3xl tracking-wider">No Notification Found</h1>
      </div>
    </div>
  );
};

export default NotificationScreen;
