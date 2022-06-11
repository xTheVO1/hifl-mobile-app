import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const registerFan = createAsyncThunk(
  "/volunteers/fans/fan/register",
  async ({ payload, AsyncStorage, alertModal }, { rejectWithValue }) => {
    try {
      const response = await api.fanSignup(payload);
      alertModal("Hurray!", "Fan was successfully registered");
      return response.data;
    } catch (err) {
      alertModal("Oops!", "An error occured");
      console.log(err.response.data.message, "error occured");
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateFan = createAsyncThunk(
  "/volunteers/fans/fan/update",
  async ({ payload, AsyncStorage }, { rejectWithValue }) => {
    try {
      const response = await api.fanUpdate(payload);

      console.log(response.data, "user just logged in");
      return response.data;
    } catch (err) {
      console.log(err.response.data.message, "error occured");
      return rejectWithValue(err.response.data);
    }
  }
);

//RETURN USER OBJECT IF LOGGED IN
// export const isLoggedIn = () => {
//   if (typeof window === "undefined") {
//     return false;
//   }
//   if (localStorage.getItem("user")) {
//     return JSON.parse(localStorage.getItem("user"));
//   }
//   return false;
// };

const fanSlice = createSlice({
  name: "fan",
  initialState: {
    fan: null,
    error: "",
    loading: false,
  },

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      AsyncStorage.removeItem("user");
      state.user = null;
    },
  },

  extraReducers: {
    [registerFan.pending]: (state) => {
      state.loading = true;
    },
    [registerFan.fulfilled]: (state, action) => {
      state.loading = false;
      AsyncStorage.setItem("user", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [registerFan.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [updateFan.pending]: (state) => {
      state.loading = true;
    },
    [updateFan.fulfilled]: (state, action) => {
      state.loading = false;
      AsyncStorage.setItem("user", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [updateFan.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setUser, logout } = fanSlice.actions;

export default fanSlice.reducer;
