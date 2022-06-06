import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setToken } from '../api/apiSlice'

type User = {
  token: string;
  username: string;
  name: string;
  id: string;
};

function initUser(): User | null {
  let user = null;
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
  if (loggedUserJSON) {
    user = JSON.parse(loggedUserJSON);
    setToken(user.token)
  }
  return user;
}

const initialState = { user: initUser() }

export const userSlice = createSlice({
  name: 'users',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(state.user));
      setToken(state.user.token)
    },
    clearUser: (state) => {
      state.user = null
      window.localStorage.removeItem('loggedBlogappUser');
      setToken("")
    }
  },
})

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
