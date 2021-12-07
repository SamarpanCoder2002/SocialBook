import { useState } from "react";
import { Dropzone, FileItem, FullScreenPreview } from "@dropzone-ui/react";
import BaseCommonPart from "./base";
import { useSelector } from "react-redux";

const PostScreen = () => {
  const [mediaOptions, setmediaOptions] = useState(-1);

  return (
    <BaseCommonPart>
      <div className="h-screen bg-lightBgColor dark:bg-darkBgColor pt-3 overflow-y-scroll suggested-profiles-container pb-10">
        <div className="container mx-auto px-4 sm:px-6 md:px-4 lg:px-8 2xl:px-96 py-1">
          <div className="text-lightPostTextStyleColor dark:text-darkPostTextStyleColor bg-lightElevationColor dark:bg-darkElevationColor p-3 rounded-lg">
            <HeadingSection setmediaOptions={setmediaOptions} />
            <MiddleSidePostWritingSection />
            <LowerExtraMediaSection mediaOptions={mediaOptions} />
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
        className="w-full bg-lightBgColor dark:bg-darkBgColor focus:outline-none rounded-lg p-3 resize-none min-h-full"
        placeholder="Write Something Here"
      ></textarea>
    </div>
  );
};

const LowerExtraMediaSection = ({ mediaOptions }) => {
  if (mediaOptions === 0) return <PictureSection />;
  else if (mediaOptions === 1 || mediaOptions === 2)
    return <YTVideoAndPdfComponent mediaOptions={mediaOptions} />;

  return <></>;
};

const PictureSection = () => {
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
    <div className="mt-10">
      <Dropzone
        onChange={updateFiles}
        value={files}
        clickable={"true"}
        maxFiles={8}
        maxFileSize={1048576}
        onClean={() => setFiles([])}
        accept={"image/jpeg,png"}
        label={"Drop Files here or click to browse"}
        minHeight={"195px"}
        maxHeight={"500px"}
        backgroundColor={darkMode ? "#192428" : "#f3f3f3"}
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
      <div className="relative flex z-50 bg-lightBgColor dark:bg-darkBgColor rounded-full mb-3 mt-5">
        <input
          type="text"
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

export default PostScreen;
