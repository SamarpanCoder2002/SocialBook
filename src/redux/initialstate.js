const initialState = JSON.parse(localStorage.getItem(
  process.env.REACT_APP_SOCIAL_BOOK_TOKEN
)) 

// || {
//   isLoading: false,
//   darkMode: false,
//   user: null,
// };

export default initialState;
