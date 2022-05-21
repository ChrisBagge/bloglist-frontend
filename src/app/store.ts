import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import blogReducer from '../features/blog/blogSlice'

export const store = configureStore({
  reducer: {
    blogs: blogReducer,
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