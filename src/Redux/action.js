import {
    FETCH_DATA, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE,
    ADD_USER, ADD_USER_SUCCESS, ADD_USER_FAILURE,
    UPDATE_USER, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE,
    DELETE_USER, DELETE_USER_SUCCESS, DELETE_USER_FAILURE
} from "./actionTypes"


export const fetchData = () => ({ type: FETCH_DATA });
export const fetchDataSuccess = (data) => ({ type: FETCH_DATA_SUCCESS, data });
export const fetchDataFailure = (error) => ({ type: FETCH_DATA_FAILURE, error });

export const addUser = (payload) => ({ type: ADD_USER, payload });
export const addUserSuccess = () => ({ type: ADD_USER_SUCCESS });
export const addUserFailure = (error) => ({ type: ADD_USER_FAILURE, error });

export const updateUser = (id, payload) => ({
    type: UPDATE_USER, payload: {
        id: id,
        payload
    }
});
export const updateUserSuccess = () => ({ type: UPDATE_USER_SUCCESS });
export const updateUserFailure = (error) => ({ type: UPDATE_USER_FAILURE, error });

export const deleteUser = (payload) => ({ type: DELETE_USER, payload });
export const deleteUserSuccess = () => ({ type: DELETE_USER_SUCCESS });
export const deleteUserFailure = (error) => ({ type: DELETE_USER_FAILURE, error });