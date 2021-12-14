const SignUp = () => {
  return (
    <div className="h-screen dark">
      <div className="dark:bg-darkBgColor dark:text-darkPostTextStyleColor my-auto h-full">
        <div className="container mx-auto h-full">
          <div className="h-full">
            <SignUpFormSection />
          </div>
        </div>
      </div>
    </div>
  );
};

const SignUpFormSection = () => {
  return (
    <div className="pt-32 mx-20 md:mx-44 lg:mx-96">
      <h2 className="text-center text-indigo-400 font-display font-semibold text-3xl">
        Signup
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
              placeholder="Email"
              required
            />
          </div>
          <div className="mt-8">
            <div className="flex justify-between items-center">
              <div className="text-sm font-bold text-gray-300 tracking-wide">
                Password
              </div>
            </div>
            <input
              className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 bg-darkBgColor"
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <div className="mt-8">
            <div className="flex justify-between items-center">
              <div className="text-sm font-bold text-gray-300 tracking-wide">
                Confirm Password
              </div>
            </div>
            <input
              className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 bg-darkBgColor"
              type="password"
              placeholder="Confirm password"
              required
            />
          </div>
          <div className="mt-10">
            <button
              className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                  font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                                  shadow-lg"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
