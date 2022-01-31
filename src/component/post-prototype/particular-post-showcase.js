import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import BaseCommonPart from "../page-builder/base";
import { getParticularPost } from "./helper/api_call";
import CommonPostStyle from "./post-common-style";
import Waiting from "../common/waiting";

const ParticularPostShowcase = () => {
  const { postId } = useParams();
  const { state } = useLocation();
  

  const [postData, setpostData] = useState(state && state.postData);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    if (state && state.postData) return;
    setisLoading(true);

    getParticularPost(postId)
      .then((data) => {
        if (!data) return;
        setpostData(data);

        setisLoading(false);
      })
      .catch((err) => {
        setisLoading(false);
      });
  }, [postId, state]);

  return isLoading ? (
    <Waiting />
  ) : (
    <BaseCommonPart>
      <div className="text-lightPostTextStyleColor dark:text-darkPostTextStyleColor p-2 h-screen bg-lightBgColor dark:bg-darkBgColor overflow-y-scroll suggested-profiles-container">
        <div className="container mx-auto px-4 sm:px-6 md:px-20 lg:px-64 xl:px-80 2xl:px-96 py-1">
          <GetPostData postData={postData} />
        </div>
      </div>
    </BaseCommonPart>
  );
};

const GetPostData = ({ postData }) => {
  if (postData?.type)
    return <CommonPostStyle item={postData} allowCommentSection={true} />;

  return (
    <h1 className="flex flex-wrap justify-center items-center text-center text-4xl">
      404
      {<br />}
      Not Found
    </h1>
  );
};

export default ParticularPostShowcase;
