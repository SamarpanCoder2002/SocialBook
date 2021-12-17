import React, { useState } from "react";
import { useSelector } from "react-redux";
import BaseCommonPart from "./base";
import ConnectedUsers from "./connection/already_connected/connected_users";
import InvitationTabsCollection from "./connection/invitations-section/tab-collection";
import AllUsersCollection from "./connection/all_users/all-users-collection";
import { useLocation } from "react-router-dom";

const ConnectionScreen = () => {
  const { prevDesignSet } = useLocation();
  const { prevIndex, invitationSetInitialIndex } = prevDesignSet ?? 0;
  const [selected, setselected] = useState(prevIndex ?? 0);

  return (
    <BaseCommonPart>
      <div className="h-auto min-h-screen bg-lightBgColor dark:bg-darkBgColor pt-3">
        <div className="container mx-auto px-4 sm:px-6 md:px-4 lg:px-8 2xl:px-96 py-1">
          <div className="flex flex-wrap text-lightPostTextStyleColor dark:text-darkPostTextStyleColor ">
            <LeftSideSelector selected={selected} setselected={setselected} />
            <RightSideSelector
              selected={selected}
              invitationSetInitialIndex={invitationSetInitialIndex}
            />
          </div>
        </div>
      </div>
    </BaseCommonPart>
  );
};

const LeftSideSelector = ({ selected, setselected }) => {
  const types = ["All Users", "Connections", "Invitations"];

  const { darkMode } = useSelector((state) => state);

  return (
    <div className="h-2/6 w-full lg:w-1/6 mb-5 bg-lightElevationColor dark:bg-darkElevationColor rounded-lg mr-5 shadow-lg">
      <ul className="h-auto">
        {types.map((type, index) => {
          return (
            <li
              key={index}
              className={`${
                selected === index
                  ? "text-lightPrimaryFgColor "
                  : "text-lightPostTextStyleColor dark:text-darkPostTextStyleColor"
              } ${darkMode ? "hover:bg-gray-500" : "hover:bg-gray-200"}
              
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
    <div className="h-screen w-full lg:w-9/12 overflow-y-scroll suggested-profiles-container rounded-lg shadow-2xl">
      <div className="w-full bg-lightElevationColor dark:bg-darkElevationColor p-3 rounded-lg transition-all duration-300 ease-in-out">
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
