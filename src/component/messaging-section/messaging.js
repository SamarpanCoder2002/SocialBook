import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { ChatMsgTypes } from "../../types/posttypes";
import BaseCommonPart from "../base";

const MessageComponent = () => {
  const chatCollections = [
    {
      id: 1,
      name: "John Doe",
      profilePic:
        "https://www.newsbox.pk/wp-content/uploads/2019/08/the-rock-2.jpg",
    },
    {
      id: 1,
      name: "John Doe",
      profilePic:
        "https://www.newsbox.pk/wp-content/uploads/2019/08/the-rock-2.jpg",
    },
    {
      id: 1,
      name: "John Doe",
      profilePic:
        "https://www.newsbox.pk/wp-content/uploads/2019/08/the-rock-2.jpg",
    },
    {
      id: 1,
      name: "John Doe",
      profilePic:
        "https://www.newsbox.pk/wp-content/uploads/2019/08/the-rock-2.jpg",
    },
    {
      id: 1,
      name: "John Doe",
      profilePic:
        "https://www.newsbox.pk/wp-content/uploads/2019/08/the-rock-2.jpg",
    },
    {
      id: 1,
      name: "John Doe",
      profilePic:
        "https://www.newsbox.pk/wp-content/uploads/2019/08/the-rock-2.jpg",
    },
    {
      id: 1,
      name: "John Doe",
      profilePic:
        "https://www.newsbox.pk/wp-content/uploads/2019/08/the-rock-2.jpg",
    },
    {
      id: 1,
      name: "John Doe",
      profilePic:
        "https://www.newsbox.pk/wp-content/uploads/2019/08/the-rock-2.jpg",
    },
    {
      id: 1,
      name: "John Doe",
      profilePic:
        "https://www.newsbox.pk/wp-content/uploads/2019/08/the-rock-2.jpg",
    },
    {
      id: 1,
      name: "John Doe",
      profilePic:
        "https://www.newsbox.pk/wp-content/uploads/2019/08/the-rock-2.jpg",
    },
    {
      id: 1,
      name: "John Doe",
      profilePic:
        "https://www.newsbox.pk/wp-content/uploads/2019/08/the-rock-2.jpg",
    },
    {
      id: 1,
      name: "John Doe",
      profilePic:
        "https://www.newsbox.pk/wp-content/uploads/2019/08/the-rock-2.jpg",
    },
    {
      id: 1,
      name: "John Doe",
      profilePic:
        "https://www.newsbox.pk/wp-content/uploads/2019/08/the-rock-2.jpg",
    },
    {
      id: 1,
      name: "John Doe",
      profilePic:
        "https://www.newsbox.pk/wp-content/uploads/2019/08/the-rock-2.jpg",
    },
    {
      id: 1,
      name: "John Doe",
      profilePic:
        "https://www.newsbox.pk/wp-content/uploads/2019/08/the-rock-2.jpg",
    },
    {
      id: 1,
      name: "John Doe",
      profilePic:
        "https://www.newsbox.pk/wp-content/uploads/2019/08/the-rock-2.jpg",
    },
  ];

  const { darkMode } = useSelector((state) => state);

  return (
    <BaseCommonPart>
      <div className="h-[92vh] bg-lightBgColor dark:bg-darkBgColor text-lightPostTextStyleColor dark:text-darkPostTextStyleColor overflow-y-scroll suggested-profiles-container shadow-lg shadow-zinc-900">
        <div className="px-2 lg:px-60 2xl:px-96 py-1 w-full pb-2">
          <div className="bg-lightElevationColor dark:bg-darkElevationColor mt-3 rounded-lg flex w-full shadow-lg ">
            {/* Left Side */}
            <ProfileConnectionCollection
              chatCollections={chatCollections}
              darkMode={darkMode}
            />

            {/* Right Side */}
            <AllChatMessages darkMode={darkMode} />
          </div>
        </div>
      </div>
    </BaseCommonPart>
  );
};

const ProfileConnectionCollection = ({ chatCollections, darkMode }) => {
  return (
    <div className="h-[90vh] w-full sm:w-1/3 overflow-y-scroll scroller ">
      {chatCollections.map((chat) => {
        return (
          <div
            className={`${
              darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"
            } flex items-center p-3 transition-all duration-300 cursor-pointer justify-center md:justify-start lg:justify-between`}
          >
            <div className="flex">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
                  src={chat.profilePic}
                  alt="profile"
                  className="w-full h-full"
                />
              </div>
              <div className="ml-3">
                <div className="font-semibold text-lg">{chat.name}</div>
                <div className="text-sm">Hi, How are you?</div>
              </div>
            </div>

            <div className="hidden lg:block text-sm">Dec 9</div>
          </div>
        );
      })}
    </div>
  );
};

