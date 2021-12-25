import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onSignOut } from "./component/auth/helper/api_call";
import { getDataFromLocalStorage } from "./component/main-helper/local-storage-management";
import Waiting from "./component/main-helper/waiting";
import { isUserProfileCreatedBefore } from "./component/profile-section/helper/api-call";

export const AuthenticatedDecider = (RedirectComponent, specialPath = "") => {
  const response = getDataFromLocalStorage();

  const [isLoading, setisLoading] = useState(true);
  const [userProfileCreatedBefore, setuserProfileCreatedBefore] =
    useState(false);

  ProfileInformationChecker(
    response,
    setisLoading,
    setuserProfileCreatedBefore
  );

  if (response) {
    return isLoading ? (
      <Waiting />
    ) : (
      Decider(RedirectComponent, userProfileCreatedBefore, specialPath)
    );
  }

  return <Navigate to="/landing-with-signin" />;
};

export const EntryPointDecider = (RedirectComponent, path) => {
  const information = localStorage.getItem(
    process.env.REACT_APP_SOCIAL_BOOK_TOKEN
  );

  if (information === null || information.user === null) {
    if (path === "/") return <Navigate to="/landing-with-signin" />;
    return <RedirectComponent />;
  }
  return <Navigate to="/feed" />;
};

const Decider = (RedirectComponent, userProfileCreatedBefore, specialPath) => {
  

  if (specialPath === "/take-user-information") {
    return userProfileCreatedBefore ? (
      <Navigate to="/feed" />
    ) : (
      <RedirectComponent />
    );
  }

  return !userProfileCreatedBefore ? (
    <Navigate to="/take-user-information" />
  ) : (
    <RedirectComponent />
  );
};

const ProfileInformationChecker = (
  response,
  setisLoading,
  setuserProfileCreatedBefore
) => {
  useEffect(() => {
    if (!response) {
      return;
    }

    setisLoading(true);
    isUserProfileCreatedBefore().then((res) => {
      if (res.message) {
        onSignOut();
        return window.location.reload();
      }

      setuserProfileCreatedBefore(res);
      setisLoading(false);
    });
  }, []);
};
