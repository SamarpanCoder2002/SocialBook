import { Fragment, useState } from "react";
import { Dropzone, FileItem, FullScreenPreview } from "@dropzone-ui/react";
import BaseCommonPart from "./base";
import { useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";

const PostScreen = () => {
  const [mediaOptions, setmediaOptions] = useState(-1);

  return (
    <BaseCommonPart>
      <div className="h-screen bg-lightBgColor dark:bg-darkBgColor pt-3 overflow-y-scroll suggested-profiles-container pb-10">
        <div className="container mx-auto px-4 sm:px-6 md:px-4 lg:px-8 2xl:px-96 py-1">
          <div className="text-lightPostTextStyleColor dark:text-darkPostTextStyleColor bg-lightElevationColor dark:bg-darkElevationColor p-3 rounded-lg">
            <HeadingSection setmediaOptions={setmediaOptions} />
            <MiddleSidePostWritingSection />
            <LowerExtraMediaSection
              mediaOptions={mediaOptions}
              setmediaOptions={setmediaOptions}
            />
          </div>

          <CreatePostButtonComponent />
        </div>
      </div>
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

const MiddleSidePostWritingSection = () => {
  return (
    <div className="mt-3 h-60 md:h-72">
      <textarea
        className="w-full bg-lightElevationColor dark:bg-darkElevationColor focus:outline-none rounded-lg p-3 resize-none min-h-full"
        placeholder="Write Something Here"
      ></textarea>
    </div>
  );
};

const LowerExtraMediaSection = ({ mediaOptions, setmediaOptions }) => {
  return (
    <div>
      {mediaOptions >= 0 && (
        <div className="w-full mt-3">
          {/* For Cancel Media Section */}
          <div
            className="float-right p-3 cursor-pointer"
            onClick={() => setmediaOptions(-1)}
          >
            <i className="fas fa-times fa-md 2xl:fa-lg text-black dark:text-white"></i>
          </div>

          {/* Media Content */}
          {(mediaOptions === 0 && <PictureSection />) ||
            ((mediaOptions === 1 || mediaOptions === 2) && (
              <YTVideoAndPdfComponent mediaOptions={mediaOptions} />
            )) ||
            (mediaOptions === 3 && <CreateSlide />)}
        </div>
      )}
    </div>
  );
};

const PictureSection = ({ maxFiles }) => {
  const [files, setFiles] = useState([]);
  const [imageSrc, setImageSrc] = useState(undefined);
  const { darkMode } = useSelector((state) => state);

  const updateFiles = (incommingFiles) => {
    setFiles(incommingFiles);

    console.log(files);
  };
  const handleDelete = (id) => {
    setFiles(files.filter((x) => x.id !== id));
  };

  const handleSee = (imageSource) => {
    setImageSrc(imageSource);
  };

  return (
    <div className="">
      <Dropzone
        onChange={updateFiles}
        value={files}
        clickable={"true"}
        maxFiles={maxFiles || 8}
        maxFileSize={1048576}
        onClean={() => setFiles([])}
        accept={"image/jpeg,png"}
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

const YTVideoAndPdfComponent = ({ mediaOptions }) => {
  const [enteredLink, setenteredLink] = useState("");
  const [viewComponent, setviewComponent] = useState(false);

  const handleChange = (e) => {
    setenteredLink(e.target.value);
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
      <div className="relative flex z-50 bg-lightBgColor dark:bg-darkBgColor rounded-full mb-3">
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

const CreatePostButtonComponent = () => {
  return (
    <div className="w-full text-center mt-5">
      <button
        className="bg-green-600 hover:bg-green-400 text-lg text-white font-semibold py-3 px-6 rounded-3xl tracking-wider"
        style={{ boxShadow: "0px 0px 5px rgba(0,0,0,0.4)" }}
      >
        Create Post
      </button>
    </div>
  );
};

const CreateSlide = () => {
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

                    console.log(postData);
                  } else {
                    alert(
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

      <SlideDataShowCase postData={postData} setpostData={setpostData} />
    </Fragment>
  );
};

const SlideDataShowCase = ({ postData, setpostData }) => {
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
            />
          );
        })}
      </Carousel>
    </div>
  );
};

const SliderImageSection = ({ postData, setpostData, particularSlider }) => {
  return (
    <div>
      <button
        className="absolute p-3 px-10 top-0 left-0"
        onClick={() => {
          setpostData(postData.filter((item) => item !== particularSlider));
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
}) => {
  return (
    <div className="text-justify p-2 text-white h-60 md:h-72">
      <button
        className="absolute p-3 px-10 top-0 right-0 "
        onClick={() => {
          setpostData(postData.filter((item) => item !== particularSlider));
        }}
      >
        <i class="far fa-trash-alt fa-lg z-50" style={{ color: "red" }}></i>
      </button>
      <textarea
        className="w-full bg-lightBgColor dark:bg-darkBgColor focus:outline-none rounded-lg p-3 resize-none min-h-full text-black dark:text-white"
        defaultValue={particularSlider.text || ""}
        placeholder="Write Something Here"
        onChange={(e) => {
          /// Add Changed text in postData
          postData[index].text = e.target.value;
          setpostData([...postData]);

          console.log(postData);
        }}
      />
    </div>
  );
};

export default PostScreen;
