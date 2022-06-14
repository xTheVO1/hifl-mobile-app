import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchFans = createAsyncThunk(
  "/volunteers/fans/all",
  async ({ userId, setFilteredData }, { rejectWithValue }) => {
    try {
      // console.log(userId, "id");
      const response = await api.getFans(userId);
      setFilteredData(response.data.data.reverse());
      return response.data.data;
    } catch (err) {
      console.log(err.response.data.message, "error occured");
      return rejectWithValue(err.response.data);
    }
  }
);

export const registerFan = createAsyncThunk(
  "/volunteers/fans/fan/register",
  async ({ payload, navigation, alertModal }, { rejectWithValue }) => {
    try {
      // console.log(payload, "register fan");
      const response = await api.fanSignup(payload);
      alertModal("Hurray!", "Fan was successfully registered", () => navigation.goBack());
      return response.data;
    } catch (err) {
      alertModal("Oops!", "An error occured, please try again");
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchSingleFan = createAsyncThunk(
  "/volunteers/fans/fan",
  async ({ fanId, setFan }, { rejectWithValue }) => {
    try {
      const response = await api.getSingleFan(fanId);
      // console.log(response.data.data, "single fan");
      setFan(response.data.data);
      return response.data.data;
    } catch (err) {
      console.log(err.response.data.message, "error occured");
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateFan = createAsyncThunk(
  "/volunteers/fans/fan/update",
  async ({ payload, alertModal, navigation }, { rejectWithValue }) => {
    try {
      // console.log(payload, "update fan");
      const response = await api.fanUpdate(payload);
      alertModal("Hurray!", "Fan was successfully updated", () => navigation.goBack());
      return response.data;
    } catch (err) {
      alertModal("Oops", err.response.data.message);
      console.log(err.response.data, "error occured");
      return rejectWithValue(err.response.data);
    }
  }
);

const fanSlice = createSlice({
  name: "fan",
  initialState: {
    fans: [],
    singleFan: null,
    error: "",
    loading: false,
    fanLoading: false,
    updating: false,
  },

  reducers: {
    setFans: (state, action) => {
      state.fans = action.payload;
    },
    setSignleFan: (state, action) => {
      state.singleFan = action.payload;
    },
    clearSignleFan: (state) => {
      state.singleFan = null;
    },
  },

  extraReducers: {
    [fetchFans.pending]: (state) => {
      state.loading = true;
    },
    [fetchFans.fulfilled]: (state, action) => {
      state.loading = false;
      // AsyncStorage.setItem("fans", JSON.stringify({ ...action.payload }));
      state.fans = action.payload;
    },
    [fetchFans.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

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

    [fetchSingleFan.pending]: (state) => {
      state.fanLoading = true;
    },
    [fetchSingleFan.fulfilled]: (state, action) => {
      state.fanLoading = false;
      // AsyncStorage.setItem("fans", JSON.stringify({ ...action.payload }));
      state.singleFan = action.payload;
    },
    [fetchSingleFan.rejected]: (state, action) => {
      state.fanLoading = false;
      state.error = action.payload;
    },

    [updateFan.pending]: (state) => {
      state.updating = true;
    },
    [updateFan.fulfilled]: (state, action) => {
      state.updating = false;
      // AsyncStorage.setItem("user", JSON.stringify({ ...action.payload }));
      //state.fan = action.payload;
    },
    [updateFan.rejected]: (state, action) => {
      state.updating = false;
      state.error = action.payload;
    },
  },
});

export const { setFans, setSignleFan, clearSignleFan } = fanSlice.actions;

export default fanSlice.reducer;
