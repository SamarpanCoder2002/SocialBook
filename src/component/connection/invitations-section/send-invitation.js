import { useEffect, useState } from "react";
import { ConnectionType } from "../../../types/posttypes";
import Waiting from "../../main-helper/waiting";
import ConnectionCollectionItem from "../connection-common-layout";
import { fetchAllSpecificRequestedUsers } from "../helper/api_call";

const SendInvitation = () => {
  const [isLoading, setisLoading] = useState(true);
  const [page, setpage] = useState(1);
  const [sentConnectionRequestList, setsentConnectionRequestList] = useState(
    []
  );

  useEffect(() => {
    if (!isLoading) return;
    fetchAllSpecificRequestedUsers(page, ConnectionType.RequestSent).then(
      (data) => {
        setsentConnectionRequestList(data);
        setisLoading(false);
        return;
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
    <div className="h-screen overflow-y-scroll suggested-profiles-container">
      {(sentConnectionRequestList &&
        sentConnectionRequestList.length > 0 &&
        sentConnectionRequestList.map((user, index) => {
          return (
            <ConnectionCollectionItem
              key={index}
              user={user}
              connectionType={ConnectionType.RequestSent}
            />
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
