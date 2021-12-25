import LoadingBar from "../loading/loadingbar";
import { DesktopNotification } from "./desktop-notification";

const Waiting = () => {
  return (
    <div className="h-screen bg-darkBgColor text-darkPostTextStyleColor">
      <div className="h-1/2 flex flex-wrap flex-col justify-center items-center">
        <h1 className="text-3xl tracking-wider">Socialbook</h1>
        <div className="container mx-auto mt-5 px-10 md:px-36 lg:px-96">
            <LoadingBar isLoading={true} />
        </div>
      </div>

      <DesktopNotification />
    </div>
  );
};

export default Waiting;
