import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: null,
  userData: null,
  baseurl: "https://emirroi.com/backend",
  // baseurl: "https://worldofsoftware.in/emirroi",
  //baseurl: "https://souqblock.com/testing/emorroi/backend"
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signin(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    signout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
    setData(state, action) {
      state.userData = action.payload;
    },
  },
});

export const { signin, signout, setData } = authSlice.actions;
export default authSlice.reducer;
