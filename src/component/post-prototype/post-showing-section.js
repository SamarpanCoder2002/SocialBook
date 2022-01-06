import { useEffect, useRef, useState } from "react";
import { PostCollectionDataTypes } from "../../types/posttypes";
import { fetchFeedPosts } from "../home/helper/api_call";
import { getDataFromLocalStorage } from "../main-helper/local-storage-management";
import Waiting from "../main-helper/waiting";
import CommonPostStyle from "./post-common-style";

const PostDataShowingContainer = ({
  postCollectionDataTypes,
  desiredProfileId,
  desiredProfileData,
}) => {
  const [feedDataCollection, setfeedDataCollection] = useState([]);
  const [page, setpage] = useState(1);
  const [isLoading, setisLoading] = useState(true);
  const [lastElement, setLastElement] = useState(null);
  const [noMorePostFound, setnoMorePostFound] = useState(false);

  const observer = useRef(
    new IntersectionObserver((entries) => {
      entries[0]?.isIntersecting && setpage((no) => no + 1);
    })
  );

  useEffect(() => {
    fetchFeedPosts(
      page,
      postCollectionDataTypes === PostCollectionDataTypes.feedData
        ? "getFeedPosts"
        : "getParticularAccountPosts",
      desiredProfileId
    ).then((data) => {
      if (!data) {
        setnoMorePostFound(true);
        setisLoading(false);
        return;
      }
      setfeedDataCollection((prev) => [...prev, ...data]);
      setisLoading(false);
    });
  }, [page]);

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;
    if (currentElement) currentObserver.observe(currentElement);
    return () => currentElement && currentObserver.unobserve(currentElement);
  }, [lastElement]);

  return (
    <>
      {/* Data Loading Section */}
      {isLoading && (
        <Waiting
          showName="Hang tight... Data Fetching in Progress "
          largeScreenPadding="xl:px-60"
          lightBgColor="bg-lightElevationColor"
          darkBgColor="bg-darkElevationColor"
        />
      )}

      {/* Data Show Section */}
      {!isLoading &&
        feedDataCollection.map((feedData, index) => {
          if (
            postCollectionDataTypes ===
            PostCollectionDataTypes.particularAccPostData
          ) {
            const localStorageData = getDataFromLocalStorage();

            if (localStorageData.user !== desiredProfileId)
              feedData.postHolderData = desiredProfileData;
            else
              feedData.postHolderData = {
                name: localStorageData.name,
                profilePic: localStorageData.profilePic,
                description: localStorageData.description,
              };
          }

          return index === feedDataCollection.length - 1 ? (
            <div key={index} ref={setLastElement}>
              <CommonPostStyle item={feedData} allowCommentSection={false} />
            </div>
          ) : (
            <CommonPostStyle
              key={index}
              item={feedData}
              allowCommentSection={false}
            />
          );
        })}

      {/* Post Found Based on Pagination */}
      {!isLoading && (
        <div className="text-center">
          <h1 className="text-xl font-semibold text-blue-400 my-5">
            {noMorePostFound ? "" : "Loading..."}
          </h1>
        </div>
      )}
    </>
  );
};

export default PostDataShowingContainer;
