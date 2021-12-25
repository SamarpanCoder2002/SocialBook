import { useSelector } from "react-redux";
import LoadingBar from "../loading/loadingbar";
import { DesktopNotification } from "./desktop-notification";

const Waiting = ({ showName = "Socialbook", largeScreenPadding = "px-96", lightBgColor="bg-lightBgColor", darkBgColor="bg-darkBgColor" }) => {
  const {darkMode} = useSelector(state => state);

  return (
    <div className={`${darkMode? "dark":""}`}>
      <div className={`h-screen ${lightBgColor} dark:${darkBgColor} text-indigo-500 dark:text-darkPostTextStyleColor`}>
        <div className="h-1/2 flex flex-wrap flex-col justify-center items-center">
          <h1 className="text-3xl tracking-wider font-semibold">{showName}</h1>
          <div className={`container mx-auto mt-5 px-10 sm:px-24 md:px-36 lg:${largeScreenPadding}`}>
            <div className="bg-zinc-300 dark:bg-slate-900 rounded-full">
              <LoadingBar isLoading={true} />
            </div>
          </div>
        </div>

        <DesktopNotification />
      </div>
    </div>
  );
};

export default Waiting;
