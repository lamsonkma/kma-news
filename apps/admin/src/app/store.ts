/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authSlice from '@kma-news/auth-slice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
