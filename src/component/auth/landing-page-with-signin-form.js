import { useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { onGoogleLogInSuccess, onSignIn } from "./helper/api_call";
import { Fragment, useState } from "react";
import {
  DesktopNotification,
  infoMessage,
} from "../common/desktop-notification";
import LoadingBar from "../loading/loadingbar";
import AppLogo from "../../image/logo.png";

const LandingPageWithSignInFragment = () => {
  const [isLoading, setisLoading] = useState(false);

  return (
    <div className="h-screen dark">
      <div className="dark:bg-darkBgColor dark:text-darkPostTextStyleColor h-full overflow-y-scroll scroller">
        <LoadingBar isLoading={isLoading} />
        <HeaderSection />
        <MiddleSection setisLoading={setisLoading} isLoading={isLoading} />
      </div>
    </div>
  );
};

const HeaderSection = () => {
  const navigate = useNavigate();

  return (
    <div className="p-2 flex justify-between pt-3">
      <div
        className="text-xl px-2 pt-1 font-semibold tracking-wider cursor-pointer"
        onClick={() => {
          navigate("/feed");
        }}
      >
        <div className="flex">
          <div>
            <img src={AppLogo} alt="app logo" width={35} />
          </div>
          <div className="mt-1 ml-3">
          SocialBook
          </div>
        </div>
        
      </div>

      <div>
        <button
          className="px-2 pt-2.5 rounded-lg mr-5 hover:bg-gray-800 transition-all duration-300"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Signup
        </button>
      </div>
    </div>
  );
};

const MiddleSection = ({ setisLoading, isLoading }) => {
  return (
    <div className="container mx-auto px-5 md:px-10 lg:px-20 grid lg:grid-cols-2 h-[80%]">
      <MiddleLeftSection />
      <MiddleRightSection setisLoading={setisLoading} isLoading={isLoading} />
    </div>
  );
};

const MiddleLeftSection = () => {
  return (
    <div className="text-center lg:text-left my-auto h-[50%] lg:h-auto">
      <div className="text-3xl md:text-4xl lg:text-6xl">
        Welcome To The Community
      </div>

      <div className="text-lg md:text-lg lg:text-xl mt-10">
        Connect With More People Frequently and Share Your Valuable Thoughts
        With Enjoying Private Chat Messages
      </div>
    </div>
  );
};

const MiddleRightSection = ({ setisLoading, isLoading }) => {
  const [signInForm, setsignInForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setsignInForm({ ...signInForm, [e.target.name]: e.target.value });
  };

  return (
    <div className="px-12 sm:px-24 md:px-48 lg:px-12 xl:px-24 mt-24 lg:my-auto bg-darkBgColor">
      <h2 className="text-center lg:text-left text-indigo-400 font-display font-semibold text-3xl">
        Login
      </h2>
      <div className="mt-10">
        <Fragment>
          <div>
            <div className="text-sm font-bold text-gray-300 tracking-wide">
              Email
            </div>
            <input
              className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 bg-darkBgColor"
              type="email"
              placeholder="samarpan@gmail.com"
              required
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="mt-8">
            <div className="flex justify-between items-center">
              <div className="text-sm font-bold text-gray-300 tracking-wide">
                Password
              </div>

              {/* <div>
                <button
                  className="text-xs font-display font-semibold text-indigo-400 hover:text-indigo-800
                                        cursor-pointer tracking-wider"
                >
                  Forgot Password?
                </button>
              </div> */}
            </div>
            <input
              className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 bg-darkBgColor"
              type="password"
              placeholder="Enter your password"
              required
              name="password"
              onChange={handleChange}
            />
          </div>
          {!isLoading ? (
            <div className="mt-10">
              <button
                className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                                shadow-lg"
                onClick={() => {
                  const { email, password } = signInForm;

                  if (email !== "" && password !== "") {
                    setisLoading(true);

                    onSignIn(email, password, setisLoading);
                  } else {
                    infoMessage("Please fill all the fields");
                  }
                }}
              >
                Log In
              </button>
            </div>
          ) : (
            <div className="text-center text-xl text-indigo-400 tracking-wider mt-10">
              Process is going on.... Please Wait
            </div>
          )}
        </Fragment>
      </div>

      {!isLoading && (
        <>
          <div className="text-center mt-3">Or</div>
          <GoogleLogInButton setisLoading={setisLoading} />
        </>
      )}

      <DesktopNotification />
    </div>
  );
};

const GoogleLogInButton = ({ setisLoading }) => {
  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_FIREBASE_AUTH_CLIENT_ID}
      onSuccess={(response) => onGoogleLogInSuccess(response, setisLoading)}
      onFailure={(response) => setisLoading(false)}
      render={(renderProps) => (
        <div
          className="text-center mt-3 py-3 rounded-full border-2 hover:bg-gray-800 transition-all duration-300 cursor-pointer"
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        >
          <img
            src="https://img.icons8.com/color/50/000000/google-logo.png"
            alt="google logo"
            width={25}
            className="inline pb-1"
          />
          <span className="pl-5"> Sign In With Google</span>
        </div>
      )}
    />
  );
};

export default LandingPageWithSignInFragment;