const AllChatMessages = ({ darkMode }) => {
  const desc =
    "Explorer | Freelance Full Stack Developer | Content Creator 💻  Building Dots to Connect Later! 💡";

  const [messages, setmessages] = useState([
    {
      msgOf: 0,
      msg: "Hi, How are you?Hi, How are you?Hi, How are you?Hi, How are you?Hi, How are you?Hi, How are you?Hi, How are you?Hi, How are you?Hi, How are you?Hi, How are you?Hi, How are you?Hi, How are you?Hi, How are you?Hi, How are you?",
      type: ChatMsgTypes.text,
    },
    {
      msgOf: 1,
      msg: "https://images.pexels.com/photos/3763771/pexels-photo-3763771.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      type: ChatMsgTypes.image,
    },
  ]);
  const [messageWritten, setmessageWritten] = useState("");
  const [preference, setpreference] = useState(0);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="h-[90vh] hidden sm:block sm:w-2/3">
      <div className="w-full bg-lightElevationColor dark:bg-darkElevationColor p-3 shadow-sm shadow-slate-300 dark:shadow-slate-600 rounded-tr-md">
        <div className="text-base">Samarpan Dasgupta</div>
        <div className="text-xs">{desc}</div>
      </div>

      <div className="h-[76%] lg:h-[78%] overflow-y-auto scroller p-3">
        <ChatMessagesCollection
          messages={messages}
          messagesEndRef={messagesEndRef}
        />
      </div>

      <div className="w-full mt-3 px-3 py-auto flex">
        <button
          className="bg-[#E6E6E6] dark:bg-darkBgColor rounded-full w-10 h-10 my-auto text-white hover:scale-110 hover:duration-300 mr-3 shadow-md dark:shadow-sm shadow-slate-400 dark:shadow-sky-200"
          onClick={() => {
            if (messageWritten !== "") {
              setmessages([
                ...messages,
                {
                  msgOf: preference,
                  msg: messageWritten,
                  type: ChatMsgTypes.text,
                },
              ]);
              setpreference(preference === 0 ? 1 : 0);
              setmessageWritten("");
            }
          }}
        >
          <i
            class="fas fa-camera"
            style={{ color: darkMode ? "#fff" : "rgb(55, 65, 81)" }}
          ></i>
        </button>

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
                    msgOf: preference,
                    msg: messageWritten,
                    type: ChatMsgTypes.text,
                  },
                ]);
                setpreference(preference === 0 ? 1 : 0);
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
                  msgOf: preference,
                  msg: messageWritten,
                  type: ChatMsgTypes.text,
                },
              ]);
              setpreference(preference === 0 ? 1 : 0);
              setmessageWritten("");
            }
          }}
        >
          <i class="far fa-paper-plane"></i>
        </button>
      </div>

      {/* <Modal /> */}
    </div>
  );
};

const Modal = () => {
  return (
    <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Modal Title
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    ///onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    I always felt like I could do anything. That’s the main
                    thing people are controlled by! Thoughts- their perception
                    of themselves! They're slowed down by their perception of
                    themselves. If you're taught you can’t do anything, you
                    won’t do anything. I was taught I could do everything.
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    //onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    //onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      );
  
}

const ChatMessagesCollection = ({ messages, messagesEndRef }) => {
  const participantCollection = {
    0: {
      profile:
        "https://www.newsbox.pk/wp-content/uploads/2019/08/the-rock-2.jpg",
      name: "Samarpan Dasgupta",
    },
    1: {
      profile:
        "data:image/jpeg;base64,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",
      name: "Sukannya Paul",
    },
  };

  return (
    <div>
      {messages.map((message, index) => {
        console.log(participantCollection[message.msgOf].profile);
        if (message.type === ChatMsgTypes.text)
          return (
            <TextMessage
              messagesEndRef={messagesEndRef}
              participantCollection={participantCollection}
              message={message}
            />
          );
        return (
          <ImageMessage
            messagesEndRef={messagesEndRef}
            participantCollection={participantCollection}
            message={message}
          />
        );
      })}
    </div>
  );
};

const TextMessage = ({ messagesEndRef, participantCollection, message }) => {
  return (
    <div className=" mb-3 flex" ref={messagesEndRef}>
      <div>
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img
            src={participantCollection[message.msgOf].profile}
            alt="profile"
            className="w-full h-full"
          />
        </div>
      </div>
      <div className="ml-3 w-5/6">
        <div className="font-semibold text-md">
          {participantCollection[message.msgOf].name}
        </div>
        <div className="text-sm">{message.msg}</div>
      </div>
    </div>
  );
};

const ImageMessage = ({ messagesEndRef, participantCollection, message }) => {
  return (
    <div className="flex mb-3" ref={messagesEndRef}>
      <div>
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img
            src={participantCollection[message.msgOf].profile}
            alt="profile"
            className="w-12 h-12"
          />
        </div>
      </div>
      <div className="ml-3">
        <div className="font-semibold text-md">
          {participantCollection[message.msgOf].name}
        </div>

        <div className="w-10/12 md:w-1/2 mt-1">
          <img
            src={message.msg}
            alt="sentimag"
            className="border-4 rounded-2xl border-slate-300 dark:border-white cursor-pointer"
            onClick={() => window.open(message.msg)}
          />
        </div>
      </div>
    </div>
  );
};

export default MessageComponent;
