export const storeDataInLocalStorage = (token, userId) => {
  console.log("storeDataInLocalStorage");

  localStorage.setItem(
    process.env.REACT_APP_SOCIAL_BOOK_TOKEN,
    JSON.stringify({
      token,
      darkMode: true,
      user: userId,
    })
  );
};

export const getDataFromLocalStorage = () => {
  const getTokenData = localStorage.getItem(
    process.env.REACT_APP_SOCIAL_BOOK_TOKEN
  );

  if (getTokenData === null) return false;

  return JSON.parse(getTokenData);
};
