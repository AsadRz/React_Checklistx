import { createSlice } from '@reduxjs/toolkit'

const viewSlice = createSlice({
  name: 'view',
  initialState: {},
  reducers: {
    setView: (state,action) => {

    }
  }
});

const { actions, reducer } = viewSlice;

export const { setView } = actions

export default reducer