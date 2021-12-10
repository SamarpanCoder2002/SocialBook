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
      <div className="h-screen bg-lightBgColor dark:bg-darkBgColor text-lightPostTextStyleColor dark:text-darkPostTextStyleColor overflow-y-scroll suggested-profiles-container">
        <div className="px-2 lg:px-60 2xl:px-96 py-1 w-full">
          <div className="bg-lightElevationColor dark:bg-darkElevationColor mt-3 rounded-lg flex w-full shadow-2xl">
            <div className="h-screen w-full sm:w-1/3 overflow-y-scroll chat-profile-collection ">
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

                    <div className="hidden lg:block text-sm">
                        Dec 9
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </BaseCommonPart>
  );
};

export default MessageComponent;
