import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi } from "../api/authApi";
import { api } from "../../../config/api";

export let loginApiAction = createAsyncThunk(
  "auth/login",
  async (credentials, thunkApi) => {
    try {
      let res = await loginApi(credentials);
      localStorage.setItem("accessToken", res.accessToken);
      console.log(res);
      
      return res;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

// export let hydrateUserAction = createAsyncThunk(
//   "/auth/me",
//   async (_, thunkApi) => {
//     try {
//       let accessToken = localStorage.getItem("accessToken");

//       let res = await api.get("/auth/me", {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       return res.data;
//     } catch (error) {
//       return thunkApi.rejectWithValue("unauthorize user");
//     }
//   },
// );


export const hydrateUserAction = createAsyncThunk(
  "auth/hydrateUser",
  async (_, thunkApi) => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      return thunkApi.rejectWithValue("No access token found");
    }

    try {
      const response = await api.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ?? "Unable to restore user session";

      return thunkApi.rejectWithValue(message);
    }
  },
);