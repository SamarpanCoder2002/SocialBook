import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { ChatMsgTypes, MessageHolder, SocketEvents } from "../../types/types";
import BaseCommonPart from "../page-builder/base";
import Linkify from "react-linkify/dist/components/Linkify";
import {
  getAllChatConnections,
  getAllChatHistoryMessages,
  sendMessageToSpecificConnection,
} from "./helper/api_call";
import NoProfilePic from "../../image/no_profile_picture.png";
import { useNavigate, useLocation } from "react-router-dom";
import Waiting from "../common/waiting";

const MessageComponent = () => {
  const [chatConnectionCollections, setchatConnectionCollections] = useState(
    []
  );
  const [messages, setmessages] = useState([]);
  const { darkMode, socket } = useSelector((state) => state);
  const [isEligibleToOpenChatBox, setisEligibleToOpenChatBox] = useState(0);
  const [clickedChatProfile, setclickedChatProfile] = useState(-1);
  const [isLoading, setisLoading] = useState(true);
  const [isInternalLoading, setisInternalLoading] = useState(false);
  const location = useLocation();
  const partnerIdQuery = new URLSearchParams(location.search).get("partnerId");

  const [latestMessage, setlatestMessage] = useState();

  useEffect(() => {
    getAllChatConnections()
      .then(async (data) => {
        if (!data) return;
        setchatConnectionCollections(data);

        const chatFilteredConnection = data.filter(
          (chat) => chat.partnerId === partnerIdQuery
        );

        if (partnerIdQuery && chatFilteredConnection?.length > 0) {
          setclickedChatProfile(chatFilteredConnection[0].chatBoxId);
          setisEligibleToOpenChatBox(chatFilteredConnection[0]);
        } else {
          setclickedChatProfile(data[0].chatBoxId);
          setisEligibleToOpenChatBox(data[0]);
        }
        setisLoading(false);
      })
      .catch((err) => setisLoading(false));
  }, [partnerIdQuery]);

  useEffect(() => {
    socket &&
      socket.on(SocketEvents.acceptIncomingChatMessage, (messageData) =>
        setlatestMessage(messageData)
      );
  }, [socket]);

  useEffect(() => {
    if (!latestMessage) return;

    const { message, senderId, type } = latestMessage;
    const currentPartnerId = isEligibleToOpenChatBox?.partnerId;
    const currTime = Date.now();

    if (currentPartnerId !== senderId) {
    } else {
      setmessages((prevMessages) => [
        ...prevMessages,
        {
          holder: MessageHolder.partnerUser,
          message: message,
          type: type,
          time: currTime,
        },
      ]);
    }

    setlatestMessage();
  }, [latestMessage, isEligibleToOpenChatBox]);

  return isLoading ? (
    <Waiting />
  ) : (
    <BaseCommonPart>
      <div className="h-[92vh] bg-lightBgColor dark:bg-darkBgColor text-lightPostTextStyleColor dark:text-darkPostTextStyleColor overflow-y-scroll suggested-profiles-container shadow-lg shadow-zinc-900">
        <div className="px-2 xl:px-60 2xl:px-96 py-1 w-full pb-2">
          <div className="bg-lightElevationColor dark:bg-darkElevationColor mt-3 rounded-lg flex w-full shadow-lg ">
            {chatConnectionCollections.length ? (
              <>
                <ProfileConnectionCollection
                  chatConnectionCollections={chatConnectionCollections}
                  darkMode={darkMode}
                  isEligibleToOpenChatBox={isEligibleToOpenChatBox}
                  setisEligibleToOpenChatBox={setisEligibleToOpenChatBox}
                  clickedChatProfile={clickedChatProfile}
                  setclickedChatProfile={setclickedChatProfile}
                  setmessages={setmessages}
                  setisLoading={setisInternalLoading}
                />

                <ChatBoxConfig
                  isEligibleToOpenChatBox={isEligibleToOpenChatBox}
                  setisEligibleToOpenChatBox={setisEligibleToOpenChatBox}
                  messages={messages}
                  setmessages={setmessages}
                  isLoading={isInternalLoading}
                  setisLoading={setisInternalLoading}
                />
              </>
            ) : (
              <NoChatConnectionsScreen />
            )}
          </div>
        </div>
      </div>
    </BaseCommonPart>
  );
};

