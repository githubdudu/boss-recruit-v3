import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface UserInfo {
  _id: string;
  userName: string;
  userType: 'recruiter' | 'applicant';
  avatar: string;
  targetUserType?: 'recruiter' | 'applicant';
  jobPosition?: string;
  description?: string;
  company?: string;
  salary?: string;
  email?: string;
  phone?: string;
  skills?: string[];
  education?: string[];
  experience?: string[];
  createdAt?: string;
  updatedAt?: string;
}

const initialState: Partial<UserInfo> = {};

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      const targetUserType = createTargetUserType(action.payload.userType);
      return { ...action.payload, targetUserType };
    }
  }
});

export const { setUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;

function createTargetUserType(
  userType: 'recruiter' | 'applicant' | undefined
): 'recruiter' | 'applicant' | undefined {
  if (userType === 'recruiter') {
    return 'applicant';
  } else if (userType === 'applicant') {
    return 'recruiter';
  }
  return undefined;
}
