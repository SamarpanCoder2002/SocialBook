import initialState from "./initialstate";
import { CHANGE_MODE, START_LOADING, STOP_LOADING } from "./actions";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };

    case STOP_LOADING:
      return { ...state, isLoading: false };

    case CHANGE_MODE:
      return { ...state, darkMode: !state.darkMode };

    default:
      return state;
  }
};

export default reducer;