const NoChatConnectionsScreen = () => {
  const navigate = useNavigate();

  const switchToConnectionScreen = () => {
    navigate("/connection", {
      state: {
        prevDesignSet: { prevIndex: 1 },
      },
    });
  };

  return (
    <div className="w-full h-[20vh] flex justify-center items-center">
      <div>
        <div className="text-xl text-center">😔 No Chat Connections</div>
        <div
          className="pt-1 text-blue-400 underline cursor-pointer"
          onClick={switchToConnectionScreen}
        >
          Message your friends to start chatting
        </div>
      </div>
    </div>
  );
};

const ProfileConnectionCollection = ({
  chatConnectionCollections,
  darkMode,
  isEligibleToOpenChatBox,
  setisEligibleToOpenChatBox,
  clickedChatProfile,
  setclickedChatProfile,
  setmessages,
  setisLoading,
}) => {
  return (
    <div
      className={`h-[90vh] ${
        isEligibleToOpenChatBox
          ? "hidden w-full sm:w-1/3 md:w-2/5 sm:block"
          : "w-full sm:w-1/3 md:w-2/5"
      } overflow-y-scroll scroller pt-10 pb-5`}
    >
      {chatConnectionCollections.map((chat, index) => {
        return (
          <div
            key={chat.chatBoxId}
            className={`${
              darkMode ? "hover:bg-darkCardColor" : "hover:bg-lightCardColor"
            } flex items-center p-3 transition-all duration-300 cursor-pointer justify-start lg:justify-between focus:outline-none focus:ring focus:ring-violet-300 ${
              clickedChatProfile === chat.chatBoxId
                ? darkMode
                  ? "bg-darkCardColor"
                  : "bg-lightCardColor"
                : darkMode
                ? "bg-darkElevationColor"
                : "bg-lightElevationColor"
            }`}
            onClick={() => {
              setclickedChatProfile(chat.chatBoxId);
              setisEligibleToOpenChatBox(chat);
              setmessages([]);
              setisLoading(true);
            }}
          >
            <div className="flex">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
                  src={chat.partnerProfilePic || NoProfilePic}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-3">
                <div className="font-semibold text-lg">{chat.partnerName}</div>
                <div className="text-sm">Hi, How are you?</div>
              </div>
            </div>

            {/* <div className="hidden lg:block text-sm">Dec 9</div> */}
          </div>
        );
      })}
    </div>
  );
};

const ChatBoxConfig = ({
  isEligibleToOpenChatBox,
  setisEligibleToOpenChatBox,
  messages,
  setmessages,
  isLoading,
  setisLoading,
}) => {
  const [messageWritten, setmessageWritten] = useState("");
  const [showModal, setshowModal] = useState(false);
  const [selectedImage, setselectedImage] = useState("");

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    isEligibleToOpenChatBox &&
      getAllChatHistoryMessages(isEligibleToOpenChatBox?.chatBoxId).then(
        (prevMsgCollection) => {
          setisLoading(false);

          if (!prevMsgCollection || !prevMsgCollection.length) return;
          setmessages([...prevMsgCollection]);
        }
      );
  }, [isEligibleToOpenChatBox]);

  const inputFile = useRef(null);

  return isLoading ? (
    <div className="w-full">
      <Waiting
        showName="Hang tight... Data Fetching in Progress "
        largeScreenPadding="lg:px-72"
        lightBgColor="bg-lightElevationColor"
        darkBgColor="bg-darkElevationColor"
      />
    </div>
  ) : (
    <div
      className={`h-[90vh] ${
        isEligibleToOpenChatBox
          ? "w-full sm:w-2/3 md:w-4/5"
          : "hidden w-full sm:w-2/3 md:w-4/5 sm:block"
      }`}
    >
      {/* Upper Section Heading */}
      <ChatBoxUpperSection
        setisEligibleToOpenChatBox={setisEligibleToOpenChatBox}
        isEligibleToOpenChatBox={isEligibleToOpenChatBox}
      />

      {/* Chat Messages Collection */}
      <div className="h-[76%] lg:h-[78%] overflow-y-auto scroller p-3">
        <ChatMessagesCollection
          messages={messages}
          messagesEndRef={messagesEndRef}
          partnerData={isEligibleToOpenChatBox}
        />
      </div>

      {/* Lower Message Input Section */}
      <ChatBoxLowerSection
        inputFile={inputFile}
        setselectedImage={setselectedImage}
        setshowModal={setshowModal}
        messageWritten={messageWritten}
        setmessageWritten={setmessageWritten}
        setmessages={setmessages}
        messages={messages}
        isEligibleToOpenChatBox={isEligibleToOpenChatBox}
      />

      {showModal && (
        <Modal
          selectedImage={selectedImage}
          setshowModal={setshowModal}
          setmessages={setmessages}
          messages={messages}
          isEligibleToOpenChatBox={isEligibleToOpenChatBox}
        />
      )}
    </div>
  );
};

