import { Fragment, useState } from "react";
import { Dropzone, FileItem, FullScreenPreview } from "@dropzone-ui/react";
import { useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import BaseCommonPart from "../page-builder/base";
import {
  DesktopNotification,
  infoMessage,
} from "../common/desktop-notification";
import {
  makeDocumentPost,
  makeImagePost,
  makePollPost,
  makeSlidePost,
  makeTextPost,
  makeVideoPost,
} from "./helper/api_call";
import { useNavigate } from "react-router-dom";
import { PostTypes } from "../../types/types";

const PostScreen = () => {
  const [mediaOptions, setmediaOptions] = useState(-1);
  const [textContent, settextContent] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [mediaContentInformation, setmediaContentInformation] = useState({
    mediaType: PostTypes.Text,
    mediaData: "",
  });

  return (
    <BaseCommonPart isLoading={isLoading}>
      <div className="h-screen bg-lightBgColor dark:bg-darkBgColor pt-3 overflow-y-scroll suggested-profiles-container pb-10">
        <div className="container mx-auto px-4 sm:px-6 md:px-4 lg:px-8 2xl:px-96 py-1">
          <div className="text-lightPostTextStyleColor dark:text-darkPostTextStyleColor bg-lightElevationColor dark:bg-darkElevationColor p-3 rounded-lg shadow-lg">
            <HeadingSection setmediaOptions={setmediaOptions} />
            <MiddleSidePostWritingSection
              settextContent={settextContent}
              textContent={textContent}
            />
            <LowerExtraMediaSection
              mediaOptions={mediaOptions}
              setmediaOptions={setmediaOptions}
              setmediaContentInformation={setmediaContentInformation}
            />
          </div>

          <CreatePostButtonComponent
            textContent={textContent}
            setisLoading={setisLoading}
            isLoading={isLoading}
            mediaContentInformation={mediaContentInformation}
          />
        </div>
      </div>
      <DesktopNotification />
    </BaseCommonPart>
  );
};

const HeadingSection = ({ setmediaOptions }) => {
  return (
    <div className="flex flex-wrap w-full justify-between items-center">
      <div className="font-semibold text-lg tracking-widest text-green-600 dark:text-green-400 p-3 w-full sm:w-auto text-center">
        <i className="fas fa-pencil-alt"></i> Write a Post
      </div>
      <div className="flex flex-wrap w-full sm:w-auto items-center justify-center">
        <div className="post-options" onClick={() => setmediaOptions(0)}>
          <i className="far fa-image fa-lg block text-yellow-500 "></i>
          <span className="post-option-tooltip text-yellow-500  tracking-wider">
            Image
          </span>
        </div>
        <div className="post-options" onClick={() => setmediaOptions(1)}>
          <i className="fab fa-youtube fa-lg block text-red-500 "></i>
          <span className="post-option-tooltip text-red-500  tracking-wider">
            Video
          </span>
        </div>
        <div className="post-options" onClick={() => setmediaOptions(2)}>
          <i className="far fa-file-pdf fa-lg block text-blue-500 "></i>
          <span className="post-option-tooltip text-blue-500  tracking-wider">
            Pdf
          </span>
        </div>
        <div className="post-options" onClick={() => setmediaOptions(3)}>
          <i className="fab fa-slideshare fa-lg block text-pink-500 "></i>
          <span className="post-option-tooltip text-pink-500  tracking-wider">
            Slide
          </span>
        </div>
        <div className="post-options" onClick={() => setmediaOptions(4)}>
          <i className="far fa-chart-bar fa-lg block text-green-500 "></i>
          <span className="post-option-tooltip text-green-500  tracking-wider">
            Poll
          </span>
        </div>
      </div>
    </div>
  );
};

const MiddleSidePostWritingSection = ({ settextContent, textContent }) => {
  return (
    <textarea
      className="textarea w-full bg-lightElevationColor dark:bg-darkElevationColor focus:outline-none p-3 scroller whitespace-pre-wrap"
      style={{ minHeight: "200px" }}
      onChange={(e) => {
        settextContent(e.target.value);
      }}
    ></textarea>
  );
};

const LowerExtraMediaSection = ({
  mediaOptions,
  setmediaOptions,
  setmediaContentInformation,
}) => {
  return (
    <div>
      {mediaOptions >= 0 && (
        <div className="w-full">
          {/* For Cancel Media Section */}
          <div
            className="p-3 w-full flex flex-wrap justify-between items-center"
            onClick={() => {
              setmediaOptions(-1);
              setmediaContentInformation({
                mediaType: PostTypes.Text,
                mediaData: "",
              });
            }}
          >
            <div className="font-semibold tracking-wider text-green-600 dark:text-green-400">
              Add External Content
            </div>
            <div className="px-3">
              <i className="fas fa-times fa-md 2xl:fa-lg text-black dark:text-white"></i>
            </div>
          </div>

          {/* Media Content */}
          {(mediaOptions === 0 && (
            <PictureSection
              setmediaContentInformation={setmediaContentInformation}
            />
          )) ||
            ((mediaOptions === 1 || mediaOptions === 2) && (
              <YTVideoAndPdfComponent
                mediaOptions={mediaOptions}
                setmediaContentInformation={setmediaContentInformation}
              />
            )) ||
            (mediaOptions === 3 && (
              <CreateSlide
                setmediaContentInformation={setmediaContentInformation}
              />
            )) ||
            (mediaOptions === 4 && (
              <CreatePoll
                setmediaContentInformation={setmediaContentInformation}
              />
            ))}
        </div>
      )}
    </div>
  );
};

const PictureSection = ({ maxFiles, setmediaContentInformation }) => {
  const [files, setFiles] = useState([]);
  const [imageSrc, setImageSrc] = useState(undefined);
  const { darkMode } = useSelector((state) => state);

  const updateFiles = (incommingFiles) => {
    setFiles(incommingFiles);

    setmediaContentInformation({
      mediaType: PostTypes.Image,
      mediaData: incommingFiles.filter((file) => file.valid),
    });
  };
  const handleDelete = (id) => {
    setFiles(files.filter((x) => x.id !== id));
  };

  const handleSee = (imageSource) => {
    setImageSrc(imageSource);
  };

  return (
    <div>
      <Dropzone
        onChange={updateFiles}
        value={files}
        clickable={"true"}
        maxFiles={maxFiles || 8}
        maxFileSize={1048576}
        onClean={() => setFiles([])}
        accept={"image/jpeg, image/png"}
        label={"Drop Files here or click to browse"}
        backgroundColor={darkMode ? "#192428" : "#f3f3f3"}
        className="z-50"
      >
        {files.map((file) => (
          <FileItem
            {...file}
            key={file.id}
            onDelete={handleDelete}
            onSee={handleSee}
            elevation={2}
            alwaysActive
            preview
            info
            hd
            resultOnTooltip
          />
        ))}

        <FullScreenPreview
          imgSource={imageSrc}
          openImage={imageSrc}
          onClose={(e) => handleSee(undefined)}
        />
      </Dropzone>
    </div>
  );
};

const YTVideoAndPdfComponent = ({
  mediaOptions,
  setmediaContentInformation,
}) => {
  const [enteredLink, setenteredLink] = useState("");
  const [viewComponent, setviewComponent] = useState(false);

  const handleChange = (e) => {
    setenteredLink(e.target.value);
    setmediaContentInformation({
      mediaType: mediaOptions === 1 ? PostTypes.Video : PostTypes.Pdf,
      mediaData: e.target.value,
    });
  };

  const handleView = (e) => {
    if (enteredLink.startsWith("http") || enteredLink.startsWith("https")) {
      if (
        mediaOptions === 1 &&
        enteredLink.includes("youtu") &&
        !enteredLink.includes("file") &&
        !enteredLink.includes("pdf")
      )
        setviewComponent(true);
      else if (
        mediaOptions === 2 &&
        (enteredLink.includes("file") || enteredLink.includes("pdf"))
      )
        setviewComponent(true);
      else {
        alert("Invalid Link");
        viewComponent && setviewComponent(false);
      }
    } else {
      alert("Please Enter Valid Link");
      viewComponent && setviewComponent(false);
    }
  };

  return (
    <div>
      <div className="relative flex z-50 bg-lightBgColor dark:bg-darkBgColor rounded-full mb-3 w-full">
        <input
          type="url"
          placeholder={
            mediaOptions === 1 ? "Enter Youtube Video Link" : "Enter Pdf Link"
          }
          className="rounded-3xl flex-1 px-6 py-4 text-gray-700 dark:text-white focus:outline-none bg-lightBgColor dark:bg-darkBgColor"
          onChange={(e) => handleChange(e)}
        />
        <button
          className="bg-green-300 dark:bg-indigo-700 px-10 rounded-3xl"
          onClick={handleView}
        >
          View
        </button>
      </div>
      {mediaOptions === 1 && viewComponent && (
        <ShowYTVideo enteredLink={enteredLink} />
      )}
      {mediaOptions === 2 && viewComponent && (
        <ShowPdf enteredLink={enteredLink} />
      )}
    </div>
  );
};

const ShowYTVideo = ({ enteredLink }) => {
  return (
    <div className="mt-5">
      <div className="container mx-auto md:px-10 lg:px-80 2xl:px-96">
        {enteredLink.includes("youtu") && !enteredLink.includes("pdf") && (
          <iframe
            title="Youtube Video"
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/${enteredLink
              .toString()
              .split("/")
              .pop()}`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          ></iframe>
        )}
      </div>
    </div>
  );
};

const ShowPdf = ({ enteredLink }) => {
  return (
    <div className="mt-5">
      <div className="container mx-auto md:px-20 lg:px-80 2xl:px-96">
        {(enteredLink.includes("file") || enteredLink.includes("pdf")) && (
          <iframe
            title="Pdf"
            width="100%"
            height="500"
            src={enteredLink}
            frameBorder="0"
            className="rounded-lg"
          ></iframe>
        )}
      </div>
    </div>
  );
};

const CreatePostButtonComponent = ({
  textContent,
  isLoading,
  setisLoading,
  mediaContentInformation,
}) => {
  const navigate = useNavigate();

  const handleMakePost = async () => {
    const formattedPostTextData = textContent
      .toString()
      .split("\n")
      .join("<br/>");

    if (mediaContentInformation.mediaType === PostTypes.Text) {
      if (!textContent || textContent.length === 0) return;
      setisLoading(true);
      await makeTextPost(formattedPostTextData);
      afterPostMake();
    } else if (mediaContentInformation.mediaType === PostTypes.Video) {
      setisLoading(true);
      await makeVideoPost(
        formattedPostTextData,
        mediaContentInformation.mediaData
      );
      afterPostMake();
    } else if (mediaContentInformation.mediaType === PostTypes.Pdf) {
      setisLoading(true);
      await makeDocumentPost(
        formattedPostTextData,
        mediaContentInformation.mediaData
      );
      afterPostMake();
    } else if (mediaContentInformation.mediaType === PostTypes.Poll) {
      setisLoading(true);
      const { question, options } = mediaContentInformation.mediaData;
      await makePollPost(formattedPostTextData, question, options);
      afterPostMake();
    } else if (mediaContentInformation.mediaType === PostTypes.Image) {
      setisLoading(true);
      await makeImagePost(
        formattedPostTextData,
        mediaContentInformation.mediaData.map((file) => file.file)
      );
      afterPostMake();
    } else if (mediaContentInformation.mediaType === PostTypes.Slide) {
      setisLoading(true);
      await makeSlidePost(
        formattedPostTextData,
        mediaContentInformation.mediaData
      );
      afterPostMake();
    }
  };

  const afterPostMake = () => {
    setisLoading(false);
    setTimeout(() => {
      navigate("/feed");
    }, 900);
  };

  return (
    <div className="w-full text-center mt-5">
      {!isLoading ? (
        <button
          className="dark:bg-green-600 bg-green-400 text-lg text-white font-semibold py-3 px-6 rounded-3xl tracking-wider"
          style={{ boxShadow: "0px 0px 5px rgba(0,0,0,0.4)" }}
          onClick={handleMakePost}
        >
          Create Post
        </button>
      ) : (
        <div className="text-center text-xl text-indigo-400 tracking-wider">
          Your Post is Creating.... Please Wait
        </div>
      )}
    </div>
  );
};

const CreateSlide = ({ setmediaContentInformation }) => {
  let [postData, setpostData] = useState([]);
  const [showImgUploadBtn, setshowImgUploadBtn] = useState(false);

  return (
    <Fragment>
      <div className="w-full">
        <div className="w-full  container mx-auto md:px-10 lg:px-60 2xl:px-96">
          <div className="md:flex md:flex-wrap w-full md:items-center justify-between">
            {/* To activate image button */}
            <button
              className="px-3 py-2 dark:bg-green-600 bg-green-400 text-white rounded-lg shadow-md block mb-5 w-full md:w-auto"
              onClick={() => {
                setshowImgUploadBtn(true);
              }}
            >
              Add Image
            </button>

            {/* For Image Upload Button */}
            {showImgUploadBtn && (
              <input
                type="file"
                name="pickedImage"
                accept="image/png, image/jpeg"
                className="block mb-5 "
                onChange={(e) => {
                  if (e.target.files[0].size <= 2097152) {
                    postData.push({ type: "image", file: e.target.files[0] });
                    setpostData([...postData]);

                    setshowImgUploadBtn(false);

                    setmediaContentInformation({
                      mediaType: PostTypes.Slide,
                      mediaData: postData,
                    });
                  } else {
                    infoMessage(
                      "Image Size is too large. Please upload image less than 2MB"
                    );
                  }
                }}
              />
            )}

            {/* To add text section */}
            <button
              className="px-3 py-2 dark:bg-green-600 bg-green-400 text-white rounded-lg shadow-md block w-full md:w-auto"
              onClick={() => {
                const temp = [];
                temp.push({ type: "text" });
                setpostData([...postData, ...temp]);
              }}
            >
              Add Text
            </button>
          </div>
        </div>
      </div>

      <SlideDataShowCase
        postData={postData}
        setpostData={setpostData}
        setmediaContentInformation={setmediaContentInformation}
      />
    </Fragment>
  );
};

const SlideDataShowCase = ({
  postData,
  setpostData,
  setmediaContentInformation,
}) => {
  return (
    <div className="mt-5 container mx-auto md:px-10 lg:px-80 2xl:px-96">
      <Carousel dynamicHeight={true} renderThumbs={() => {}}>
        {postData.map((particularSlider, index) => {
          if (particularSlider.type === "image") {
            return (
              <SliderImageSection
                key={index}
                postData={postData}
                particularSlider={particularSlider}
                setpostData={setpostData}
                index={index}
              />
            );
          }

          return (
            <SliderTextSection
              key={index}
              postData={postData}
              particularSlider={particularSlider}
              setpostData={setpostData}
              index={index}
              setmediaContentInformation={setmediaContentInformation}
            />
          );
        })}
      </Carousel>
    </div>
  );
};

const SliderImageSection = ({
  postData,
  setpostData,
  particularSlider,
  index,
}) => {
  return (
    <div>
      <button
        className="absolute p-3 px-10 top-0 left-0"
        onClick={() => {
          setpostData(postData.filter((item, i) => i !== index));
        }}
      >
        <i class="far fa-trash-alt fa-lg z-50" style={{ color: "red" }}></i>
      </button>
      <img src={URL.createObjectURL(particularSlider.file)} alt="local file" />
    </div>
  );
};

const SliderTextSection = ({
  postData,
  setpostData,
  particularSlider,
  index,
  setmediaContentInformation,
}) => {
  return (
    <div className="text-justify p-2 text-white h-60 md:h-72">
      <button
        className="absolute p-3 px-10 top-0 right-0 "
        onClick={() => {
          setpostData(postData.filter((item, i) => i !== index));
        }}
      >
        <i class="far fa-trash-alt fa-lg z-50" style={{ color: "red" }}></i>
      </button>
      <textarea
        className="w-full bg-lightBgColor dark:bg-darkBgColor focus:outline-none rounded-lg p-3 resize-none min-h-full text-black dark:text-white scroller"
        defaultValue={particularSlider.text || ""}
        placeholder="Write Something Here"
        onChange={(e) => {
          /// Add Changed text in postData
          postData[index].text = e.target.value;
          setpostData([...postData]);

          setmediaContentInformation({
            mediaType: PostTypes.Slide,
            mediaData: postData,
          });
        }}
      />
    </div>
  );
};

const CreatePoll = ({ setmediaContentInformation }) => {
  const [pollContainer, setpollContainer] = useState({
    question: "",
    options: [],
  });

  return (
    <div className="w-full container mx-auto md:px-10 lg:px-60 2xl:px-96">
      <input
        type="text"
        placeholder={"Enter Question Here"}
        className="rounded-3xl flex-1 px-6 py-4 text-gray-700 dark:text-white focus:outline-none bg-lightBgColor dark:bg-darkBgColor w-full"
        onChange={(e) => {
          pollContainer.question = e.target.value;
          setpollContainer({ ...pollContainer });
          setmediaContentInformation({
            mediaType: PostTypes.Poll,
            mediaData: pollContainer,
          });
        }}
      />

      <div className="flex flex-wrap mt-3 justify-center">
        {pollContainer.options.map((option, index) => {
          return (
            <div className="w-full md:w-1/2 p-2" key={index}>
              <input
                type="text"
                placeholder={"Enter Option Here"}
                className="rounded-3xl flex-1 px-6 py-4 text-gray-700 dark:text-white focus:outline-none bg-lightBgColor dark:bg-darkBgColor w-full"
                onChange={(e) => {
                  pollContainer.options[index] = e.target.value;
                  setpollContainer({ ...pollContainer });
                  setmediaContentInformation({
                    mediaType: PostTypes.Poll,
                    mediaData: pollContainer,
                  });
                }}
              />
            </div>
          );
        })}
      </div>

      <div className="w-full p-2 flex flex-wrap justify-between mt-5">
        <button
          className="px-3 py-2 dark:bg-green-600 bg-green-400 text-white rounded-lg shadow-md block w-full md:w-auto"
          onClick={() => {
            pollContainer.options.push("");
            setpollContainer({ ...pollContainer });
            setmediaContentInformation({
              mediaType: PostTypes.Poll,
              mediaData: pollContainer,
            });
          }}
        >
          Add Option
        </button>

        {pollContainer.options.length > 0 && (
          <button
            className="px-3 py-2 dark:bg-red-600 bg-red-400 text-white rounded-lg shadow-md block w-full md:w-auto mt-5 md:mt-0"
            onClick={() => {
              pollContainer.options.pop();
              setpollContainer({ ...pollContainer });
              setmediaContentInformation({
                mediaType: PostTypes.Poll,
                mediaData: pollContainer,
              });
            }}
          >
            Delete Last Option
          </button>
        )}
      </div>
    </div>
  );
};

export default PostScreen;
