import { PostTypes } from "../../types/posttypes";
import {
  ImagePost,
  PdfPost,
  PollPost,
  SliderPost,
  TextPost,
  VideoPost,
} from "./post-type";
import Linkify from "react-linkify";
import ShowMoreText from "react-show-more-text";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const CommonPostStyle = ({ item, allowCommentSection }) => {
  console.log(allowCommentSection);

  return (
    <div
      className={`w-full mx-auto bg-lightElevationColor dark:bg-darkElevationColor text-lightSecondaryFgColor dark:text-darkSecondaryFgColor rounded-xl mb-3`}
    >
      <PostUpperSection />
      <PostMiddleSection postData={item} />
      <PostLowerSection
        allowCommentSection={allowCommentSection}
        postData={item}
      />
    </div>
  );
};

const PostUpperSection = () => {
  const desc = `Dwayne Douglas Johnson, also known by his ring name The Rock, is an American actor, producer, businessman. Dwayne Douglas Johnson, also known by his ring name The Rock, is an American actor, producer, businessman.`;

  return (
    <div className="flex items-center justify-between h-auto  text-sm p-2">
      {/* Post Upper Left Side */}
      <div className="flex">
        <img
          src="data:image/jpeg;base64,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"
          alt="profile pic"
          className="w-12 h-12 rounded-full my-auto mr-4"
        />

        <div className="my-auto">
          <div className="font-semibold tracking-wide text-md">
            Samarpan Dasgupta
          </div>
          <div className="special-text dark:text-darkSpecificIconsColor text-lightSpecificIconsColor">
            <Linkify>
              <ShowMoreText
                lines={1}
                more="show more"
                less="show less"
                className="content-css"
                anchorclassName="my-anchor-css-class"
                expanded={false}
              >
                {desc}
              </ShowMoreText>
            </Linkify>
          </div>
          <div className="mt-1 dark:text-darkSpecificIconsColor text-lightSpecificIconsColor">
            10h
          </div>
        </div>
      </div>

      {/* Post Upper Right Side
      <div className="text-lightPrimaryFgColor dark:text-darkPrimaryFgColor ">
        <button className="font-semibold tracking-wide">Connect</button>
      </div> */}
    </div>
  );
};

const PostLowerSection = ({ allowCommentSection, postData }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="p-2 text-xs">
      {/* Engagement View Section */}
      <div className="flex justify-between">
        <div>
          <i className="fas fa-heart" style={{ color: "red" }}></i> 17 Likes
        </div>
        <div>30 Shares</div>
        <div>100 Comments</div>
      </div>

      {/* Post reaction Section */}
      <div className="flex justify-between mt-5 px-5">
        <div>
          <button className="px-2">
            <i className="far fa-heart fa-lg"></i>
            <span className="pl-2 font-semibold">Love</span>
          </button>
        </div>
        <div>
          <button
            className="px-2"
            onClick={() => {
              if (
                location.pathname === "/feed" ||
                location.pathname.endsWith("/profile")
              )
                navigate(`/post/${postData.id}`);
            }}
          >
            <i className="far fa-comment fa-lg"></i>
            <span className="pl-2 font-semibold">Comment</span>
          </button>
        </div>
        {/* <div>
          <button>
            <i className="fas fa-share fa-lg"></i>
            <span className="pl-2 font-semibold">Share</span>
          </button>
        </div> */}
        <div>
          <button>
            <i className="far fa-paper-plane fa-lg"></i>
            <span className="pl-2 font-semibold">Send</span>
          </button>
        </div>
      </div>

      {allowCommentSection && <CommentCollection postData={postData} />}
    </div>
  );
};

const PostMiddleSection = ({ postData }) => {
  if (postData.type === PostTypes.Text) {
    return <TextPost postData={postData} />;
  } else if (postData.type === PostTypes.Image) {
    return <ImagePost postData={postData} />;
  } else if (postData.type === PostTypes.Video) {
    return <VideoPost postData={postData} />;
  } else if (postData.type === PostTypes.Slide) {
    return <SliderPost postData={postData} />;
  } else if (postData.type === PostTypes.Pdf) {
    return <PdfPost postData={postData} />;
  } else if (postData.type === PostTypes.Poll) {
    return <PollPost postData={postData} />;
  }

  return <h1 className="p-2">Not found</h1>;
};

const CommentCollection = ({ postData }) => {
  const [comments, setcomments] = useState(postData.comments);
  const [commentText, setcommentText] = useState("");

  return (
    <div className="mt-5">
      <div className="relative flex z-50 bg-lightBgColor dark:bg-darkBgColor rounded-full mb-3">
        <input
          type="text"
          placeholder="comment here"
          className="rounded-full flex-1 px-6 py-4 text-gray-700 dark:text-white focus:outline-none bg-lightBgColor dark:bg-darkBgColor text-sm"
          value={commentText}
          onChange={(e) => setcommentText(e.target.value)}
        />

        <button
          className="px-10 bg-indigo-600 text-sm rounded-3xl"
          onClick={() => {
            if (commentText.length > 0) {
              setcomments([commentText, ...comments]);
              setcommentText("");
            }
          }}
        >
          Post
        </button>
      </div>

      {comments &&
        comments.map((comment, index) => {
          return (
            <div className="flex mb-2">
              {/* Profile Image */}
              <div className="mr-5">
                <img
                  src="https://avatars.githubusercontent.com/u/66327336?v=4"
                  alt="profile"
                  className="w-12 rounded-full"
                />
              </div>

              {/* Comment With User Details */}
              <div className="bg-lightBgColor dark:bg-darkBgColor mb-2 p-2 rounded-lg text-sm w-full">
                {/* User Details */}
                <div className="font-semibold">Samarpan Dasgupta</div>
                <div className="text-xs">Samarpan Dasgupta</div>

                {/* Post Comment  */}
                <div className="pt-2 special-text">
                  <Linkify>
                    <ShowMoreText
                      lines={3}
                      more="show more"
                      less="show less"
                      className="content-css"
                      anchorclassName="my-anchor-css-class"
                      expanded={false}
                    >
                      {comment}
                    </ShowMoreText>
                  </Linkify>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default CommonPostStyle;