const ChatBoxUpperSection = ({
  setisEligibleToOpenChatBox,
  isEligibleToOpenChatBox,
}) => {
  const navigate = useNavigate();

  const partnerProfileDescription = isEligibleToOpenChatBox?.partnerDescription
    .toString()
    .split(" ");

  return (
    <div className="w-full bg-lightElevationColor dark:bg-darkElevationColor p-3 shadow-sm shadow-slate-300 dark:shadow-slate-600 rounded-tr-md flex">
      <div
        onClick={() => setisEligibleToOpenChatBox()}
        className="p-3 cursor-pointer sm:hidden"
      >
        <i className="fas fa-arrow-left"></i>
      </div>
      <div className="pr-3 ">
        <img
          src={isEligibleToOpenChatBox?.partnerProfilePic || NoProfilePic || ""}
          alt="profile"
          className="w-12 h-12 object-cover rounded-full"
        />
      </div>
      <div>
        <div
          className="text-base hover:underline cursor-pointer"
          onClick={() =>
            navigate(`/${isEligibleToOpenChatBox?.partnerId}/profile`)
          }
        >
          {isEligibleToOpenChatBox?.partnerName || ""}
        </div>
        <div className="text-xs w-10/12">
          {`${
            partnerProfileDescription
              ? partnerProfileDescription?.slice(0, 25).join(" ")
              : ""
          }${partnerProfileDescription?.length > 25 ? "..." : ""}` || ""}
        </div>
      </div>
    </div>
  );
};

const ChatBoxLowerSection = ({
  inputFile,
  setselectedImage,
  setshowModal,
  messageWritten,
  setmessageWritten,
  setmessages,
  messages,
  isEligibleToOpenChatBox,
}) => {
  const { socket, user } = useSelector((state) => state);

  const sendTextMessage = () => {
    if (messageWritten === "") return;
    const currTime = Date.now();

    setmessages([
      ...messages,
      {
        holder: MessageHolder.currentUser,
        message: messageWritten,
        type: ChatMsgTypes.text,
        time: currTime,
      },
    ]);

    const { partnerId, chatBoxId } = isEligibleToOpenChatBox;

    socket.emit(SocketEvents.sendChatMessage, {
      chatBoxId: chatBoxId,
      receiverId: partnerId,
      senderId: user,
      message: messageWritten,
      type: ChatMsgTypes.text,
    });

    sendMessageToSpecificConnection(
      partnerId,
      messageWritten,
      chatBoxId,
      ChatMsgTypes.text
    );

    setmessageWritten("");
  };

  const sendMessageonEnterPress = (e) => e.key === "Enter" && sendTextMessage();
  return (
    <div className="w-full mt-3 px-3 py-auto flex">
      <div>
        <input
          type="file"
          id="file"
          accept="image/*"
          ref={inputFile}
          style={{ display: "none" }}
          onChange={(e) => {
            setselectedImage(e.target.files[0]);
            setshowModal(true);
          }}
        />

        <button
          className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 mr-3 text-zinc-600 dark:text-white shadow-md dark:shadow-sm shadow-slate-400 dark:shadow-sky-200"
          onClick={() => {
            inputFile.current.click();
          }}
        >
          <i className="fas fa-camera"></i>
        </button>
      </div>

      <input
        type="text"
        placeholder="Write a message..."
        value={messageWritten}
        onChange={(e) => setmessageWritten(e.target.value)}
        className="rounded-full w-full flex-1 px-6 py-4 text-gray-700 dark:text-white focus:outline-none bg-[#E6E6E6] dark:bg-darkBgColor text-sm mr-3"
        onKeyPress={sendMessageonEnterPress}
      />
      <button
        className="bg-[#3DBE29] dark:bg-gray-800 rounded-full w-10 h-10 my-auto text-white hover:scale-110 hover:duration-300  shadow-md dark:shadow-sm shadow-slate-400 dark:shadow-sky-200"
        onClick={sendTextMessage}
      >
        <i className="far fa-paper-plane"></i>
      </button>
    </div>
  );
};

