import { takeLatest, put, call } from "redux-saga/effects";
import {
  fetchData, fetchDataSuccess, fetchDataFailure, addUserSuccess, addUserFailure, updateUserSuccess, updateUserFailure,
  deleteUserSuccess, deleteUserFailure
} from "./action";
import { FETCH_DATA, ADD_USER, UPDATE_USER, DELETE_USER } from "./actionTypes";
import axios from "axios";

function* fetchDataSaga() {
  try {
    const response = yield call(
      axios.get,
      process.env.REACT_APP_BASE_URL
    );
    yield put(fetchDataSuccess(response.data));
  } catch (error) {
    yield put(fetchDataFailure(error.message));
  }
}

function* addUserSaga(action) {
  try {
    const response = yield call(
      axios.post,
      process.env.REACT_APP_BASE_URL, action.payload
    );
    yield put(fetchData());
    yield put(addUserSuccess(response.data));
  } catch (error) {
    yield put(addUserFailure(error.message));
  }
}

function* updateUserSaga(action) {
  try {
    const { id, payload } = action.payload;
    const url = `${process.env.REACT_APP_BASE_URL}/${id}`;
    const response = yield call(
      axios.put,
      url, payload
    );
    yield put(fetchData());
    yield put(updateUserSuccess(response.data));
  } catch (error) {
    yield put(updateUserFailure(error.message));
  }
}

function* deleteUserSaga(action) {
  try {
    const id = action.payload;
    const url = `${process.env.REACT_APP_BASE_URL}/${id}`;
    const response = yield call(
      axios.delete,
      url
    );
    yield put(fetchData());
    yield put(deleteUserSuccess(response.data));
  } catch (error) {
    yield put(deleteUserFailure(error.message));
  }
}

export function* rootSaga() {
  yield takeLatest(FETCH_DATA, fetchDataSaga);
  yield takeLatest(ADD_USER, addUserSaga);
  yield takeLatest(UPDATE_USER, updateUserSaga);
  yield takeLatest(DELETE_USER, deleteUserSaga);

}
