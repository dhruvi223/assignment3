import { ActionTypes } from "../constants/action-types";

const initialState = {
    users : [],
}

export const signInReducer = (state = initialState, action) => {
    switch (action.type) {
      case ActionTypes.SIGN_IN:
        return {
          ...state,
          loading: true,
        };
      default:
        return state;
    }
  };


  export const signUpReducer = (state = initialState, action) => {
    switch (action.type) {
      case ActionTypes.SIGN_UP:
        return {
          ...state,
          loading: true,
        };
      default:
        return state;
    }
  };