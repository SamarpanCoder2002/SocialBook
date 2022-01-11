import initialState from "./initialstate";
import {
  CHANGE_MODE,
  START_LOADING,
  STOP_LOADING,
  UPDATE_NOTIFICATION,
  UPDATE_USER_PROFILE,
} from "./actions";

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

    case UPDATE_NOTIFICATION:
      const notificationState = {
        ...state,
        hasPendingNotification: action.payload,
      };

      localStorage.setItem(
        process.env.REACT_APP_SOCIAL_BOOK_TOKEN,
        JSON.stringify(notificationState)
      );
      return notificationState;
    case UPDATE_USER_PROFILE:
      const userProfileState = {
        ...state,
        name: action.payload.name,
        description: action.payload.description,
        profilePic: action.payload.profilePic,
      };

      localStorage.setItem(
        process.env.REACT_APP_SOCIAL_BOOK_TOKEN,
        JSON.stringify(userProfileState)
      );

      return userProfileState;

    default:
      return state;
  }
};

export default reducer;
