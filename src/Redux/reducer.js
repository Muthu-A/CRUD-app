import {
    FETCH_DATA,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_FAILURE,
    ADD_USER,
    ADD_USER_SUCCESS,
    ADD_USER_FAILURE,
    UPDATE_USER,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE,
    DELETE_USER,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE
  } from "./actionTypes";
  
  const initialState = {
    userInformationDataList: [],
    data: null,
    error: null,
    loading: false,
    buttonLoading:false
  };
  
  const SampleReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_DATA:
        return { ...state, loading: true };
      case FETCH_DATA_SUCCESS:
        return { ...state, data: action.data, error: null, loading: false };
      case FETCH_DATA_FAILURE:
        return { ...state, data: null, error: action.error, loading: false };
  
      case ADD_USER:
        return { ...state, buttonLoading: true };
      case ADD_USER_SUCCESS:
        return { ...state, error: null, buttonLoading: false };
      case ADD_USER_FAILURE:
        return { ...state, error: action.error, buttonLoading: false };
  
      case UPDATE_USER:
        return { ...state, buttonLoading: true };
      case UPDATE_USER_SUCCESS:
        return { ...state, error: null, buttonLoading: false };
      case UPDATE_USER_FAILURE:
        return { ...state, error: action.error, buttonLoading: false };
  
      case DELETE_USER:
        return { ...state, loading: true };
      case DELETE_USER_SUCCESS:
        return { ...state, error: null, loading: false };
      case DELETE_USER_FAILURE:
        return { ...state, error: action.error, loading: false };
  
      default:
        state = state;
    }
  
    return state;
  };
  
  export default SampleReducer;
  