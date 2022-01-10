import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { CHANGE_MODE } from "../../redux/actions";
import LoadingBar from "../loading/loadingbar";
import { onSignOut } from "../auth/helper/api_call";
import { io } from "socket.io-client";
import { getDataFromLocalStorage, storeDataInLocalStorage } from "../common/local-storage-management";

const MenuComponent = ({ isLoading }) => {
  const [isMenuOpen, setisMenuOpen] = useState(false);
  return (
    <nav
      id="nav"
      className="bg-lightElevationColor dark:bg-darkElevationColor sticky top-0 z-50 backdrop-blur-3xl shadow-sm dark:shadow-lg"
      role="navigation"
    >
      <LoadingBar isLoading={isLoading} />
      <div
        className="mx-auto p-4 flex flex-wrap items-center md:flex-no-wrap"
        style={{ width: "100%" }}
      >
        <MenuHeading />
        <MenuToggleButton
          isMenuOpen={isMenuOpen}
          setisMenuOpen={setisMenuOpen}
        />
        <MenuCollection isMenuOpen={isMenuOpen} />
      </div>
    </nav>
  );
};

const MenuHeading = () => {
  return (
    <div className="mr-4 md:mr-8">
      <Link to="/feed">
        <span className="text-xl 2xl:text-4xl text-black dark:text-white font-semibold tracking-wider">
          SocialBook
        </span>
      </Link>
    </div>
  );
};

const MenuToggleButton = ({ isMenuOpen, setisMenuOpen }) => {
  const menuToggle = () => setisMenuOpen(!isMenuOpen);

  return (
    <div className="ml-auto md:hidden flex">
      {<ModeToggle />}
      <div className="">
        <button
          onClick={() => menuToggle()}
          className="flex items-center p-2"
          type="button"
        >
          {isMenuOpen ? (
            <i className="fas fa-times fa-md 2xl:fa-lg text-black dark:text-white"></i>
          ) : (
            <i className="fas fa-bars fa-md 2xl:fa-lg text-black dark:text-white"></i>
          )}
        </button>
      </div>
    </div>
  );
};

const MenuCollection = ({ isMenuOpen }) => {
  const location = useLocation();
  const [hasNotification, sethasNotification] = useState(false);
  const socket = useRef();

  const { user } = getDataFromLocalStorage();
  //const [hasNewPendingNotification, sethasNewPendingNotification] = useState(hasPendingNotification);

  const menuStatus = (path) => {
    if (path === location.pathname) {
      return "menu-item text-lightPrimaryFgColor dark:text-darkPrimaryFgColor";
    } else {
      return "menu-item text-lightSpecificIconsColor dark:text-darkSpecificIconsColor";
    }
  };

  useEffect(() => {
    socket.current = io("ws://localhost:8000");
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", user);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });

    socket.current.emit("getRealTimeNotifications", {
      userId: user,
    });

    socket.current.on("totalUpdatedNotification", (notificationData) => {
      console.log("socket notification data: ", notificationData);
      notificationData && sethasNotification(true);
      // if(notificationData){
      //   sethasNotification(true);
      //   !hasNewPendingNotification && storeDataInLocalStorage(token ,user, name, description, profilePic, true) && sethasNewPendingNotification(true);
      // }
    });
  }, [user]);

  console.log(socket);

  return (
    <div
      id="menu"
      style={{ height: isMenuOpen ? "22rem" : "0" }}
      className="w-full transition-all transform ease-in-out duration-500 md:transition-none md:w-auto md:flex-grow md:flex md:items-center overflow-hidden md:overflow-visible"
    >
      <ul className="flex flex-col duration-300 ease-out sm:transition-none mt-5 mx-4 md:flex-row md:items-center md:mx-0 md:ml-auto md:mt-0 md:pt-0 md:border-0">
        <li className="hidden md:block">{<ModeToggle />}</li>
        <li className={`py-3`}>
          <Link className={menuStatus("/feed")} to="/feed">
            <i className="fas fa-home fa-md"></i> Home
          </Link>
        </li>
        <li className={`py-3`}>
          <Link className={menuStatus("/connection")} to="/connection">
            <i className="fas fa-user-friends fa-md"></i> Connection
          </Link>
        </li>
        <li className={`py-3`}>
          <Link className={menuStatus("/post")} to="/post">
            <i className="far fa-plus-square fa-md"></i> Post
          </Link>
        </li>
        <li className={`py-3`}>
          <Link className={menuStatus("/notification")} to="/notification">
            <div className="flex text-center w-full justify-center">
              <div className="">
                <i className="far fa-bell fa-md"></i>
                {hasNotification && (
                  <span
                    class="relative inline-block w-2 h-2 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full"
                    style={{ left: "-15px", top: "-5px" }}
                  ></span>
                )}
              </div>
              {!hasNotification && <div className="w-1"></div>}
              Notification
            </div>
          </Link>
        </li>
        <li className={`py-3`}>
          <Link className={menuStatus("/messaging")} to="/messaging">
            <i className="far fa-comment fa-md"></i> Chat
          </Link>
        </li>
        <li
          className={`py-3 text-red-600 dark:text-red-500 font-semibold text-center md:ml-3 cursor-pointer`}
          onClick={() => onSignOut()}
        >
          <i className="fas fa-power-off"></i> Signout
        </li>
      </ul>
    </div>
  );
};

const ModeToggle = () => {
  const { darkMode } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div
      className="px-3 py-1 mr-3 bg-lightElevationColor dark:bg-darkElevationColor rounded-full cursor-pointer transition-all duration-500 dark:border-gray-300"
      onClick={() => makeToggleLightAndDarkMode(dispatch)}
    >
      <button className="text-darkElevationColor dark:text-lightElevationColor">
        {darkMode ? (
          <img
            src="https://img.icons8.com/ios-filled/50/ffffff/sun--v1.png"
            alt="light mode indicator"
            width="25"
            className="md:pt-1"
          />
        ) : (
          <i className="far fa-moon fa-md 2xl:fa-lg"></i>
        )}
      </button>
    </div>
  );
};

const makeToggleLightAndDarkMode = (dispatch) => {
  dispatch({ type: CHANGE_MODE });
};

export default MenuComponent;
