const initialState = localStorage.getItem(
  process.env.REACT_APP_SOCIAL_BOOK_TOKEN
) || {
  isLoading: false,
  darkMode: true,
  user: null,
};

export default initialState;
