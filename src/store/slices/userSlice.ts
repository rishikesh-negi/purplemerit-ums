import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

type CreatorOrUpdator = {
  firstName: string;
  lastName: string;
  fullName: string;
  username: string;
  [key: string]: unknown;
} | null;

export type UserState = {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  username: string;
  email: string;
  role: "user" | "manager" | "admin";
  active: boolean;
  createdBy: CreatorOrUpdator;
  updatedBy: CreatorOrUpdator;
} | null;

const initialState: UserState = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state: UserState, action: PayloadAction<{ data: UserState }>) {
      if (!action.payload.data || Object.keys(action.payload.data).length) return;
      state = action.payload.data;
    },
  },
});

export const getUser = (state: RootState) => state.user;

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
