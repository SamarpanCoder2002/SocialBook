import "./loading.css";

const LoadingBar = ({ isLoading }) => {
  return isLoading ? (
    <div className="loader">
      <div className="loaderBar"></div>
    </div>
  ) : (
    <></>
  );
};

export default LoadingBar;
