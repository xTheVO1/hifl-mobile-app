import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = createAsyncThunk("/auth/login", async ({ payload, AsyncStorage }, { rejectWithValue }) => {
  try {
    const response = await api.signIn(payload);
    console.log(response.data, "user just logged in");
    return response.data;
  } catch (err) {
    console.log(err.response.data.message, "error occured");
    return rejectWithValue(err.response.data);
  }
});

//RETURN USER OBJECT IF LOGGED IN
export const userDetails = () => {
  AsyncStorage.getItem("user").then((res) => {
    if (res !== null) {
      return res;
    }
  });
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
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
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      AsyncStorage.setItem("user", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
