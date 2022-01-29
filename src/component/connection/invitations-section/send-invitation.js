import { Fragment, useEffect, useState, useRef } from "react";
import { ConnectionType } from "../../../types/types";
import Waiting from "../../common/waiting";
import ConnectionCollectionItem from "../connection-common-layout";
import { fetchAllSpecificRequestedUsers } from "../helper/api_call";

const SendInvitation = () => {
  const [isLoading, setisLoading] = useState(true);
  const [page, setpage] = useState(1);
  const [sentConnectionRequestList, setsentConnectionRequestList] = useState(
    []
  );
  const [sentConnectionRequestIds, setsentConnectionRequestIds] = useState([]);
  const [lastElement, setLastElement] = useState(null);

  const observer = useRef(
    new IntersectionObserver((entries) => {
      entries[0]?.isIntersecting && setpage((no) => no + 1);
    })
  );

  useEffect(() => {
    fetchAllSpecificRequestedUsers(page, ConnectionType.RequestSent).then(
      (data) => {
        setsentConnectionRequestList((prev) => [...prev, ...data]);
        setisLoading(false);
        return;
      }
    );
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
  ) : (
    <div className="h-screen overflow-y-scroll suggested-profiles-container">
      {(sentConnectionRequestList.length > 0 &&
        sentConnectionRequestIds.length !== sentConnectionRequestList.length &&
        sentConnectionRequestList.map((user, index) => {
          if (sentConnectionRequestIds.includes(user.id))
            return <Fragment key={index}></Fragment>;
          return (
            <div ref={setLastElement} key={index}>
              <ConnectionCollectionItem
                user={user}
                connectionType={ConnectionType.RequestSent}
                setCollectiveIds={setsentConnectionRequestIds}
              />
            </div>
          );
        })) || (
        <h1 className="w-full text-center mt-10 tracking-wide text-md md:text-lg lg:text-2xl 2xl:text-3xl">
          No Pending Sent Requests 😳
        </h1>
      )}
    </div>
  );
};

export default SendInvitation;
