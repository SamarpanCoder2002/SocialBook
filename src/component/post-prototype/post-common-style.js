import { ChatMsgTypes, PostTypes, SocketEvents } from "../../types/types";
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
import { Fragment, useEffect, useState } from "react";
import NoProfilePic from "../../image/no_profile_picture.png";
import { insertPostComment, insertPostLove } from "./helper/api_call";
import { infoMessage, successMessage } from "../common/desktop-notification";
import { getDataFromLocalStorage } from "../common/local-storage-management";
import { useSelector } from "react-redux";
import {
  getAllChatConnections,
  sendMessageToSpecificConnection,
} from "../messaging-section/helper/api_call";
import LoadingBar from "../loading/loadingbar";
import Waiting from "../common/waiting";

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
  const [showModal, setshowModal] = useState(false);
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
              className="cursor-pointer pl-20 hover:underline"
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
              {comments.length} {comments.length > 1 ? " Comments" : " Comment"}
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
          <button onClick={() => setshowModal(true)}>
            <i className="far fa-paper-plane fa-lg"></i>
            <span className="pl-2 font-semibold">Send</span>
          </button>
        </div>

        {showModal && <Modal setshowModal={setshowModal} postData={postData} />}
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
  const { name, description, profilePic, user } = useSelector((state) => state);
  const navigate = useNavigate();

  const onEnterOnCommentSection = () => {
    if (!commentText || !commentText.length) return;

    //const storedData = getDataFromLocalStorage();
    setcomments([
      {
        uid: user,
        comment: commentText,
        name: name,
        description: description,
        profilePic: profilePic,
      },
      ...comments,
    ]);
    setcommentText("");
    insertPostComment(postData.postId, commentText).catch((err) => {
      infoMessage("Could not comment this post");
      setcomments(postData.engagement.comments);
    });
  };

  return (
    <div className="mt-5">
      <div className="relative flex z-50 bg-lightBgColor dark:bg-darkBgColor rounded-full mb-3">
        <input
          type="text"
          placeholder="comment here"
          className="rounded-full flex-1 px-6 py-4 text-gray-700 dark:text-white focus:outline-none bg-lightBgColor dark:bg-darkBgColor text-sm"
          value={commentText}
          onChange={(e) => setcommentText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") onEnterOnCommentSection();
          }}
        />
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
                <div
                  className="font-semibold hover:underline cursor-pointer"
                  onClick={() =>
                    navigate(`/${comment.uid}/profile`, {
                      state: {
                        name: comment.name,
                        profilePic: comment.profilePic,
                        description: comment.description,
                      },
                    })
                  }
                >
                  {comment.name}
                </div>
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

const Modal = ({ setshowModal, postData }) => {
  const [chatConnections, setchatConnections] = useState([]);
  const { socket, user } = useSelector((state) => state);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    if (chatConnections && chatConnections.length) return;

    getAllChatConnections().then((data) => {
      if (!data) return;

      data.forEach((connection) => {
        setchatConnections((prev) => [
          ...prev,
          { ...connection, checked: false },
        ]);
      });
    });
  }, []);

  const sendPostMessage = () => {
    const newConnections = [...chatConnections];
    const checkedConnections = newConnections.filter(
      (connection) => connection.checked
    );

    if (!checkedConnections.length) return;

    setisLoading(true);

    for (let index in checkedConnections) {
      const { partnerId, chatBoxId } = checkedConnections[index];

      sendMessageToSpecificConnection(
        partnerId,
        `${window.location.origin}/post/${postData.postId}`,
        chatBoxId,
        ChatMsgTypes.text
      );

      socket.emit(SocketEvents.sendChatMessage, {
        chatBoxId: chatBoxId,
        receiverId: partnerId,
        senderId: user,
        message: `${window.location.origin}/post/${postData.postId}`,
        type: ChatMsgTypes.text,
        time: Date.now(),
      });
    }

    setTimeout(
      () => {
        setisLoading(false);
        setshowModal(false);
        successMessage("Post Send to Connections", 1200);
      },
      checkedConnections.length <= 4 ? 1000 * checkedConnections.length : 4000
    );
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none m-4 md:m-0">
        <div className="relative w-1/2 lg:w-1/4 my-6 max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-lightBgColor dark:bg-darkBgColor outline-none focus:outline-none">
            {/*body*/}
            <div>
              <LoadingBar isLoading={isLoading} />
            </div>
            <div className="relative py-2 flex-auto min-h-[35vh] max-h-[70vh] overflow-y-scroll scroller">
              {(chatConnections &&
                chatConnections.length &&
                chatConnections.map((profile, index) => {
                  return (
                    <ConnectedProfile
                      profileConnection={profile}
                      key={index}
                      index={index}
                      setchatConnections={setchatConnections}
                      chatConnections={chatConnections}
                    />
                  );
                })) || (
                <Waiting
                  showName={"Chat Connections Fetching"}
                  largeScreenPadding="lg:px-20"
                />
              )}
            </div>
            {/*footer*/}
            {!isLoading && (
              <div className="flex items-center justify-between p-3 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold px-2 py-1 md:px-6 md:py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150  tracking-wider"
                  type="button"
                  onClick={() => setshowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-[#15c429] text-white active:bg-emerald-600 font-bold text-sm px-2 py-1 md:px-6 md:py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 tracking-wider"
                  type="button"
                  onClick={sendPostMessage}
                >
                  Send
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

const ConnectedProfile = ({
  profileConnection,
  index,
  setchatConnections,
  chatConnections,
}) => {
  const { darkMode } = useSelector((state) => state);

  const checkOrUncheckManagement = () => {
    const newConnections = [...chatConnections];
    newConnections[index].checked = !newConnections[index].checked;
    setchatConnections(newConnections);
  };

  return (
    <div
      className={`${
        darkMode ? "hover:bg-darkCardColor" : "hover:bg-lightCardColor"
      } flex items-center mb-3 justify-between cursor-pointer px-2 py-1`}
      onClick={checkOrUncheckManagement}
    >
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-lightCardColor dark:bg-darkCardColor">
          <img
            src={profileConnection.partnerProfilePic || NoProfilePic}
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ml-3">
          <div className="text-md font-semibold dark:font-normal text-lightPostTextStyleColor dark:text-darkPostTextStyleColor">
            {profileConnection.partnerName}
          </div>
        </div>
      </div>

      <div>
        {profileConnection.checked ? (
          <i
            className="far fa-check-circle fa-lg"
            style={{ color: "#46F80C" }}
          ></i>
        ) : (
          <i className="far fa-circle fa-lg"></i>
        )}
      </div>
    </div>
  );
};

export default CommonPostStyle;
