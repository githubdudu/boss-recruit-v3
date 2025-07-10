import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface UserInfo {
  _id: string;
  userName: string;
  userType: 'recruiter' | 'applicant';
  jobPosition?: string;
  description?: string;
  company?: string;
  salary?: string;
  email?: string;
  skills?: string[];
  education?: string[];
  experience?: string[];
  createdAt?: string;
  updatedAt?: string;
  userList?: unknown;
}

const initialState: Partial<UserInfo> = {};

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      return action.payload;
    }
  }
});

export const { setUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;
