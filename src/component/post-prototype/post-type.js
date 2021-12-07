import { Fragment, useState } from "react";
import Masonry from "react-masonry-css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import React from "react";
import { LeafPoll, Result } from "react-leaf-polls";
import "react-leaf-polls/dist/index.css";
import { useSelector } from "react-redux";
import linkify from "react-tiny-linkify";

export const TextPost = ({ postData }) => {
  return (
    <div className="bg-lightElevationColor dark:bg-darkElevationColor p-2 special-text">
      {linkify(postData.content.text)}
      {/* <ReactLinkify className="text-blue-600"> {postData.content.text} </ReactLinkify> */}
    </div>
  );
};

export const ImagePost = ({ postData }) => {
  const breakpointColumnsObj = {
    default: postData.content.image.length < 4 ? 2 : 4,
  };

  return (
    <Fragment>
      <TextPost postData={postData} />
      <div
        className={
          postData.content.image.length === 1
            ? "bg-lightElevationColor dark:bg-darkElevationColor mb-1"
            : "bg-lightElevationColor dark:bg-darkElevationColor w-full max-h-screen mb-1"
        }
      >
        {(postData.content.image.length === 1 && (
          <img
            src={postData.content.image[0]}
            alt="post"
            className="max-h-screen mx-auto object-cover w-full cursor-pointer"
            onClick={() => {window.open(postData.content.image[0], "_blank")}}
          />
        )) || (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid pr-3 w-full"
            columnClassName="my-masonry-grid_column"
            align="center"
          >
            {postData.content.image.length > 0 &&
              postData.content.image.map((particularImg, index) => (
                <img
                  src={particularImg}
                  alt="post"
                  className="mx-auto object-cover mb-2 cursor-pointer rounded-md"
                  key={index}
                  onClick={() => window.open(particularImg, "_blank")}
                />
              ))}
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
          src={postData.content.video}
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
        {postData.content.sliderContent.map((particularSlider, index) => {
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
            <div className="text-justify p-2 bg-blue-600 text-white" key={index}>
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
        src={postData.content.pdfSrc}
        style={{ width: "100%", height: "500px" }}
        frameborder="0"
        title="PDF Reader"
        allowfullscreen
      ></iframe>
    </Fragment>
  );
};

export const PollPost = ({ postData }) => {
  const { darkMode } = useSelector((state) => state);

  const customTheme = {
    textColor: darkMode ? "#fff" : "#303338",
    mainColor: "#00B87B",
    backgroundColor: darkMode ? "#2E363E" : "#e9e9e9",
    alignment: "center",
  };

  const vote = (item, results) => {
    // Here you probably want to manage
    // and return the modified data to the server.
  };

  return (
    <Fragment>
      <TextPost postData={postData} />
      <div
        className="p-3"
        style={{ background: darkMode ? "#2a353a" : "#e0e0e0" }}
      >
        <LeafPoll
          type="multiple"
          question={postData.content.pollItems.question}
          results={postData.content.pollItems.prevResults}
          theme={customTheme}
          onVote={vote}
        />
      </div>
    </Fragment>
  );
};
