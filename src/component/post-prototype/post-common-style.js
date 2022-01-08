import { PostTypes } from "../../types/types";
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
import { Fragment, useState } from "react";
import NoProfilePic from "../../image/no_profile_picture.png";
import { insertPostComment, insertPostLove } from "./helper/api_call";
import { infoMessage } from "../main-helper/desktop-notification";
import { getDataFromLocalStorage } from "../main-helper/local-storage-management";

const CommonPostStyle = ({ item, allowCommentSection }) => {
  return (
    <div
      className={`w-full mx-auto bg-lightElevationColor dark:bg-darkElevationColor text-lightSecondaryFgColor dark:text-darkSecondaryFgColor rounded-xl mb-3 pb-1 border-2 border-lightBorderColor dark:border-0`}
    >
      <PostUpperSection
        postHolderData={item?.postHolderData}
        postHolderId={item?.postHolderId}
      />
      <PostMiddleSection postData={item} />
      <PostLowerSection
        allowCommentSection={allowCommentSection}
        postData={item}
      />
    </div>
  );
};

const PostUpperSection = ({ postHolderData, postHolderId }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between h-auto  text-sm p-2 ">
      {/* Post Upper Left Side */}
      <div className="flex">
        <img
          src={postHolderData?.profilePic || NoProfilePic}
          alt="profile pic"
          className="w-12 h-12 rounded-full my-auto mr-4 object-cover"
        />

        <div className="my-auto">
          <div
            className="font-semibold tracking-wide text-base cursor-pointer hover:underline"
            onClick={() => {
              navigate(`/${postHolderId}/profile`, {
                state: {
                  name: postHolderData?.name,
                  profilePic: postHolderData?.profilePic,
                  description: postHolderData?.description,
                },
              });
            }}
          >
            {postHolderData?.name || ""}
          </div>
          <div className="special-text dark:text-darkSpecificIconsColor text-lightSpecificIconsColor text-sm">
            <Linkify>
              <ShowMoreText
                lines={1}
                more="show more"
                less="show less"
                className="content-css"
                anchorClass="my-anchor-css-class"
                expanded={false}
              >
                {postHolderData?.description || ""}
              </ShowMoreText>
            </Linkify>
          </div>
          {/* <div className="mt-1 dark:text-darkSpecificIconsColor text-lightSpecificIconsColor">
            10h
          </div> */}
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
  const { user } = getDataFromLocalStorage();

  const [likes, setlikes] = useState(postData.engagement.likes);
  const comments = postData.engagement.comments;

  const loveReactToPost = () => {
    if (likes.includes(user)) {
      infoMessage("You already love this post", 1500);
      return;
    }

    setlikes([...likes, user]);
    insertPostLove(postData.postId).catch((err) => {
      infoMessage("Could not react this post");
    });
  };

  return (
    <div className="px-2 text-xs">
      {/* Engagement View Section */}

      {(likes.length > 0 || comments.length > 0) && (
        <div className="flex justify-between my-2">
          <div>
            {likes.length > 0 ? (
              <Fragment>
                <i className="fas fa-heart" style={{ color: "red" }}></i>
                &nbsp;&nbsp;
                {likes.length} Likes
              </Fragment>
            ) : (
              ""
            )}
          </div>

          {comments.length > 0 ? (
            <div
              className="cursor-pointer pl-20"
              onClick={() => {
                if (
                  location.pathname === "/feed" ||
                  location.pathname.endsWith("/profile")
                )
                  navigate(`/post/${postData.postId}`, {
                    state: {
                      postData: postData,
                    },
                  });
              }}
            >
              {comments.length} Comments
            </div>
          ) : (
            ""
          )}
        </div>
      )}

      {/* Post reaction Section */}
      <div className="flex justify-between px-5 py-2">
        <div onClick={loveReactToPost}>
          <button className="px-2">
            {likes.includes(user) ? (
              <i className="fas fa-heart fa-lg" style={{ color: "red" }}></i>
            ) : (
              <i className="far fa-heart fa-lg"></i>
            )}
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
                navigate(`/post/${postData.postId}`, {
                  state: {
                    postData: postData,
                  },
                });
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
  const [comments, setcomments] = useState(postData?.engagement.comments || []);
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
              const storedData = getDataFromLocalStorage();
              setcomments([
                {
                  comment: commentText,
                  name: storedData?.name,
                  description: storedData.description,
                  profilePic: storedData?.profilePic,
                },
                ...comments,
              ]);
              setcommentText("");
              insertPostComment(postData.postId, commentText).catch((err) => {
                infoMessage("Could not comment this post");
                setcomments(postData.engagement.comments);
              });
            }
          }}
        >
          Post
        </button>
      </div>

      {comments &&
        comments.map((comment, index) => {
          return (
            <div className="flex mb-2" key={index}>
              {/* Profile Image */}
              <div className="mr-3">
                <img
                  src={comment.profilePic || NoProfilePic}
                  alt="profile"
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>

              {/* Comment With User Details */}
              <div className="bg-lightBgColor dark:bg-darkBgColor mb-2 p-2 rounded-lg text-sm w-full">
                {/* User Details */}
                <div className="font-semibold">{comment.name}</div>
                <div className="text-xs">{comment.description}</div>

                {/* Post Comment  */}
                <div className="pt-2 special-text">
                  <Linkify>
                    <ShowMoreText
                      lines={3}
                      more="show more"
                      less="show less"
                      className="content-css"
                      anchorClass="my-anchor-css-class"
                      expanded={false}
                    >
                      {comment.comment}
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
