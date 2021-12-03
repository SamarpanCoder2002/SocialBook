const TextPost = ({ postData }) => {
  return (
    <div className="bg-lightElevationColor dark:bg-darkElevationColor p-2 mb-1">
      <div>
          {postData.content.text}
      </div>
    </div>
  );
};

export default TextPost;
