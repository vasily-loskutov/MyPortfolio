import { createSlice } from "@reduxjs/toolkit";

const loggSlice = createSlice({
  name: "loggSlice",
  initialState: {
    isLogg: false,
  },
  reducers: {
    getStatus: (state, action) => {
      state.isLogg;
    },
    setStatus: (state, action) => {
      state.isLogg = action.payload;
    },
  },
});

const { reducer: LoggReducer, actions } = loggSlice;
const { getStatus, setStatus } = actions;
export const getLoggStatus = () => (state) => {
  return state.loggReducer.isLogg;
};
export const setLoggStatus = (loggStatus) => (dispatch) => {
  dispatch(setStatus(loggStatus));
};
export default LoggReducer;
