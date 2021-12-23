import LoadingBar from "../loading/loadingbar";

const Waiting = () => {
  return (
    <div className="h-screen bg-darkBgColor text-darkPostTextStyleColor">
      <div className="h-full flex flex-wrap flex-col justify-center items-center">
        <h1 className="text-3xl tracking-wider">Socialbook</h1>
        <div className="container mx-auto mt-5 md:px-20 lg:px-80">
            <LoadingBar isLoading={true} />
        </div>
      </div>
    </div>
  );
};

export default Waiting;
