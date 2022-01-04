import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PostTypes } from "../../types/posttypes";
import { DesktopNotification } from "../main-helper/desktop-notification";
import { getDataFromLocalStorage } from "../main-helper/local-storage-management";
import BaseCommonPart from "../page-builder/base";
import CommonPostStyle from "../post-prototype/post-common-style";
import Waiting from "../main-helper/waiting";
import { fetchFeedPosts } from "./helper/api_call";

const HomePage = () => {
  console.log("Home page");

  const testing = [
    {
      id: 1,
      type: PostTypes.Poll,
      content: {
        text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the
        1500s, when an unknown printer took a galley of type and scrambled it to
        make a type specimen book. It has survived not only five centuries, but
        also the leap into electronic typesetting, remaining essentially
        unchanged. My Website: https://samarpandasgupta.com It was popularised in the 1960s with the release of Letraset
        sheets containing Lorem Ipsum passages, and more recently with desktop
        publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        pollItems: {
          question: "Do you like this?",
          prevResults: [
            { text: "Yes", votes: 2 },
            { text: "No", votes: 0 },
            { text: "Fucking You", votes: 1 },
          ],
        },
      },
      engagement: {
        likes: 17,
        shares: 30,
        comments: 100,
      },
    },
    {
      id: 2,
      type: PostTypes.Pdf,
      content: {
        text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the
        1500s, when an unknown printer took a galley of type and scrambled it to
        make a type specimen book. It has survived not only five centuries, but
        also the leap into electronic typesetting, remaining essentially
        unchanged. It was popularised in the 1960s with the release of Letraset
        sheets containing Lorem Ipsum passages, and more recently with desktop
        publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        pdfSrc:
          "https://drive.google.com/file/d/1wgfgmiY1e1bXNb1IwOtvf__T2bFym3Dr/view?usp=sharing",
      },
      engagement: {
        likes: 17,
        shares: 30,
        comments: 100,
      },
    },
    {
      id: 3,
      type: PostTypes.Slide,
      content: {
        text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the
        1500s, when an unknown printer took a galley of type and scrambled it to
        make a type specimen book. It has survived not only five centuries, but
        also the leap into electronic typesetting, remaining essentially
        unchanged. It was popularised in the 1960s with the release of Letraset
        sheets containing Lorem Ipsum passages, and more recently with desktop
        publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        sliderContent: [
          {
            type: "image",
            data: "https://images.pexels.com/photos/9469740/pexels-photo-9469740.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            alt: "type1",
          },
          {
            type: "text",
            data: ` Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled it to
            make a type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining essentially
            unchanged. It was popularised in the 1960s with the release of Letraset
            sheets containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
          },
          {
            type: "text",
            data: ` 
            
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled it to
            make a type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining essentially
            unchanged. It was popularised in the 1960s with the release of Letraset
            sheets containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled it to
            make a type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining essentially
            unchanged. It was popularised in the 1960s with the release of Letraset
            sheets containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            
            `,
          },
          {
            type: "image",
            data: "https://images.pexels.com/photos/239332/pexels-photo-239332.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            alt: "type2",
          },
          {
            type: "image",
            data: "https://images.pexels.com/photos/326869/pexels-photo-326869.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            alt: "type3",
          },
        ],
      },
      engagement: {
        likes: 17,
        shares: 30,
        comments: 100,
      },
    },
    {
      id: 4,
      type: PostTypes.Image,
      content: {
        text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the
        1500s, when an unknown printer took a galley of type and scrambled it to
        make a type specimen book. It has survived not only five centuries, but
        also the leap into electronic typesetting, remaining essentially
        unchanged. It was popularised in the 1960s with the release of Letraset
        sheets containing Lorem Ipsum passages, and more recently with desktop
        publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        image: [
          "https://images.pexels.com/photos/10334730/pexels-photo-10334730.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          "https://media-exp1.licdn.com/dms/image/C4D22AQEQR3bplOU6fQ/feedshare-shrink_800/0/1638455528983?e=1641427200&v=beta&t=c0Gi_SfKPk1HeElJdGuuIijA1twgv78GnfSZz3LNbMo",
          "https://images.pexels.com/photos/9469740/pexels-photo-9469740.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          "https://images.pexels.com/photos/9990682/pexels-photo-9990682.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
          "https://images.pexels.com/photos/9811066/pexels-photo-9811066.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
          "https://images.pexels.com/photos/9902092/pexels-photo-9902092.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
          "https://images.pexels.com/photos/9697495/pexels-photo-9697495.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
          "https://images.pexels.com/photos/8654494/pexels-photo-8654494.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        ],
      },
      engagement: {
        likes: 17,
        shares: 30,
        comments: 100,
      },
    },
    {
      id: 5,
      type: PostTypes.Image,
      content: {
        text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the
        1500s, when an unknown printer took a galley of type and scrambled it to
        make a type specimen book. It has survived not only five centuries, but
        also the leap into electronic typesetting, remaining essentially
        unchanged. It was popularised in the 1960s with the release of Letraset
        sheets containing Lorem Ipsum passages, and more recently with desktop
        publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        image: [
          "https://media-exp1.licdn.com/dms/image/sync/C4D22AQEF9kFztmZ8dQ/feedshare-shrink_800/0/1613556518572?e=1641427200&v=beta&t=z7LtBhcY0UmyHEWXL__3ps7x9DadyAb_JllcQJqLcp0",
        ],
      },
      engagement: {
        likes: 17,
        shares: 30,
        comments: 100,
      },
    },
    {
      id: 6,
      type: PostTypes.Video,
      content: {
        text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the
        1500s, when an unknown printer took a galley of type and scrambled it to
        make a type specimen book. It has survived not only five centuries, but
        also the leap into electronic typesetting, remaining essentially
        unchanged. It was popularised in the 1960s with the release of Letraset
        sheets containing Lorem Ipsum passages, and more recently with desktop
        publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        video: "https://www.youtube.com/embed/ZO6RGhYAhuc",
      },
      engagement: {
        likes: 17,
        shares: 30,
        comments: 100,
      },
    },
    {
      id: 7,
      type: PostTypes.Text,
      content: {
        text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the
        1500s, when an unknown printer took a galley of type and scrambled it to
        make a type specimen book. It has survived not only five centuries, but
        also the leap into electronic typesetting, remaining essentially
        unchanged. It was popularised in the 1960s with the release of Letraset
        sheets containing Lorem Ipsum passages, and more recently with desktop
        publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      },
      engagement: {
        likes: 17,
        shares: 30,
        comments: 100,
      },
    },
    {
      id: 8,
      type: PostTypes.Text,
      content: {
        text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the
        1500s, when an unknown printer took a galley of type and scrambled it to
        make a type specimen book. It has survived not only five centuries, but
        also the leap into electronic typesetting, remaining essentially
        unchanged. It was popularised in the 1960s with the release of Letraset
        sheets containing Lorem Ipsum passages, and more recently with desktop
        publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      },
      engagement: {
        likes: 17,
        shares: 30,
        comments: 100,
      },
    },
    {
      id: 9,
      type: PostTypes.Text,
      content: {
        text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the
        1500s, when an unknown printer took a galley of type and scrambled it to
        make a type specimen book. It has survived not only five centuries, but
        also the leap into electronic typesetting, remaining essentially
        unchanged. It was popularised in the 1960s with the release of Letraset
        sheets containing Lorem Ipsum passages, and more recently with desktop
        publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      },
      engagement: {
        likes: 17,
        shares: 30,
        comments: 100,
      },
    },
  ];

  return (
    <BaseCommonPart>
      <div className="h-auto min-h-[92vh] bg-lightBgColor dark:bg-darkBgColor pt-1">
        <div className="container mx-auto px-4 sm:px-6 md:px-4 lg:px-0 2xl:px-96 py-1">
          <div className="flex flex-wrap text-lightPostTextStyleColor dark:text-darkPostTextStyleColor justify-center">
            <LeftProfileShortSection />
            <RightFeedSection testing={testing} />
          </div>
        </div>
      </div>
      <DesktopNotification />
    </BaseCommonPart>
  );
};

const LeftProfileShortSection = () => {
  const desc =
    "Dwayne Douglas Johnson, also known by his ring name The Rock, is an American actor, producer, businessman, and former professional wrestler. Regarded as one of the greatest professional wrestlers of all time, he wrestled for WWE for eight years prior to pursuing an acting career. ";

  const { darkMode } = useSelector((state) => state);
  const navigate = useNavigate();

  return (
    <div className="h-2/6 w-full lg:w-1/5 mb-5 bg-lightElevationColor dark:bg-darkElevationColor rounded-lg lg:mr-5 p-3 flex flex-col text-lightPostTextStyleColor dark:text-darkPostTextStyleColor shadow-lg">
      <div className="w-full ">
        <div className="relative w-16 h-16 lg:w-24 lg:h-24 mx-auto">
          <img
            className="rounded-full border-2 border-gray-100 shadow-sm"
            src="https://www.newsbox.pk/wp-content/uploads/2019/08/the-rock-2.jpg"
            alt="profile pic"
          />
        </div>
      </div>

      <div>
        <div className="flex flex-col justify-center items-center">
          <div className="text-center">
            <h1 className="text-xl font-semibold">Dwayne Johnson</h1>
            <h2 className="text-sm mt-3">{desc}</h2>
          </div>
        </div>
      </div>

      <div>
        <button
          className={`${
            darkMode ? "hover:bg-blue-800" : "hover:bg-blue-400"
          } mt-5 text-lightPrimaryFgColor dark:text-darkPrimaryFgColor px-2 py-1 rounded-3xl w-full border-darkPrimaryFgColor  hover:bg-opacity-30  transition-all duration-300`}
          style={{ borderWidth: "0.2px" }}
          onClick={() => {
            const result = getDataFromLocalStorage();

            if (result) {
              const { user } = result;
              navigate(`/${user}/profile`);
            }
          }}
        >
          Visit Profile
        </button>
      </div>
    </div>
  );
};

const RightFeedSection = ({ testing }) => {
  const [feedDataCollection, setfeedDataCollection] = useState([]);
  const [page, setpage] = useState(1);
  const [isLoading, setisLoading] = useState(true);
  const [lastElement, setLastElement] = useState(null);
  const [noMorePostFound, setnoMorePostFound] = useState(false);

  const observer = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        setpage((no) => no + 1);
      }
    })
  );

  useEffect(() => {
    fetchFeedPosts(page).then((data) => {
      if (!data) {
        setnoMorePostFound(true);
        return;
      }
      setfeedDataCollection((prev) => [...prev, ...data]);
      setisLoading(false);
    });
  }, [page]);

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;
    if (currentElement) currentObserver.observe(currentElement);
    return () => currentElement && currentObserver.unobserve(currentElement);
  }, [lastElement]);

  return (
    <div className="h-[90vh] overflow-y-scroll suggested-profiles-container w-full lg:w-1/2  suggested-profiles-container rounded-lg">
      {/* Data Loading Section */}
      {isLoading && (
        <Waiting
          showName="Hang tight... Data Fetching in Progress "
          largeScreenPadding="xl:px-60"
          lightBgColor="bg-lightElevationColor"
          darkBgColor="bg-darkElevationColor"
        />
      )}

      {/* Data Show Section */}
      {!isLoading &&
        feedDataCollection.map((feedData, index) => {
          return index === feedDataCollection.length - 1 ? (
            <div key={index} ref={setLastElement}>
              <CommonPostStyle item={feedData} allowCommentSection={false} />
            </div>
          ) : (
            <CommonPostStyle
              key={index}
              item={feedData}
              allowCommentSection={false}
            />
          );
        })}

      {/* Post Found Based on Pagination */}
      {!isLoading && (
        <div className="text-center">
          <h1 className="text-xl font-semibold text-blue-400 my-5">
            {noMorePostFound ? " No More Post Found..." : "Loading..."}
          </h1>
        </div>
      )}
    </div>
  );
};

export default HomePage;
