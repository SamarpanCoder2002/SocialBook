import { Fragment, useRef, useState } from "react";
import LoadingBar from "../loading/loadingbar";
import {
  DesktopNotification,
  infoMessage,
} from "../common/desktop-notification";
import NoProfileImage from "../../image/no_profile_picture.png";
import { createUserProfile, updateUserProfile } from "./helper/api-call";
import { Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const UserInformationTakingComponent = () => {
  const { state, pathname } = useLocation();
  const { darkMode } = useSelector((state) => state);

  if (pathname === "/update-user-information" && !state)
    return <Navigate to="/feed" />;

  return (
    <div className={`h-screen ${darkMode ? "dark" : ""}`}>
      <div className="dark:bg-darkBgColor dark:text-darkPostTextStyleColor h-full overflow-y-scroll">
        <div className="container mx-auto h-full">
          <div className="h-full">
            <TakeUserInformation />
          </div>
        </div>
      </div>
      <DesktopNotification />
    </div>
  );
};

const TakeUserInformation = () => {
  const [isLoading, setisLoading] = useState(false);

  return (
    <div className="pt-10 md:pt-24 lg:pt-16 mx-20 lg:mx-80 ">
      <LoadingBar isLoading={isLoading} />
      <Heading isLoading={isLoading} />
      <div className="mt-10">
        <UserInformationForm
          isLoading={isLoading}
          setisLoading={setisLoading}
        />
      </div>
    </div>
  );
};

const Heading = ({ isLoading }) => {
  const { pathname } = useLocation();

  return (
    <h2
      className={`${
        isLoading ? "mt-5" : ""
      } text-center text-indigo-400 font-display font-semibold text-3xl tracking-wider`}
    >
      {pathname === "/update-user-information"
        ? "Update Your Profile"
        : "Complete Your Profile"}
    </h2>
  );
};

const UserInformationForm = ({ isLoading, setisLoading }) => {
  const { state, pathname } = useLocation();

  const dispatch = useDispatch((state) => state);

  const [signUpForm, setsignUpForm] = useState({
    userName: state?.name || "",
    description: state?.description || "",
  });

  const { userName, description } = signUpForm;

  const inputFile = useRef(null);
  const [selectedImage, setselectedImage] = useState(
    state?.profilePic || undefined
  );
  // const [pickedInterests, setpickedInterests] = useState([]);

  const handleChange = (e) => {
    setsignUpForm({
      ...signUpForm,
      [e.target.name]: e.target.value,
    });
  };

  const makeProfile = async () => {
    if (userName === "" || description === "") {
      infoMessage("Please fill all the fields");
      return;
    }
    await createUserProfile(userName, description, selectedImage, setisLoading);
  };

  const updateProfile = async () => {
    if (userName === "" || description === "") {
      infoMessage("Please fill all the fields");
      return;
    }
    await updateUserProfile(
      userName,
      description,
      selectedImage,
      setisLoading,
      dispatch
    );
  };

  const imageSelector = () =>
    selectedImage?.toString()?.startsWith("https://")
      ? selectedImage
      : URL.createObjectURL(selectedImage);

  return (
    <Fragment>
      <div className="w-full ">
        <div className="relative w-16 h-16 lg:w-32 lg:h-32 mx-auto cursor-pointer">
          <img
            className="rounded-full border-2 border-gray-100 shadow-sm w-16 h-16 lg:w-32 lg:h-32 object-cover"
            src={!selectedImage ? NoProfileImage : imageSelector()}
            alt="profile pic"
            onClick={() => selectedImage && window.open(selectedImage)}
          />
          <div className="absolute bottom-0 right-0 lg:right-5 bg-lightBgColor rounded-full w-5 h-5 text-center shadow-2xl">
            <div>
              <input
                type="file"
                id="file"
                accept="image/*"
                ref={inputFile}
                style={{ display: "none" }}
                onChange={(e) => {
                  setselectedImage(e.target.files[0]);
                }}
              />

              <i
                className="fas fa-plus"
                style={{ color: "#2299ff" }}
                onClick={() => {
                  inputFile.current.click();
                }}
              ></i>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="text-sm font-bold text-lightPostTextStyleColor dark:text-gray-300 tracking-wide">
          Name
        </div>
        <input
          className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 dark:bg-darkBgColor"
          type="email"
          placeholder="Write Your Name Here"
          required
          name="userName"
          value={userName}
          onChange={handleChange}
          maxLength="40"
        />
      </div>
      <div className="mt-8">
        <div className="flex justify-between items-center">
          <div className="text-sm font-bold text-lightPostTextStyleColor dark:text-gray-300 tracking-wide">
            Description
          </div>
        </div>
        <textarea
          className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 dark:bg-darkBgColor scroller"
          type="password"
          placeholder="Write About Yourself"
          required
          name="description"
          value={description}
          onChange={handleChange}
          maxLength="300"
        />
      </div>

      {/* <ChoicesSection
        pickedInterests={pickedInterests}
        setpickedInterests={setpickedInterests}
      /> */}

      <div className="mt-3 sm:mt-10 pb-5">
        {!isLoading ? (
          <button
            className={`bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                    font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                                    shadow-lg`}
            onClick={
              pathname === "/update-user-information"
                ? updateProfile
                : makeProfile
            }
          >
            {pathname === "/update-user-information"
              ? "Update My Profile"
              : "Complete My Profile"}
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

// const ChoicesSection = ({ pickedInterests, setpickedInterests }) => {
//   const topics = [
//     "comedy",
//     "drama",
//     "romance",
//     "horror",
//     "action",
//     "adventure",
//     "coding",
//     "cooking",
//     "art",
//     "sports",
//   ];

//   return (
//     <div className="mt-5">
//       <h1 className="">Select at least 2 topics that excites you 😍</h1>
//       <div className="flex flex-wrap justify-center mt-3">
//         {topics.map((topic, index) => {
//           return (
//             <Topic
//               key={index}
//               topic={topic}
//               pickedInterests={pickedInterests}
//               onClick={() =>
//                 setpickedInterests(
//                   pickedInterests.includes(topic)
//                     ? pickedInterests.filter((interest) => interest !== topic)
//                     : [...pickedInterests, topic]
//                 )
//               }
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// const Topic = ({ topic, onClick, pickedInterests }) => {
//   return (
//     <div
//       className={`${
//         pickedInterests.includes(topic)
//           ? "border-green-500"
//           : "bg-slate-500 border-slate-500"
//       } border-2 px-2 m-3 rounded-full cursor-pointer`}
//       onClick={onClick}
//     >
//       {topic}
//     </div>
//   );
// };

export default UserInformationTakingComponent;
