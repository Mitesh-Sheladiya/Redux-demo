import axios from "axios";

export const tablePostData = (payload) => {
  return {
    type: "TABLE_POST_DATA",
    payload: payload,
  };
};

export const getPostDataSuccess = (payload) => {
  return {
    type: "TABLE_POST_DATA_SUCCESS",
    payload: payload,
  };
};

export const getPostData = () => async (dispatch) => {
  dispatch(tablePostData());
  axios.get(`https://jsonplaceholder.typicode.com/posts`).then((res) => {
    dispatch(getPostDataSuccess(res.data));
  });
};

export const tableCommitData = (payload) => {
  return {
    type: "TABLE_COMMIT_DATA",
    payload: payload,
  };
};

export const getCommitDataSuccess = (payload) => {
  return {
    type: "TABLE_COMMIT_DATA_SUCCESS",
    payload: payload,
  };
};

export const getCommitData = (id) => async (dispatch) => {
  dispatch(tableCommitData());
  axios
    .get(
      `https://jsonplaceholder.typicode.com/comments${
        id ? `?postId=${id}` : ""
      }`
    )
    .then((res) => {
      dispatch(getCommitDataSuccess(res.data));
    });
};

export const searchItem = (payload) => {
  return {
    type: "SEARCH_ITEM",
    payload: payload,
  };
};

export const editItem = (selectedId, newTitle) => {
  const payload = { selectedId, newTitle };
  return {
    type: "EDIT_ITEM",
    payload: payload,
  };
};
