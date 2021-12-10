import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostTypes } from "../../types/posttypes";
import BaseCommonPart from "../base";
import CommonPostStyle from "./post-common-style";

const ParticularPostShowcase = () => {
  const { postId } = useParams();
  const [postData, setpostData] = useState({});

  console.log(postId);

  useEffect(() => {
    //// TODO: Replace conditioning with API call here. If no data return, then show error message.

    /// * postId coming as param which is string not number
    if (postId == 1) {
      setpostData({
        id: 1,
        type: PostTypes.Poll,
        content: {
          text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the
              1500s, when an unknown printer took a galley of type and scrambled it to
              make a type specimen book. It has survived not only five centuries, but
              also the leap into electronic typesetting, remaining essentially
              unchanged. My Website: https://samarpandasgupta.com It was popularised in the 1960s with the release of Letraset
              sheets containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
          pollItems: {
            question: "Do you like this?",
            prevResults: [
              { text: "Yes", votes: 2 },
              { text: "No", votes: 0 },
              { text: "Fucking You", votes: 1 },
            ],
          },
        },
        engagement: {
          likes: 17,
          shares: 30,
          comments: 100,
        },
        comments: [
          "Love you 💘Love you 💘Love you 💘Love you 💘Love you 💘Love you 💘Love you 💘Love you 💘Love you 💘Love you 💘Love you 💘Love you 💘Love you 💘Love you 💘Love you 💘Love you 💘Love you 💘Love you 💘Love you 💘Love you 💘Love you 💘Love you 💘Love you 💘",
          "One of the best 🤩One of the best 🤩One of the best 🤩One of the best 🤩One of the best 🤩One of the best 🤩One of the best 🤩One of the best 🤩One of the best 🤩One of the best 🤩One of the best 🤩One of the best 🤩One of the best 🤩One of the best 🤩One of the best 🤩One of the best 🤩One of the best 🤩One of the best 🤩One of the best 🤩One of the best 🤩One of the best 🤩One of the best 🤩One of the best 🤩One of the best 🤩One of the best 🤩One of the best 🤩One of the best 🤩",
        ],
      });
    }
  }, [postId]);

  return (
    <BaseCommonPart>
      <div className="text-lightPostTextStyleColor dark:text-darkPostTextStyleColor p-2 h-screen bg-lightBgColor dark:bg-darkBgColor overflow-y-scroll suggested-profiles-container">
        <div className="container mx-auto px-4 sm:px-6 md:px-4 lg:px-60 2xl:px-96 py-1">
          <GetPostData postData={postData} />
        </div>
      </div>
    </BaseCommonPart>
  );
};

const GetPostData = ({ postData }) => {
  if (postData.type) {
    return <CommonPostStyle item={postData} allowCommentSection={true} />;
  }

  return (
    <h1 className="flex flex-wrap justify-center items-center text-center text-4xl">
      404
      {<br />}
      Not Found
    </h1>
  );
};

export default ParticularPostShowcase;
