import { Fragment, useEffect, useState } from "react";
import Waiting from "../../main-helper/waiting";
import { fetchAllAvailableUsers } from "../helper/api_call";
import ProfileCard from "./connection-card";

const AllUsersCollection = () => {
  const [userSuggestions, setuserSuggestions] = useState([]);
  const [page, setpage] = useState(1);
  const [isLoading, setisLoading] = useState(true);
  const [requestSentConnectionsIds, setrequestSentConnectionsIds] = useState(
    []
  );

  useEffect(() => {
    fetchAllAvailableUsers(page).then((data) => {
      setuserSuggestions((prev) => (data ? [...prev, ...data] : []));
      setisLoading(false);
      return;
    });
  }, [page]);

  return isLoading ? (
    <Waiting
      showName="Hang tight... Data Fetching"
      largeScreenPadding="lg:px-72"
      lightBgColor="bg-lightElevationColor"
      darkBgColor="bg-darkElevationColor"
    />
  ) : userSuggestions.length > 0 &&
    requestSentConnectionsIds.length !== userSuggestions.length ? (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-8 px-2 py-3">
      {userSuggestions.map((user, index) => {
        if (requestSentConnectionsIds.includes(user.id))
          return <Fragment key={index}></Fragment>;
        return (
          <ProfileCard
            key={index}
            user={user}
            setrequestSentConnectionsIds={setrequestSentConnectionsIds}
          />
        );
      })}
    </div>
  ) : (
    <h1 className="w-full text-center mt-10 tracking-wide text-md md:text-lg lg:text-2xl 2xl:text-3xl">
      No Users To Show ☹️
    </h1>
  );
};
export default AllUsersCollection;
