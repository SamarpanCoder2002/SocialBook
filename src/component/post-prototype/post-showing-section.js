import { useEffect, useRef, useState } from "react";
import { PostCollectionDataTypes } from "../../types/types";
import { fetchFeedPosts } from "../home/helper/api_call";
import { getDataFromLocalStorage } from "../common/local-storage-management";
import Waiting from "../common/waiting";
import CommonPostStyle from "./post-common-style";

const PostDataShowingContainer = ({
  postCollectionDataTypes,
  desiredProfileId,
  desiredProfileData,
}) => {
  const [postDataCollection, setpostDataCollection] = useState([]);
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

      setpostDataCollection((prev) => [...prev, ...data]);
      setisLoading(false);

      return () => {
        observer.current.disconnect();
      };
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
      {!isLoading && postDataCollection.length > 0 ? (
        postDataCollection.map((feedData, index) => {
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

          return index === postDataCollection.length - 1 ? (
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
        })
      ) : (
        <div>
          <h1 className="text-xl font-semibold text-blue-400 my-5 text-center">
            No Posts Found
          </h1>
        </div>
      )}

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
