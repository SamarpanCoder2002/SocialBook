import { useState, useEffect } from "react";
import { ConnectionType } from "../../../types/posttypes";
import Waiting from "../../main-helper/waiting";
import ConnectionCollectionItem from "../connection-common-layout";
import { fetchAllSpecificRequestedUsers } from "../helper/api_call";

const ConnectedUsers = () => {
  const [searchArgument, setsearchArgument] = useState("");
  const [isLoading, setisLoading] = useState(true);

  return (
    <div className="px-2 py-3">
      {!isLoading && (
        <SearchBar
          setsearchArgument={setsearchArgument}
          isLoading={isLoading}
          setisLoading={setisLoading}
        />
      )}
      <ConnectedUsersList
        searchArgument={searchArgument}
        isLoading={isLoading}
        setisLoading={setisLoading}
      />
    </div>
  );
};

const SearchBar = ({ setsearchArgument }) => {
  const handleChange = (e) => {
    console.log(e.target.value);
    setsearchArgument(e.target.value);
  };

  return (
    <div className="relative flex z-50 bg-lightBgColor dark:bg-darkBgColor rounded-full mb-3">
      <input
        type="text"
        placeholder="enter connection name"
        className="rounded-full flex-1 px-6 py-4 text-gray-700 dark:text-white focus:outline-none bg-lightBgColor dark:bg-darkBgColor"
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
};

const ConnectedUsersList = ({ searchArgument, isLoading, setisLoading }) => {
  const [searchResultUsersCollection, setsearchResultUsersCollection] =
    useState([]);

  const [page, setpage] = useState(1);

  const [connectedUsersCollection, setconnectedUsersCollection] = useState([]);

  useEffect(() => {
    if (isLoading) return;
    setsearchResultUsersCollection([]);

    if (searchArgument) {
      const sortedList = [];

      connectedUsersCollection.forEach((user) => {
        if (user.name.toLowerCase().includes(searchArgument.toLowerCase())) {
          sortedList.push(user);
        }
      });

      setsearchResultUsersCollection(sortedList);
    } else {
      setsearchResultUsersCollection(connectedUsersCollection);
    }
  }, [searchArgument, isLoading, connectedUsersCollection]);

  useEffect(() => {
    !isLoading && setisLoading(true);
    fetchAllSpecificRequestedUsers(page, ConnectionType.AlreadyConnected).then(
      (data) => {
        console.log("data: ", data);
        setconnectedUsersCollection(data);
        setisLoading(false);
      }
    );
  }, [page]);

  return isLoading ? (
    <Waiting
      showName="Hang tight... Data Fetching"
      largeScreenPadding="lg:px-72"
      lightBgColor="bg-lightElevationColor"
      darkBgColor="bg-darkElevationColor"
    />
  ) : (
    <div className="h-screen w-full overflow-y-scroll suggested-profiles-container">
      {(searchResultUsersCollection &&
        searchResultUsersCollection.length > 0 &&
        searchResultUsersCollection.map((user, index) => {
          return (
            <ConnectionCollectionItem
              key={index}
              user={user}
              connectionType={ConnectionType.AlreadyConnected}
            />
          );
        })) || (
        <h1 className="w-full text-center text-red-600 text-2xl mt-10 tracking-wide">
          You Have No Connection Yet
        </h1>
      )}
    </div>
  );
};

export default ConnectedUsers;
