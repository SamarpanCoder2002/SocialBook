export const storeDataInLocalStorage = (token, userId) => {
  console.log("storeDataInLocalStorage");

  localStorage.setItem(
    process.env.REACT_APP_SOCIAL_BOOK_TOKEN,
    JSON.stringify({
      token,
      darkMode: true,
      user: userId,
      isLoading: false,
    })
  );
};
