import { useEffect, useState } from "react";
import Waiting from "../../main-helper/waiting";
import { fetchAllAvailableUsers } from "../helper/api_call";
import ProfileCard from "./connection-card";

const AllUsersCollection = () => {
  const [userSuggestions, setuserSuggestions] = useState([]);
  const [page, setpage] = useState(1);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    setisLoading(true);
    fetchAllAvailableUsers(page).then((data) => {
      setuserSuggestions(data || []);
      setisLoading(false);
    })
  }, [page]);

  return isLoading ? (
    <Waiting showName="Loading" largeScreenPadding="px-72" lightBgColor="bg-lightElevationColor" darkBgColor="bg-darkElevationColor" />
  ) : (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 px-2 py-3">
      {!isLoading &&
        userSuggestions.map((user, index) => (
          <ProfileCard key={index} user={user} />
        ))}
    </div>
  );
};
export default AllUsersCollection;
