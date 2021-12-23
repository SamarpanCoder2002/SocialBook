import { Navigate } from "react-router-dom";

export const CheckingBeforeDecide = (RedirectComponent, protectRoute) => {
  return (
    protectRoute ? (
      AuthenticatedDecider(RedirectComponent)
    ) : (
      <Navigate to="/take-user-information" />
    )
  );
}

export const AuthenticatedDecider = (RedirectComponent) => {
  if (localStorage.getItem(process.env.REACT_APP_SOCIAL_BOOK_TOKEN))
    return <RedirectComponent />;

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
