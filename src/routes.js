import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ConnectionScreen from "./component/connection";
import HomePage from "./component/home";
import NotificationScreen from "./component/notification/main";
import PostScreen from "./component/post";
import ParticularPostShowcase from "./component/post-prototype/particular-post-showcase";
import ProfileSection from "./component/profile-section/profile";
import AuthenticatedDecider from "./decider";

const RoutesEntryPoint = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={AuthenticatedDecider(HomePage)} />
        <Route path="/connection" element={AuthenticatedDecider(ConnectionScreen)} />
        <Route path="/post" element={AuthenticatedDecider(PostScreen)} />
        <Route path="/notification" element={AuthenticatedDecider(NotificationScreen)} />
        <Route path="/post/:postId" element={AuthenticatedDecider(ParticularPostShowcase)} />
        <Route path="/:connectionId/profile" element={AuthenticatedDecider(ProfileSection)} />
      </Routes>
    </Router>
  );
};

export default RoutesEntryPoint;
