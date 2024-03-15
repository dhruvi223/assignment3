import { ActionTypes } from "../constants/action-types";

const initialState = {
  users: [],
};

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


export const fetchProduct = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_PRODUCT:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};


export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SEARCH:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};



export const paginationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.PAGINATION:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};



export const asceReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.DESCENDING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};


export const descReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ASCENDING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};


export const jewelleryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.JEWELLERY:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};


export const electronicsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ELECTRONICS:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};



export const menReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.MEN:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};



export const womenReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.WOMEN:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
