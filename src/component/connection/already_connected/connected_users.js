import { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import NoProfileImage from "../../../image/no_profile_picture.png";

const ConnectedUsers = () => {
  const [searchArgument, setsearchArgument] = useState("");

  return (
    <Fragment>
      <SearchBar setsearchArgument={setsearchArgument} />
      <ConnectedUsersList searchArgument={searchArgument} />
    </Fragment>
  );
};

const SearchBar = ({ setsearchArgument }) => {
  const handleChange = (e) => {
    console.log(e.target.value);
    setsearchArgument(e.target.value);
  };

  return (
    <div className="relative flex z-50 bg-lightBgColor dark:bg-darkBgColor rounded-full mb-3">
      <input
        type="text"
        placeholder="enter connection name"
        className="rounded-full flex-1 px-6 py-4 text-gray-700 dark:text-white focus:outline-none bg-lightBgColor dark:bg-darkBgColor"
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
};

const ConnectedUsersList = ({ searchArgument }) => {
  const [searchResultUsersCollection, setsearchResultUsersCollection] =
    useState([]);

  const [connectedUsersCollection, setconnectedUsersCollection] = useState([
    {
      profileImage:
        "https://scontent.fccu11-1.fna.fbcdn.net/v/t39.30808-6/259421087_415860160126125_4208309959930398235_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=dLYwzdzsotIAX8qRZvj&_nc_ht=scontent.fccu11-1.fna&oh=96b3aca7d3b0a6a14e1bb72505a9afe4&oe=61B2688C",
      name: "Sukannya Paul",
      title: "I love to do flirt",
      email: 18,
    },
    {
      profileImage:
        "https://www.bibs.co.in/front/img/final/2019-2021/Nikita%20Kundu.jpg",
      name: "Paulomi Kundu",
      title:
        "I am a girl but don't belive it. I am a girl but don't belive it I am a girl but don't belive it. I am a girl but don't belive itI am a girl but don't belive it. I am a girl but don't belive it",
      email: 20,
    },
    {
      profileImage: null,
      name: "Sunny Leone",
      title: "Love to watch movies babe",
      email: 40,
    },
    {
      profileImage:
        "https://m.media-amazon.com/images/M/MV5BMzc1YTA1ZjItMWRhMy00ZTBlLTkzNTgtNTc4ZDE3YTM3ZDk2XkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_.jpg",
      name: "Mia Khalifa",
      title: "Different Person. Normal Personality",
      email: 35,
    },
    {
      profileImage:
        "https://media1.popsugar-assets.com/files/thumbor/kL29MFiN7kf3VN3Rbi18s38HXMY/186x52:2258x2124/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2020/04/08/705/n/1922398/1c0039b55e8df427cd8537.59120730_/i/Paul-Walker.jpg",
      name: "Paul Walker",
      title: "Famous Actor for Fast and Furious Movie Series",
      email: 45,
    },
    {
      profileImage:
        "https://149566639.v2.pressablecdn.com/wp-content/uploads/2021/05/the-rock.jpg",
      name: "Dwayne Thompson",
      title: "Developer at the Beach",
      email: 50,
    },
    {
      profileImage: null,
      name: "Siddarth Malhotra",
      title: "Love to do Acting",
      email: 29,
    },
    {
      profileImage:
        "https://yt3.ggpht.com/3vwdwPM7w4Y7wE86x-uY-pB2MTmA7IP7ihGl2yaUd8TsFetgOBKF8XVhvC8Yj76vCdHpuLsi=s900-c-k-c0x00ffffff-no-rj",
      name: "Amitava Garai",
      title: "Music is my life",
      email: 20,
    },
    {
      profileImage: null,
      name: "Soumadip Ghosh",
      title: "Love to do Joking",
      email: 22,
    },
    {
      profileImage:
        "https://scontent.fccu11-1.fna.fbcdn.net/v/t39.30808-6/p600x600/264238543_465580501688205_4174149765813363783_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=KdlywroQZAkAX8BmURO&_nc_ht=scontent.fccu11-1.fna&oh=56335ac017c1765e9daf6dfa9167adbd&oe=61B19EE0",
      name: "Rohit Rajendra Prabhu",
      title: "Food is my life",
      email: 36,
    },
  ]);

  useEffect(() => {
    setsearchResultUsersCollection([]);

    if (searchArgument) {
      const sortedList = [];

      connectedUsersCollection.map((user) => {
        if (user.name.toLowerCase().includes(searchArgument.toLowerCase())) {
          sortedList.push(user);
        }
      });

      setsearchResultUsersCollection(sortedList);
    } else {
      setsearchResultUsersCollection(connectedUsersCollection);
    }
  }, [searchArgument]);

  const { darkMode } = useSelector((state) => state);

  return (
    <div className="h-screen w-full overflow-y-scroll suggested-profiles-container">
      {(searchResultUsersCollection &&
        searchResultUsersCollection.length > 0 &&
        searchResultUsersCollection.map((user, index) => {
          return (
            <div
              className={` ${
                darkMode ? "hover:bg-gray-500" : "hover:bg-gray-200"
              } flex justify-between items-center p-4 cursor-pointer rounded-md transition-all duration-300 ease-in-out`}
              key={index}
            >
              <div className="flex justify-between w-full">
                <ConnectionTile user={user} />

                <ButtonsCollection darkMode={darkMode} />
              </div>
            </div>
          );
        })) || (
        <h1 className="w-full text-center text-red-600 text-2xl mt-10 tracking-wide">
          You Have No Connection Yet
        </h1> 
      )}
    </div>
  );
};

const ConnectionTile = ({ user }) => {
  return (
    <div className="flex items-center w-full md:w-2/3">
      <img
        className="rounded-full w-10 h-10"
        src={user.profileImage ? user.profileImage : NoProfileImage}
        alt="profile"
      />
      <div className="ml-4">
        <p className="text-lg font-semibold">{user.name}</p>
        <p className="text-sm opacity-60">{user.title}</p>
      </div>
    </div>
  );
};

const ButtonsCollection = ({ darkMode }) => {
  return (
    <div className="md:flex items-center hidden">
      <button
        className={`mt-3 mr-5 text-red-500 px-2 py-1 rounded-3xl w-full border-red-500 hover:bg-red-500  hover:bg-opacity-30  transition-all duration-300`}
        style={{ borderWidth: "0.2px" }}
      >
        Remove
      </button>

      <button
        className={`${
          darkMode ? "hover:bg-blue-800" : "hover:bg-blue-400"
        } mt-3 text-lightPrimaryFgColor dark:text-darkPrimaryFgColor px-2 py-1 rounded-3xl w-full border-darkPrimaryFgColor  hover:bg-opacity-30  transition-all duration-300`}
        style={{ borderWidth: "0.2px" }}
      >
        Message
      </button>
    </div>
  );
};

export default ConnectedUsers;
