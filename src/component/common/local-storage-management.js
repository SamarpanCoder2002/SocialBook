export const storeDataInLocalStorage = (
  token,
  user,
  name = "",
  description = "",
  profilePic = "",
  hasPendingNotification
) => {
  console.log("storeDataInLocalStorage");
  let hasPrevPendingNotification = hasPendingNotification;

  const secondaryStoredData = localStorage.getItem(
    process.env.REACT_APP_SOCIAL_BOOK_TOKEN_SECONDARY
  );

  if (secondaryStoredData !== null) {
    const oldStoredData = JSON.parse(secondaryStoredData);
    hasPrevPendingNotification = oldStoredData[user] || false;
  }

  localStorage.setItem(
    process.env.REACT_APP_SOCIAL_BOOK_TOKEN,
    JSON.stringify({
      token,
      darkMode: true,
      user,
      name,
      description,
      profilePic,
      hasPendingNotification:
        hasPrevPendingNotification ||
        getDataFromLocalStorage().hasPendingNotification ||
        false,
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
