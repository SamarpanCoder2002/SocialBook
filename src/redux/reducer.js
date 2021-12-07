import initialState from "./initialstate";
import { CHANGE_MODE, START_LOADING, STOP_LOADING } from "./actions";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };

    case STOP_LOADING:
      return { ...state, isLoading: false };

    case CHANGE_MODE:
      const toogleModeState = { ...state, darkMode: !state.darkMode };

      localStorage.setItem(
        process.env.REACT_APP_SOCIAL_BOOK_TOKEN,
        JSON.stringify(toogleModeState)
      );
      return toogleModeState;

    default:
      return state;
  }
};

export default reducer;
