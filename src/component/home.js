import BaseCommonPart from "./base";

const HomePage = () => {
  const testing = [
    "test",
    "test",
    "test",
    "test",
    "test",
    "test",
    "test",
    "test",
    "test",
    "test",
    "test",
    "test",
    "test",
    "test",
  ]

  return (
    <BaseCommonPart>
      <h1 className="h-screen bg-lightBgColor dark:bg-darkBgColor">Home</h1>
      {testing.map((item, index) => {
        return <p key={index}>{item}</p>
      })}
    </BaseCommonPart>
  );
};

export default HomePage;
