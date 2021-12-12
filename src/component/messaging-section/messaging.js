import { useSelector } from "react-redux";
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
      <div className="h-screen bg-lightBgColor dark:bg-darkBgColor text-lightPostTextStyleColor dark:text-darkPostTextStyleColor overflow-y-scroll suggested-profiles-container shadow-lg shadow-zinc-900">
        <div className="px-2 lg:px-60 2xl:px-96 py-1 w-full pb-5">
          <div className="bg-lightElevationColor dark:bg-darkElevationColor mt-3 rounded-lg flex w-full">
            {/* Left Side */}
            <ProfileConnectionCollection
              chatCollections={chatCollections}
              darkMode={darkMode}
            />

            {/* Right Side */}
            <AllChatMessages />
          </div>
        </div>
      </div>
    </BaseCommonPart>
  );
};

const ProfileConnectionCollection = ({ chatCollections, darkMode }) => {
  return (
    <div className="h-screen w-full sm:w-1/3 overflow-y-scroll scroller ">
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

const AllChatMessages = () => {
  const desc =
    "Explorer | Freelance Full Stack Developer | Content Creator 💻  Building Dots to Connect Later! 💡";

  return (
    <div className="h-screen hidden sm:block sm:w-2/3">
      <div className="w-full bg-lightElevationColor dark:bg-darkElevationColor p-3 shadow-sm shadow-slate-300 dark:shadow-slate-600 rounded-tr-md">
        <div className="text-base">Samarpan Dasgupta</div>
        <div className="text-xs">{desc}</div>
      </div>

      <div className="h-[68%] lg:h-[70%] overflow-y-auto scroller p-3">
       <ChatMessagesCollection />      
      </div>

      <div className="w-full mt-3 px-3 py-auto flex">
        <input
          type="text"
          placeholder="Write a message..."
          className="rounded-full w-full flex-1 px-6 py-4 text-gray-700 dark:text-white focus:outline-none bg-[#E6E6E6] dark:bg-darkBgColor text-sm mr-3"
        />
        <button className="bg-[#3DBE29] dark:bg-[#14202E] rounded-full w-10 h-10 my-auto shadow-md dark:shadow-darkElevationColor text-white">
        <i class="far fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
};

const ChatMessagesCollection = () => {
  return (
    <div>
      
    </div>
  );
}

export default MessageComponent;
