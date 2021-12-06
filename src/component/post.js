import BaseCommonPart from "./base";

const PostScreen = () => {
  return (
    <BaseCommonPart>
      <div className="h-screen bg-lightBgColor dark:bg-darkBgColor pt-3">
        <div className="container mx-auto px-4 sm:px-6 md:px-4 lg:px-8 2xl:px-96 py-1">
          <div className="text-lightPostTextStyleColor dark:text-darkPostTextStyleColor bg-lightElevationColor dark:bg-darkElevationColor p-3 rounded-lg">
            <UpperSide />
            <LowerSide />
          </div>
        </div>
      </div>
    </BaseCommonPart>
  );
};

const UpperSide = () => {
  return (
    <div className="flex flex-wrap w-full justify-between items-center">
      <div className="font-semibold text-lg tracking-widest text-green-600 dark:text-green-400 p-3 w-full sm:w-auto text-center">
        <i className="fas fa-pencil-alt"></i> Write a Post
      </div>
      <div className="flex flex-wrap w-full sm:w-auto items-center justify-center">
        <div className="post-options">
          <i className="far fa-image fa-lg block text-yellow-500 "></i>
          <span className="post-option-tooltip text-yellow-500  tracking-wider">
            Image
          </span>
        </div>
        <div className="post-options">
          <i className="fab fa-youtube fa-lg block text-red-500 "></i>
          <span className="post-option-tooltip text-red-500  tracking-wider">
            Video
          </span>
        </div>
        <div className="post-options">
          <i className="far fa-file-pdf fa-lg block text-blue-500 "></i>
          <span className="post-option-tooltip text-blue-500  tracking-wider">
            Pdf
          </span>
        </div>
        <div className="post-options">
          <i className="fab fa-slideshare fa-lg block text-pink-500 "></i>
          <span className="post-option-tooltip text-pink-500  tracking-wider">
            Slide
          </span>
        </div>
        <div className="post-options">
          <i className="far fa-chart-bar fa-lg block text-green-500 "></i>
          <span className="post-option-tooltip text-green-500  tracking-wider">
            Poll
          </span>
        </div>
      </div>
    </div>
  );
};

const LowerSide = () => {
  return (
    <div className="mt-3 h-60 md:h-72">
      <textarea
        className="w-full bg-lightBgColor dark:bg-darkBgColor focus:outline-none rounded-lg p-3 resize-none min-h-full"
        placeholder="Write Something Here"
      ></textarea>
    </div>
  );
};

export default PostScreen;
