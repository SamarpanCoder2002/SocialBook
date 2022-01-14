import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { ChatMsgTypes, MessageHolder } from "../../types/types";
import BaseCommonPart from "../page-builder/base";
import Linkify from "react-linkify/dist/components/Linkify";
import { getAllChatConnections } from "./helper/api_call";
import NoProfilePic from "../../image/no_profile_picture.png";
import { useNavigate } from "react-router-dom";

const MessageComponent = () => {
  const [chatCollections, setchatCollections] = useState([]);
  const [messages, setmessages] = useState([]);

  const { darkMode } = useSelector((state) => state);
  const [isEligibleToOpenChatBox, setisEligibleToOpenChatBox] = useState();
  const [clickedChatProfile, setclickedChatProfile] = useState(-1);

  useEffect(() => {
    getAllChatConnections().then((data) => {
      if (!data) return;

      setchatCollections(data);
      setclickedChatProfile(data[0].chatBoxId);
      setisEligibleToOpenChatBox(data[0]);
    });
  }, []);

  return (
    <BaseCommonPart>
      <div className="h-[92vh] bg-lightBgColor dark:bg-darkBgColor text-lightPostTextStyleColor dark:text-darkPostTextStyleColor overflow-y-scroll suggested-profiles-container shadow-lg shadow-zinc-900">
        <div className="px-2 xl:px-60 2xl:px-96 py-1 w-full pb-2">
          <div className="bg-lightElevationColor dark:bg-darkElevationColor mt-3 rounded-lg flex w-full shadow-lg ">
            {/* Left Side */}
            <ProfileConnectionCollection
              chatCollections={chatCollections}
              darkMode={darkMode}
              isEligibleToOpenChatBox={isEligibleToOpenChatBox}
              setisEligibleToOpenChatBox={setisEligibleToOpenChatBox}
              clickedChatProfile={clickedChatProfile}
              setclickedChatProfile={setclickedChatProfile}
              setmessages={setmessages}
            />

            {/* Right Side */}
            <AllChatMessages
              isEligibleToOpenChatBox={isEligibleToOpenChatBox}
              setisEligibleToOpenChatBox={setisEligibleToOpenChatBox}
              messages={messages}
              setmessages={setmessages}
            />
          </div>
        </div>
      </div>
    </BaseCommonPart>
  );
};

const ProfileConnectionCollection = ({
  chatCollections,
  darkMode,
  isEligibleToOpenChatBox,
  setisEligibleToOpenChatBox,
  clickedChatProfile,
  setclickedChatProfile,
  setmessages
}) => {

  return (
    <div
      className={`h-[90vh] ${
        isEligibleToOpenChatBox
          ? "hidden sm:w-1/2 md:w-2/5 sm:block"
          : "w-full sm:w-1/2 md:w-2/5"
      } overflow-y-scroll scroller pt-10 pb-5`}
    >
      {chatCollections.map((chat, index) => {
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

const AllChatMessages = ({
  isEligibleToOpenChatBox,
  setisEligibleToOpenChatBox,
  messages,
  setmessages
}) => {
  const [messageWritten, setmessageWritten] = useState("");
  const [preference, setpreference] = useState(MessageHolder.currentUser);
  const [showModal, setshowModal] = useState(false);
  const [selectedImage, setselectedImage] = useState("");

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const inputFile = useRef(null);

  return (
    <div
      className={`h-[90vh] ${
        isEligibleToOpenChatBox
          ? "sm:w-1/2 md:w-4/5"
          : "hidden sm:w-1/2 md:w-4/5 sm:block"
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
        preference={preference}
        setpreference={setpreference}
      />

      {showModal && (
        <Modal
          selectedImage={selectedImage}
          setshowModal={setshowModal}
          setmessages={setmessages}
          messages={messages}
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
  preference,
  setpreference,
}) => {
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
            setselectedImage(URL.createObjectURL(e.target.files[0]));
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
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            if (messageWritten !== "") {
              setmessages([
                ...messages,
                {
                  holder: preference,
                  msg: messageWritten,
                  type: ChatMsgTypes.text,
                },
              ]);
              setpreference(MessageHolder.currentUser);
              setmessageWritten("");
            }
          }
        }}
      />
      <button
        className="bg-[#3DBE29] dark:bg-gray-800 rounded-full w-10 h-10 my-auto text-white hover:scale-110 hover:duration-300  shadow-md dark:shadow-sm shadow-slate-400 dark:shadow-sky-200"
        onClick={() => {
          if (messageWritten !== "") {
            setmessages([
              ...messages,
              {
                holder: preference,
                msg: messageWritten,
                type: ChatMsgTypes.text,
              },
            ]);
            setpreference(MessageHolder.currentUser);
            setmessageWritten("");
          }
        }}
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
          <CommonMessageFormat
            key={index}
            messagesEndRef={messagesEndRef}
            message={message}
            partnerData={partnerData}
          />
        );
      })}
    </div>
  );
};

const CommonMessageFormat = ({ message, messagesEndRef, partnerData }) => {
  const { name, profilePic } = useSelector((state) => state);

  return (
    <div className=" mb-3 flex" ref={messagesEndRef}>
      <div>
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img
            src={
              message.holder === MessageHolder.currentUser
                ? profilePic
                : partnerData?.partnerProfilePic
            }
            alt={`${
              message.holder === MessageHolder.currentUser
                ? "my-profile-pic"
                : "partner-profile-pic"
            }`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="ml-3 w-5/6">
        <div className="font-semibold text-md">
          {message.holder === MessageHolder.currentUser
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
      <div className="text-sm special-text">{message.msg}</div>
    </Linkify>
  );
};

const ImageMessage = ({ message }) => {
  return (
    <div className="w-10/12 md:w-1/2 mt-1">
      <img
        src={message.msg}
        alt="sentimag"
        className="border-4 rounded-2xl border-slate-300 dark:border-white cursor-pointer"
        onClick={() => window.open(message.msg)}
      />
    </div>
  );
};

const Modal = ({ selectedImage, setshowModal, setmessages, messages }) => {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none m-4 md:m-0">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-lightBgColor dark:bg-darkBgColor outline-none focus:outline-none">
            {/*body*/}
            <div className="relative p-2 flex-auto">
              <img src={selectedImage} alt="profile" />
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
                onClick={() => {
                  setmessages([
                    ...messages,
                    {
                      holder: 0,
                      msg: selectedImage,
                      type: ChatMsgTypes.image,
                    },
                  ]);
                  setshowModal(false);
                }}
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
