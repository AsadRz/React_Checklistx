/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authenticated: false,
  },
  reducers: {
    setAuthFlag: (state, action) => {
      state.authenticated = action.payload.authenticated;
      return state;
    },
  },
});

const { actions, reducer } = authSlice;

export const { setAuthFlag } = actions;

export default reducer;
