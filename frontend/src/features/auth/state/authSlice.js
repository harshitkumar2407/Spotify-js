import { createSlice } from "@reduxjs/toolkit";
import { loginApiAction, hydrateUserAction } from "./authAction";

let authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    removeUser: (state) => {
      state.user = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginApiAction.pending, (state) =>{
      state.isLoading = true;
    });
    builder.addCase(loginApiAction.fulfilled,(state,action)=>{
      state.user = action.payload;
      state.isLoading = false;
    })
    builder.addCase(loginApiAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(hydrateUserAction.pending,(state) =>{
      state.isLoading = true
    })
    builder.addCase(hydrateUserAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    });
    builder.addCase(hydrateUserAction.rejected,(state) =>{
      state.isLoading = false
    })
  },
});
export const { addUser, removeUser } = authSlice.actions;
export default authSlice.reducer;
