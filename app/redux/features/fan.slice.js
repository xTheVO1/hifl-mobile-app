import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const registerFan = createAsyncThunk(
  "/volunteers/fans/fan/register",
  async ({ payload, navigation, alertModal }, { rejectWithValue }) => {
    try {
      console.log(payload, "register fan");
      const response = await api.fanSignup(payload);
      alertModal("Hurray!", "Fan was successfully registered", () => navigation.goBack());
      return response.data;
    } catch (err) {
      alertModal("Oops!", "An error occured, please try again");
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

export const fetchFans = createAsyncThunk(
  "/volunteers/fans/all",
  async ({ userId, setFilteredData }, { rejectWithValue }) => {
    try {
      const response = await api.getFans(userId);
      //console.log(response.data.data, "all fans");
      setFilteredData(response.data.data);
      return response.data.data;
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
    fans: null,
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
      // AsyncStorage.setItem("fan", JSON.stringify({ ...action.payload }));
      //state.fans = action.payload;
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
      // AsyncStorage.setItem("user", JSON.stringify({ ...action.payload }));
      //state.fan = action.payload;
    },
    [updateFan.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [fetchFans.pending]: (state) => {
      state.loading = true;
    },
    [fetchFans.fulfilled]: (state, action) => {
      state.loading = false;
      AsyncStorage.setItem("fans", JSON.stringify({ ...action.payload }));
      state.fans = action.payload;
    },
    [fetchFans.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setUser, logout } = fanSlice.actions;

export default fanSlice.reducer;
