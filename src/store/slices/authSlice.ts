import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

type AuthState = {
  accessToken: string;
  isAuthenticated: boolean;
  accessTokenExpiresAt: Date | null;
};

const initialState: AuthState = {
  accessToken: "",
  isAuthenticated: false,
  accessTokenExpiresAt: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<{ accessToken: string; accessTokenExpiresAt: Date }>) {
      if (!action.payload.accessToken || action.payload.accessToken === "") return;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = state.accessToken !== "";
      state.accessTokenExpiresAt = action.payload.accessTokenExpiresAt;
    },
  },
});

export const getAuthState = (state: RootState) => state.auth;

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
