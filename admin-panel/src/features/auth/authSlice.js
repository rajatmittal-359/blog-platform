import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

const savedAuth = localStorage.getItem("auth");

const initialState = savedAuth
  ? {
      user: JSON.parse(savedAuth).user,
      token: JSON.parse(savedAuth).token,
      isLoading: false,
      isError: false,
      message: "",
    }
  : {
      user: null,
      token: null,
      isLoading: false,
      isError: false,
      message: "",
    };

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, thunkAPI) => {
    try {
      const response = await api.post("/auth/login", formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.isError = false;
      state.message = "";
      localStorage.removeItem("auth");
    },
    clearMessage: (state) => {
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem(
          "auth",
          JSON.stringify({
            user: action.payload.user,
            token: action.payload.token,
          })
        );
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { logoutUser, clearMessage } = authSlice.actions;
export default authSlice.reducer;