import SignIn from "./component/signin";

const AuthenticatedDecider = (RedirectComponent) => {
  /// Remove true and || later when integrate to the backend
  if (true || localStorage.getItem(process.env.REACT_APP_SOCIAL_BOOK_TOKEN)) {
    return <RedirectComponent />;
  }
  return <SignIn />;
};

export default AuthenticatedDecider;
