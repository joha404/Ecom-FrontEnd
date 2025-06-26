import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: {},
    isUserLoading: false,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setIsUserLoading: (state, action) => {
      state.isUserLoading = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setUserData, setIsUserLoading } = userSlice.actions;
