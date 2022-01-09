import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onSignOut } from "./component/auth/helper/api_call";
import { getDataFromLocalStorage } from "./component/common/local-storage-management";
import Waiting from "./component/common/waiting";
import { isUserProfileCreatedBefore } from "./component/profile-section/helper/api-call";

export const AuthenticatedDecider = (RedirectComponent, path = "") => {
  if (!getDataFromLocalStorage()) return <Navigate to="/landing-with-signin" />;
  return (
    <ComponentRedirection RedirectComponent={RedirectComponent} path={path} />
  );
};

export const EntryPointDecider = (RedirectComponent, path) => {
  if (!getDataFromLocalStorage()) {
    if (path === "/") return <Navigate to="/landing-with-signin" />;
    return <RedirectComponent />;
  }

  return <Navigate to="/feed" />;
};

const ComponentRedirection = ({ RedirectComponent, path }) => {
  const [isLoading, setisLoading] = useState(true);
  const [userProfileCreatedBefore, setuserProfileCreatedBefore] =
    useState(true);

  useEffect(() => {
    isUserProfileCreatedBefore().then((res) => {
      setuserProfileCreatedBefore(res);
      setisLoading(false);
    });
  }, []);

  if (userProfileCreatedBefore?.code === 403) {
    onSignOut();
    return <Navigate to="/landing-with-signin" />;
  }

  if (isLoading) return <Waiting />;

  if (path === "/take-user-information")
    return userProfileCreatedBefore ? (
      <Navigate to="/feed" />
    ) : (
      <RedirectComponent />
    );

  return userProfileCreatedBefore ? (
    <RedirectComponent />
  ) : (
    <Navigate to="/take-user-information" />
  );
};
