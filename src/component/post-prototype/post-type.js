import { Fragment } from "react";
import parse from "html-react-parser";
import Masonry from "react-masonry-css";

export const TextPost = ({ postData }) => {
  return (
    <div className="bg-lightElevationColor dark:bg-darkElevationColor p-2 mb-1">
      {postData.content.text}
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
            className="max-h-screen mx-auto object-cover w-full"
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
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </Fragment>
  );
};
