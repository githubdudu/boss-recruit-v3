import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Represents the authentication state for user login status.
interface IsLoggedInState {
  isLoggedIn: boolean;
}
const initialState: Readonly<IsLoggedInState> = {
  isLoggedIn: false
};

export const isLoggedInSlice = createSlice({
  name: 'isLoggedIn',
  initialState,
  reducers: {
    setIsLoggedIn: (state: IsLoggedInState, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    }
  }
});

export const { setIsLoggedIn } = isLoggedInSlice.actions;

export default isLoggedInSlice.reducer;
