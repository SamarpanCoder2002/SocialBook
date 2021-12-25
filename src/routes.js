import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ConnectionScreen from "./component/connection/connection";
import HomePage from "./component/home/home";
import LandingPageWithSignInForm from "./component/auth/landing-page-with-signin-form";
import MessageComponent from "./component/messaging-section/messaging";
import NotificationScreen from "./component/notification/notification-container";
import ParticularPostShowcase from "./component/post-prototype/particular-post-showcase";
import ProfileSection from "./component/profile-section/profile";
import { AuthenticatedDecider, EntryPointDecider } from "./decider";
import SignUp from "./component/auth/signup";
import PostScreen from "./component/post-prototype/post";
import UserInformationTakingComponent from "./component/profile-section/take-user-information";
import Waiting from "./component/main-helper/waiting";

const RoutesEntryPoint = () => {
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

        <Route path="/feed" element={AuthenticatedDecider(HomePage)} />
        <Route
          path="/connection"
          element={AuthenticatedDecider(ConnectionScreen)}
        />
        <Route path="/post" element={AuthenticatedDecider(PostScreen)} />
        <Route
          path="/notification"
          element={AuthenticatedDecider(NotificationScreen)}
        />
        <Route
          path="/post/:postId"
          element={AuthenticatedDecider(ParticularPostShowcase)}
        />
        <Route
          path="/:connectionId/profile"
          element={AuthenticatedDecider(ProfileSection)}
        />
        <Route
          path="/messaging"
          element={AuthenticatedDecider(MessageComponent)}
        />

        {/* // ** Temporary Component... Remove Later */}
        <Route path="/testing" element={<Waiting />} />

        <Route
          path="/take-user-information"
          element={AuthenticatedDecider(UserInformationTakingComponent, "/take-user-information")}
        />

        <Route path="*" element={() => <div>404</div>} />
      </Routes>
    </Router>
  );
};

export default RoutesEntryPoint;
