import initialState from "./initialstate";
import {
  ATTACH_SOCKET,
  CHANGE_MODE,
  START_LOADING,
  STOP_LOADING,
  UPDATE_NEW_CHAT_ALERT,
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
        JSON.stringify({ ...toogleModeState, socket: undefined })
      );
      return toogleModeState;

    case UPDATE_NOTIFICATION:
      const notificationState = {
        ...state,
        hasPendingNotification: action.payload,
      };

      localStorage.setItem(
        process.env.REACT_APP_SOCIAL_BOOK_TOKEN,
        JSON.stringify({ ...notificationState, socket: undefined })
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
        JSON.stringify({ ...userProfileState, socket: undefined })
      );

      return userProfileState;

    case ATTACH_SOCKET:
      return { ...state, socket: action.payload };

    case UPDATE_NEW_CHAT_ALERT:
      const updateAlertState = {
        ...state,
        hasPendingChatMessage: action.payload,
      }

      localStorage.setItem(
        process.env.REACT_APP_SOCIAL_BOOK_TOKEN,
        JSON.stringify({ ...updateAlertState, socket: undefined })
      );
      return updateAlertState;

    default:
      return state;
  }
};

export default reducer;
