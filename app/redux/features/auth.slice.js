import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = createAsyncThunk("/auth/login", async ({ payload, AsyncStorage }, { rejectWithValue }) => {
  try {
    const response = await api.signIn(payload);
    // toast.success("Login Successfull", {
    //   onClose: () =>
    //     router.query && router.query.redirect ? router.push(router.query.redirect) : router.push("/account"),
    //   autoClose: 2000,
    // });
    console.log(response.data, "user just logged in");
    return response.data;
  } catch (err) {
    console.log(err.response.data.message, "error occured");
    return rejectWithValue(err.response.data);
  }
});

// export const register = createAsyncThunk("/auth/register", async ({ payload, toast, router }, { rejectWithValue }) => {
//   try {
//     const response = await api.register(payload);
//     toast.success("Registration Successfull, Please Log In", { onClose: () => router.push("/login") });
//     return response.data;
//   } catch (err) {
//     toast.error(err.response.data.message);
//     return rejectWithValue(err.response.data);
//   }
// });

// export const update = createAsyncThunk("/auth/user/update-profile", async ({ payload, toast }, { rejectWithValue }) => {
//   try {
//     const response = await api.update(payload);
//     toast.success("Profile Updated Successfully");
//     return response.data;
//   } catch (err) {
//     toast.error(err.response.data.message);
//     return rejectWithValue(err.response.data);
//   }
// });

//RETURN USER OBJECT IF LOGGED IN
export const isLoggedIn = () => {
  if (typeof window === "undefined") {
    return false;
  }
  if (localStorage.getItem("user")) {
    return JSON.parse(localStorage.getItem("user"));
  }
  return false;
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
      //localStorage.setItem("user", JSON.stringify({ ...action.payload }));
      // AsyncStorage.setItem("user", JSON.stringify({ ...action.payload })).then(() => {
      //   state.user = action.payload;
      // });
      AsyncStorage.setItem("user", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // [register.pending]: (state) => {
    //   state.loading = true;
    // },
    // [register.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   // localStorage.setItem("user", JSON.stringify({ ...action.payload }));
    //   state.user = action.payload;
    // },
    // [register.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // },

    // [update.pending]: (state) => {
    //   state.loading = true;
    // },
    // [update.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   localStorage.setItem("user", JSON.stringify({ ...action.payload }));
    //   state.user = action.payload;
    // },
    // [update.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
