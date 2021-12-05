import { Link, useLocation } from "react-router-dom";
import LoadingBar from "./loading/loadingbar";

const MenuComponent = ({ isLoading }) => {
  return (
    <nav
      id="nav"
      className="bg-lightElevationColor dark:bg-darkElevationColor sticky top-0 z-50 backdrop-blur-3xl shadow-lg"
      role="navigation"
    >
      <LoadingBar isLoading={isLoading} />
      <div
        className="mx-auto p-4 flex flex-wrap items-center md:flex-no-wrap"
        style={{ width: "100%" }}
      >
        <MenuHeading />
        <MenuToggleButton />
        <MenuCollection />
      </div>
    </nav>
  );
};

const MenuHeading = () => {
  return (
    <div className="mr-4 md:mr-8">
      <Link to="/">
        <span className="text-xl 2xl:text-4xl text-black dark:text-white font-semibold tracking-wider">
          SocialBook
        </span>
      </Link>
    </div>
  );
};

const MenuToggleButton = () => {
  const menuToggle = () => {
    const menu = document.getElementById("menu");

    menu.classList.toggle("h-64");
  };

  return (
    <div className="ml-auto md:hidden">
      <button
        onClick={() => menuToggle()}
        className="flex items-center p-2"
        type="button"
      >
        <i className="fas fa-bars fa-md text-black dark:text-white "></i>
      </button>
    </div>
  );
};

const MenuCollection = () => {
  const location = useLocation();

  const menuStatus = (path) => {
    if (path === location.pathname) {
      return "menu-item text-lightPrimaryFgColor dark:text-darkPrimaryFgColor";
    } else {
      return "menu-item text-lightSpecificIconsColor dark:text-darkSpecificIconsColor";
    }
  };

  return (
    <div
      id="menu"
      className="w-full h-0 transition-all ease-out duration-500 md:transition-none md:w-auto md:flex-grow md:flex md:items-center overflow-hidden md:overflow-visible "
    >
      <ul className="flex flex-col duration-300 ease-out sm:transition-none mt-5 mx-4 md:flex-row md:items-center md:mx-0 md:ml-auto md:mt-0 md:pt-0 md:border-0">
        <li className={`py-3`}>
          <Link className={menuStatus("/")} to="/">
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
            <i className="far fa-bell fa-md"></i> Notification
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MenuComponent;
