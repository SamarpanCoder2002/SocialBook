const initialState = JSON.parse(
  localStorage.getItem(process.env.REACT_APP_SOCIAL_BOOK_TOKEN)
);

export default initialState;
