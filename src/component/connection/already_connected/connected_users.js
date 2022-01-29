import { useState, useEffect, Fragment, useRef } from "react";
import { ConnectionType } from "../../../types/types";
import Waiting from "../../common/waiting";
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
  const [lastElement, setLastElement] = useState(null);
  const [connectedUsersCollection, setconnectedUsersCollection] = useState([]);
  const [removedConnectionIds, setremovedConnectionIds] = useState([]);

  const observer = useRef(
    new IntersectionObserver((entries) => {
      entries[0]?.isIntersecting && setpage((no) => no + 1);
    })
  );

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
    const currentElement = lastElement;
    const currentObserver = observer.current;
    if (currentElement) currentObserver.observe(currentElement);
    return () => currentElement && currentObserver.unobserve(currentElement);
  }, [lastElement]);

  useEffect(() => {
    fetchAllSpecificRequestedUsers(page, ConnectionType.AlreadyConnected).then(
      (data) => {
        setconnectedUsersCollection((prev) => [...prev, ...data]);
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
      {(searchResultUsersCollection.length > 0 &&
        removedConnectionIds.length !== searchResultUsersCollection.length &&
        searchResultUsersCollection.map((user, index) => {
          if (removedConnectionIds.includes(user.id))
            return <Fragment key={index}></Fragment>;
          return (
            <div ref={setLastElement} key={index}>
              <ConnectionCollectionItem
                user={user}
                connectionType={ConnectionType.AlreadyConnected}
                setCollectiveIds={setremovedConnectionIds}
              />
            </div>
          );
        })) || (
        <h1 className="w-full text-center mt-10 tracking-wide text-md md:text-lg lg:text-2xl 2xl:text-3xl">
          You Have No Connection Yet ☹️
          <div
            className="text-sm lg:text-md 2xl:text-lg text-blue-500 tracking-wide underline cursor-pointer mt-2"
            onClick={() => window.location.reload()}
          >
            Find Users to Connect
          </div>
        </h1>
      )}
    </div>
  );
};

export default ConnectedUsers;
