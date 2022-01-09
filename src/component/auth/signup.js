import { Fragment, useState } from "react";
import LoadingBar from "../loading/loadingbar";
import {
  DesktopNotification,
  errorMessage,
  infoMessage,
  warningMessage,
} from "../common/desktop-notification";
import { onSignUp } from "./helper/api_call";

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
  const [isLoading, setisLoading] = useState(false);

  return (
    <div className="pt-32 mx-20 md:mx-44 lg:mx-96">
      <LoadingBar isLoading={isLoading} />
      <Heading isLoading={isLoading} />
      <div className="mt-10">
        <SignInForm isLoading={isLoading} setisLoading={setisLoading} />
        <LowerSection />
        <DesktopNotification />
      </div>
    </div>
  );
};

const Heading = ({ isLoading }) => {
  return (
    <h2
      className={`${
        isLoading ? "mt-5" : ""
      } text-center text-indigo-400 font-display font-semibold text-3xl`}
    >
      Signup
    </h2>
  );
};

const SignInForm = ({ isLoading, setisLoading }) => {
  const [signUpForm, setsignUpForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setsignUpForm({
      ...signUpForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogIn = (e) => {
    e.preventDefault();

    const { email, password, confirmPassword } = signUpForm;

    if (email !== "" && password !== "" && confirmPassword !== "") {
      if (password === confirmPassword) {
        if (password.length < 6) {
          warningMessage("Password Must be atleast 6 characters");
        } else {
          setisLoading(true);

          onSignUp(email, password, setisLoading);
        }
      } else {
        errorMessage("Password and Confirm password does not match");
      }
    } else {
      infoMessage("Please fill all the fields");
    }
  };

  return (
    <Fragment>
      <div>
        <div className="text-sm font-bold text-gray-300 tracking-wide">
          Email
        </div>
        <input
          className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 bg-darkBgColor"
          type="email"
          placeholder="Email"
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
        </div>
        <input
          className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 bg-darkBgColor"
          type="password"
          placeholder="Password"
          required
          name="password"
          onChange={handleChange}
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
          name="confirmPassword"
          onChange={handleChange}
        />
      </div>
      <div className="mt-10">
        {!isLoading ? (
          <button
            className={` bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                  font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                                  shadow-lg`}
            onClick={handleLogIn}
          >
            Sign Up
          </button>
        ) : (
          <div className="text-center text-xl text-indigo-400 tracking-wider">
            Process is going on.... Please Wait
          </div>
        )}
      </div>
    </Fragment>
  );
};

const LowerSection = () => {
  return (
    <div className="text-center mt-5">
      Already Have an Account?{" "}
      <span
        className="text-blue-400 font-semibold tracking-wider cursor-pointer"
        onClick={() => {
          window.location.href = "/landing-with-signin";
        }}
      >
        {" "}
        LogIn{" "}
      </span>
    </div>
  );
};

export default SignUp;
