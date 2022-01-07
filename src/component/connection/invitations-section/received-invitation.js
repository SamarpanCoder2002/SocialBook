import { Fragment, useEffect, useState } from "react";
import { ConnectionType } from "../../../types/types";
import Waiting from "../../main-helper/waiting";
import ConnectionCollectionItem from "../connection-common-layout";
import { fetchAllSpecificRequestedUsers } from "../helper/api_call";

const ReceivedInvitation = () => {
  const [isLoading, setisLoading] = useState(true);
  const [page, setpage] = useState(1);
  const [receivedInvitationIds, setreceivedInvitationIds] = useState([]);

  const [receivedConnectionRequestList, setreceivedConnectionRequestList] =
    useState([]);

  useEffect(() => {
    fetchAllSpecificRequestedUsers(page, ConnectionType.RequestReceived).then(
      (data) => {
        setreceivedConnectionRequestList((prev) => [...prev, ...data]);
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
      {(receivedConnectionRequestList?.length > 0 &&
        receivedInvitationIds.length !== receivedConnectionRequestList.length &&
        receivedConnectionRequestList.map((user, index) => {
          if (receivedInvitationIds.includes(user.id))
            return <Fragment key={index}></Fragment>;
          return (
            <ConnectionCollectionItem
              key={index}
              user={user}
              connectionType={ConnectionType.RequestReceived}
              setCollectiveIds={setreceivedInvitationIds}
            />
          );
        })) || (
        <h1 className="w-full text-center mt-10 tracking-wide text-md md:text-lg lg:text-2xl 2xl:text-3xl">
          No Pending Received Invitations ☹️
        </h1>
      )}
    </div>
  );
};

export default ReceivedInvitation;
