let initialState = {
  postDataLoading: false,
  tableData: [],

  commitDataLoading: false,
  tableCommitData: [],

  searchText: "",
};

export const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TABLE_POST_DATA":
      return {
        ...state,
        postDataLoading: true,
      };

    case "TABLE_POST_DATA_SUCCESS":
      return {
        ...state,
        postDataLoading: false,
        tableData: action.payload,
      };

    case "TABLE_COMMIT_DATA":
      return {
        ...state,
        commitDataLoading: true,
      };

    case "TABLE_COMMIT_DATA_SUCCESS":
      return {
        ...state,
        commitDataLoading: false,
        tableCommitData: action.payload,
      };

    case "SEARCH_ITEM":
      // eslint-disable-next-line array-callback-return
      const newPostList = state.tableData.filter((item) => {
        return item.title.toLowerCase().includes(action.payload.toLowerCase());
      });

      const newCommitList = state.tableCommitData.filter((item) => {
        return item.name.toLowerCase().includes(action.payload.toLowerCase());
      });

      return {
        ...state,
        tableData: newPostList,
        tableCommitData: newCommitList,
      };

    case "EDIT_ITEM":
      let objIndex = state.tableData.findIndex(
        (obj) => obj.id === action.payload.selectedId
      );
      state.tableData[objIndex].title = action.payload.newTitle;
      return {
        ...state,
      };
    default:
      return state;
  }
};
