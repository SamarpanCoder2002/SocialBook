import { useNavigate } from "react-router-dom";

const LandingPageWithSignInForm = () => {
  return (
    <div className="h-screen dark">
      <div className="dark:bg-darkBgColor dark:text-darkPostTextStyleColor h-full">
        <HeaderSection />
        <MiddleSection />
      </div>
    </div>
  );
};

const HeaderSection = () => {
  const navigate = useNavigate();

  return (
    <div className="p-2 flex justify-between pt-3">
      <div className="text-xl p-2 font-semibold tracking-wider ">
        Socialbook
      </div>

      <div>
        <button
          className="px-2 py-1 rounded-lg mr-5 hover:bg-gray-800 transition-all duration-300"
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

const MiddleSection = () => {
  return (
    <div className="container mx-auto px-5 md:px-10 lg:px-20 grid lg:grid-cols-2 h-[80%]">
      <MiddleLeftSection />
      <MiddleRightSection />
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
      </div>
    </div>
  );
};

const MiddleRightSection = () => {
  return (
    <div className="px-12 sm:px-24 md:px-48 lg:px-12 xl:px-24 mt-24 lg:my-auto bg-darkBgColor">
      <h2 className="text-center lg:text-left text-indigo-400 font-display font-semibold text-3xl">
        Login
      </h2>
      <div className="mt-10">
        <form>
          <div>
            <div className="text-sm font-bold text-gray-300 tracking-wide">
              Email
            </div>
            <input
              className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 bg-darkBgColor"
              type="email"
              placeholder="mike@gmail.com"
              required
            />
          </div>
          <div className="mt-8">
            <div className="flex justify-between items-center">
              <div className="text-sm font-bold text-gray-300 tracking-wide">
                Password
              </div>

              <div>
                <button
                  className="text-xs font-display font-semibold text-indigo-400 hover:text-indigo-800
                                        cursor-pointer tracking-wider"
                >
                  Forgot Password?
                </button>
              </div>
            </div>
            <input
              className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 bg-darkBgColor"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="mt-10">
            <button
              className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                                shadow-lg"
            >
              Log In
            </button>
          </div>
        </form>
      </div>

      <div className="text-center mt-3">Or</div>

      <div className="text-center mt-3 py-3 rounded-full border-2 hover:bg-gray-800 transition-all duration-300 cursor-pointer">
        <img
          src="https://img.icons8.com/color/50/000000/google-logo.png"
          alt="google logo"
          width={25}
          className="inline pb-1"
        />
        <span className="pl-5"> Sign In With Google</span>
      </div>
    </div>
  );
};

export default LandingPageWithSignInForm;
