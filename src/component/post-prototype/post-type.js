import { Fragment } from "react";
import Masonry from "react-masonry-css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import React from "react";
import { LeafPoll } from "react-leaf-polls";
import "react-leaf-polls/dist/index.css";
import { useSelector } from "react-redux";
import Linkify from "react-linkify";
import ShowMoreText from "react-show-more-text";
import { updatePollData } from "./helper/api_call";
import { getDataFromLocalStorage } from "../common/local-storage-management";
import { infoMessage } from "../common/desktop-notification";
import parse from "html-react-parser";

export const TextPost = ({ postData }) => {
  return (
    <div className="bg-lightElevationColor dark:bg-darkElevationColor p-2 special-text text-sm font-thin">
      <Linkify>
        <ShowMoreText
          lines={3}
          more="show more"
          less="show less"
          className="content-css"
          anchorClass="my-anchor-css-class"
          expanded={false}
        >
          {parse(`${postData.content?.text}`)}
        </ShowMoreText>
      </Linkify>
    </div>
  );
};

export const ImagePost = ({ postData }) => {
  const breakpointColumnsObj = {
    default: postData.content?.imagesCollection?.length < 4 ? 2 : 4,
  };

  return (
    <Fragment>
      <TextPost postData={postData} />
      <div
        className={
          postData.content?.imagesCollection?.length === 1
            ? "bg-lightElevationColor dark:bg-darkElevationColor mb-1"
            : "bg-lightElevationColor dark:bg-darkElevationColor w-full max-h-screen mb-1"
        }
      >
        {(postData.content?.imagesCollection?.length === 1 && (
          <img
            src={postData.content?.imagesCollection[0]}
            alt="post"
            className="max-h-screen mx-auto object-cover w-full cursor-pointer"
            onClick={() => {
              window.open(postData.content?.imagesCollection[0], "_blank");
            }}
          />
        )) || (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid pr-3 w-full"
            columnClassName="my-masonry-grid_column"
            align="center"
          >
            {postData.content?.imagesCollection?.length > 0 &&
              postData.content?.imagesCollection?.map(
                (particularImg, index) => (
                  <img
                    src={particularImg}
                    alt="post"
                    className="mx-auto object-cover mb-2 cursor-pointer rounded-md"
                    key={index}
                    onClick={() => window.open(particularImg, "_blank")}
                  />
                )
              )}
          </Masonry>
        )}
      </div>
    </Fragment>
  );
};

export const VideoPost = ({ postData }) => {
  return (
    <Fragment>
      <TextPost postData={postData} />
      <div
        className={
          "bg-lightElevationColor dark:bg-darkElevationColor w-full max-h-screen mb-1"
        }
      >
        {/* Video Share link should be customized to embed version */}
        <iframe
          width="100%"
          height="315"
          src={`https://www.youtube.com/embed/${postData.content?.video
            .toString()
            .split("/")
            .pop()}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </Fragment>
  );
};

export const SliderPost = ({ postData }) => {
  return (
    <Fragment>
      <TextPost postData={postData} />
      <Carousel
        infiniteLoop={true}
        dynamicHeight={true}
        renderThumbs={() => {}}
      >
        {postData.content?.slidesCollection?.map((particularSlider, index) => {
          if (particularSlider.type === "image") {
            return (
              <div key={index}>
                <img
                  src={particularSlider.data}
                  alt={particularSlider.alt}
                  className="mx-auto object-cover mb-2 cursor-pointer"
                  onClick={() =>
                    window.open(particularSlider.content, "_blank")
                  }
                />
              </div>
            );
          }

          return (
            <div
              className="text-justify px-5 py-8 bg-lightBgColor dark:bg-darkBgColor text-lightPostTextStyleColor dark:text-darkPostTextStyleColor border border-lightElevationColor dark:border-darkElevationColor font-thin text-sm"
              key={index}
            >
              {particularSlider.data}
            </div>
          );
        })}
      </Carousel>
    </Fragment>
  );
};

export const PdfPost = ({ postData }) => {
  return (
    <Fragment>
      <TextPost postData={postData} />
      <iframe
        src={postData.content?.pdfSrc}
        style={{ width: "100%", height: "500px" }}
        frameBorder="0"
        title="PDF Reader"
        allowFullScreen
      ></iframe>
    </Fragment>
  );
};

export const PollPost = ({ postData }) => {
  const { darkMode } = useSelector((state) => state);
  const storedData = getDataFromLocalStorage();

  const vote = (item, results) => {
    const newResults = results.map((result) => {
      return { text: result.text, votes: result.votes };
    });

    const updatedData = {
      content: postData.content || {},
      postHolderId: postData.postHolderId,
      type: postData.type,
      voterIds: postData.voterIds
        ? [...postData.voterIds, storedData?.user]
        : [storedData?.user],
    };

    updatedData.content.prevResults = newResults;

    updatePollData(updatedData, postData.postId);
  };

  const customTheme = {
    textColor: darkMode ? "#fff" : "#303338",
    mainColor: "#00B87B",
    backgroundColor: darkMode ? "#334247" : "#d3dbde",
    alignment: "center",
  };

  return (
    <Fragment>
      <TextPost postData={postData} />
      <div
        className="p-3"
        style={{ background: darkMode ? "#2a353a" : "#fff" }}
      >
        <LeafPoll
          type="multiple"
          question={postData.content?.question}
          results={postData.content?.prevResults || []}
          theme={customTheme}
          open={false}
          onVote={() => {
            
            if (!postData.voterIds?.includes(storedData?.user))
              vote(null, postData.content?.prevResults);
            else {
              infoMessage(
                "You Already Voted Before... This result not recorded",
                1500
              );
            }
          }}
        />
      </div>
    </Fragment>
  );
};