const ChatMessagesCollection = ({ messages, messagesEndRef, partnerData }) => {
  return (
    <div>
      {messages.map((message, index) => {
        return (
          <div key={index}>
            <CommonMessageFormat
              messagesEndRef={messagesEndRef}
              message={message}
              partnerData={partnerData}
            />
          </div>
        );
      })}
    </div>
  );
};

const CommonMessageFormat = ({ message, messagesEndRef, partnerData }) => {
  const { name, profilePic, user } = useSelector((state) => state);

  return (
    <div className=" mb-3 flex" ref={messagesEndRef}>
      <div>
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img
            src={
              message.holder === MessageHolder.currentUser ||
              message.holder === user
                ? profilePic
                : partnerData?.partnerProfilePic
            }
            alt={`${
              message.holder === MessageHolder.currentUser ||
              message.holder === user
                ? "my-profile-pic"
                : "partner-profile-pic"
            }`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="ml-3 w-5/6">
        <div className="font-semibold text-md">
          {message.holder === MessageHolder.currentUser ||
          message.holder === user
            ? name
            : partnerData?.partnerName}
        </div>

        {message.type === ChatMsgTypes.text ? (
          <TextMessage message={message} />
        ) : (
          <ImageMessage message={message} />
        )}
      </div>
    </div>
  );
};

const TextMessage = ({ message }) => {
  return (
    <Linkify>
      <div className="text-sm special-text">{message.message}</div>
    </Linkify>
  );
};

const ImageMessage = ({ message }) => {
  return (
    <div className="w-10/12 md:w-1/2 mt-1">
      <img
        src={message.message}
        alt="sent-imag"
        className="border-4 rounded-2xl border-slate-300 dark:border-white cursor-pointer"
        onClick={() => window.open(message.message)}
      />
    </div>
  );
};

const Modal = ({
  selectedImage,
  setshowModal,
  setmessages,
  messages,
  isEligibleToOpenChatBox,
}) => {
  const { socket, user } = useSelector((state) => state);
  const currTime = Date.now();

  const sendImgMessage = () => {
    setmessages([
      ...messages,
      {
        holder: MessageHolder.currentUser,
        message: URL.createObjectURL(selectedImage),
        type: ChatMsgTypes.image,
        time: currTime,
      },
    ]);

    setshowModal(false);
    const { partnerId, chatBoxId } = isEligibleToOpenChatBox;

    sendMessageToSpecificConnection(
      partnerId,
      selectedImage,
      chatBoxId,
      ChatMsgTypes.image
    ).then((imgDataLink) => {
      if (!imgDataLink) return;

      const { partnerId, chatBoxId } = isEligibleToOpenChatBox;

      socket.emit(SocketEvents.sendChatMessage, {
        chatBoxId: chatBoxId,
        receiverId: partnerId,
        senderId: user,
        message: imgDataLink,
        type: ChatMsgTypes.image,
      });
    });
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none m-4 md:m-0">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-lightBgColor dark:bg-darkBgColor outline-none focus:outline-none">
            {/*body*/}
            <div className="relative p-2 flex-auto">
              <img src={URL.createObjectURL(selectedImage)} alt="profile" />
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-3 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setshowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={sendImgMessage}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default MessageComponent;
