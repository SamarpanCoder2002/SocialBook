import { Fragment, useEffect, useState, useRef } from "react";
import Waiting from "../../common/waiting";
import { fetchAllAvailableUsers } from "../helper/api_call";
import ProfileCard from "./connection-card";

const AllUsersCollection = () => {
  const [userSuggestions, setuserSuggestions] = useState([]);
  const [page, setpage] = useState(1);
  const [isLoading, setisLoading] = useState(true);
  const [requestSentConnectionsIds, setrequestSentConnectionsIds] = useState(
    []
  );
  const [lastElement, setLastElement] = useState(null);

  const observer = useRef(
    new IntersectionObserver((entries) => {
      entries[0]?.isIntersecting && setpage((no) => no + 1);
    })
  );

  useEffect(() => {
    fetchAllAvailableUsers(page).then((data) => {
      setuserSuggestions((prev) => (data ? [...prev, ...data] : [...prev]));
      setisLoading(false);
      return;
    });
  }, [page]);

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;
    if (currentElement) currentObserver.observe(currentElement);
    return () => currentElement && currentObserver.unobserve(currentElement);
  }, [lastElement]);

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
          <div ref={setLastElement} key={index}>
            <ProfileCard
              user={user}
              setrequestSentConnectionsIds={setrequestSentConnectionsIds}
            />
          </div>
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
