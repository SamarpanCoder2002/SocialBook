import React, { useState } from "react";
import { useSelector } from "react-redux";
import BaseCommonPart from "../page-builder/base";
import ConnectedUsers from "./already_connected/connected_users";
import InvitationTabsCollection from "./invitations-section/tab-collection";
import AllUsersCollection from "./all_users/all-users-collection";
import { useLocation} from "react-router-dom";
import {
  DesktopNotification,
} from "../common/desktop-notification";

const ConnectionScreen = () => {
  const { state, search } = useLocation();
  const { prevIndex, invitationSetInitialIndex } = state?.prevDesignSet ?? 0;
  const [selected, setselected] = useState(prevIndex ?? 0);

  return (
    <BaseCommonPart>
      <div className="h-auto min-h-[91vh] bg-lightBgColor dark:bg-darkBgColor pt-0">
        {search.includes("newUser=true") && (
          <div className="p-5 bg-green-600 dark:bg-green-500 text-white mb-3 text-center">
            Congrats! Your Account is Created Successfully 🥳. Now Send
            Connection Request to Others. 👇
          </div>
        )}
        <div className="container mx-auto px-4 sm:px-6 md:px-4 lg:px-8 2xl:px-96 py-1">
          <div className="flex flex-wrap text-lightPostTextStyleColor dark:text-darkPostTextStyleColor">
            <LeftSideSelector selected={selected} setselected={setselected} />
            <RightSideSelector
              selected={selected}
              invitationSetInitialIndex={invitationSetInitialIndex}
            />
          </div>
        </div>
      </div>
      <DesktopNotification />
    </BaseCommonPart>
  );
};

const LeftSideSelector = ({ selected, setselected }) => {
  const types = ["All Users", "Connections", "Invitations"];

  const { darkMode } = useSelector((state) => state);

  return (
    <div className="h-2/6 w-full lg:w-1/6 mb-2 bg-lightElevationColor dark:bg-darkElevationColor rounded-lg lg:mr-5 shadow-md ">
      <ul className="h-auto">
        {types.map((type, index) => {
          return (
            <li
              key={index}
              className={`${
                selected === index
                  ? "text-lightPrimaryFgColor "
                  : "text-lightPostTextStyleColor dark:text-darkPostTextStyleColor"
              } ${
                darkMode
                  ? "hover:bg-[#425359] hover:text-white"
                  : "hover:bg-gray-200 hover:text-lightPostTextStyleColor"
              }
              
              cursor-pointer py-2 px-5  rounded-sm transition-all duration-300 ease-in-out pb-2`}
              onClick={() => setselected(index)}
            >
              {type}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const RightSideSelector = ({ selected, invitationSetInitialIndex }) => {
  return (
    <div className="h-[91vh] w-full lg:w-9/12 overflow-y-scroll suggested-profiles-container rounded-lg shadow-md">
      <div className="w-full h-full bg-lightElevationColor dark:bg-darkElevationColor rounded-lg transition-all duration-300 ease-in-out overflow-y-scroll scroller">
        {
          <SelectedOption
            selected={selected}
            invitationSetInitialIndex={invitationSetInitialIndex}
          />
        }
      </div>
    </div>
  );
};

const SelectedOption = ({ selected, invitationSetInitialIndex }) => {
  if (selected === 0) {
    return <AllUsersCollection />;
  } else if (selected === 1) {
    return <ConnectedUsers />;
  } else if (selected === 2) {
    return (
      <InvitationTabsCollection
        invitationSetInitialIndex={invitationSetInitialIndex}
      />
    );
  }

  return <h1>Samarpan Dasgupta</h1>;
};

export default ConnectionScreen;
