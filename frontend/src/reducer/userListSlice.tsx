import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type UserInfo } from './userInfoSlice';

const initialState = [] as UserInfo[];

const userListSlice = createSlice({
  name: 'userList',
  initialState,
  reducers: {
    setUserList: (state, action: PayloadAction<UserInfo[]>) => {
      return action.payload;
    }
  }
});

export const { setUserList } = userListSlice.actions;
export default userListSlice.reducer;
