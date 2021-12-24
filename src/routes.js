import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ConnectionScreen from "./component/connection/connection";
import HomePage from "./component/home/home";
import LandingPageWithSignInForm from "./component/auth/landing-page-with-signin-form";
import MessageComponent from "./component/messaging-section/messaging";
import NotificationScreen from "./component/notification/main";
import ParticularPostShowcase from "./component/post-prototype/particular-post-showcase";
import ProfileSection from "./component/profile-section/profile";
import {
  AuthenticatedDecider,
  CheckingBeforeDecide,
  EntryPointDecider,
} from "./decider";
import SignUp from "./component/auth/signup";
import PostScreen from "./component/post-prototype/post";
import UserInformationTakingComponent from "./component/profile-section/take-user-information";
import { useEffect, useState } from "react";
import { isUserProfileCreatedBefore } from "./component/profile-section/helper/api-call";
import { onSignOut } from "./component/auth/helper/api_call";
import Waiting from "./component/main-helper/waiting";

const RoutesEntryPoint = () => {
  const [protectRoute, setprotectRoute] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  

  useEffect(() => {
    setisLoading(true);

    isUserProfileCreatedBefore().then((res) => {
      console.log("Router USeEffect");
      setisLoading(false);
      if (res.message) {
        onSignOut();
        return window.location.reload();
      }

      setprotectRoute(res);
      
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/landing-with-signin"
          element={EntryPointDecider(LandingPageWithSignInForm)}
        />
        <Route path="/signup" element={EntryPointDecider(SignUp)} />
        <Route
          path="/"
          element={EntryPointDecider(LandingPageWithSignInForm, "/")}
        />

        <Route
          path="/feed"
          element={CheckingBeforeDecide(HomePage, protectRoute)}
        />
        <Route
          path="/connection"
          element={CheckingBeforeDecide(ConnectionScreen, protectRoute)}
        />
        <Route
          path="/post"
          element={CheckingBeforeDecide(PostScreen, protectRoute)}
        />
        <Route
          path="/notification"
          element={CheckingBeforeDecide(NotificationScreen, protectRoute)}
        />
        <Route
          path="/post/:postId"
          element={CheckingBeforeDecide(ParticularPostShowcase, protectRoute)}
        />
        <Route
          path="/:connectionId/profile"
          element={CheckingBeforeDecide(ProfileSection, protectRoute)}
        />
        <Route
          path="/messaging"
          element={CheckingBeforeDecide(MessageComponent, protectRoute)}
        />

        <Route
          path="/take-user-information"
          element={
            !isLoading && !protectRoute ? (
              AuthenticatedDecider(UserInformationTakingComponent)
            ) : isLoading ? (
              <Waiting />
            ) : (
              <Navigate to="/feed" />
            )
          }
        />

        <Route path="*" element={() => <div>404</div>} />
      </Routes>
    </Router>
  );
};

export default RoutesEntryPoint;
