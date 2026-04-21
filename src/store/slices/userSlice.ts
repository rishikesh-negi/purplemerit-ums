import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

type CreatorOrUpdator = {
  firstName: string;
  lastName: string;
  fullName: string;
  username: string;
  [key: string]: unknown;
} | null;

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  username: string;
  email: string;
  role: "user" | "manager" | "admin";
  createdBy: CreatorOrUpdator;
  updatedBy: CreatorOrUpdator;
};

export type UserState = User | null;

const initialState: UserState = null as UserState;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(_state, action: PayloadAction<{ data: UserState & { _id: string } }>) {
      if (!action.payload.data || Object.keys(action.payload.data).length === 0)
        return initialState;
      return {
        id: action.payload.data._id,
        firstName: action.payload.data.firstName,
        lastName: action.payload.data.lastName,
        fullName: action.payload.data.fullName,
        username: action.payload.data.username,
        email: action.payload.data.email,
        role: action.payload.data.role,
        createdBy: action.payload.data.createdBy,
        updatedBy: action.payload.data.updatedBy,
      };
    },
    clearUser() {
      return null;
    },
  },
});

export const getUser = (state: RootState) => state.user;

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
