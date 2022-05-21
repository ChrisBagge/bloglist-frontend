import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

import { BlogDB } from '../../interfaces/Blog'
import blogService from '../../services/blogs';

const initialState = [] as BlogDB[];

export const deleteBlog = createAsyncThunk<any, string, { state: RootState }>(
  'blog/delete',
  async (id: string, { getState }) => {
    const state: RootState = getState();
    if (window.confirm(`Delete ${state.blogs.find(blog => blog.id === id)?.title} ?`)) {
      await blogService.deleteBlog(id)
      //setBlogs(blogs.filter(n => n.id !== id))
    }
    return id;
  }
)

export const likeBlog = createAsyncThunk<any, BlogDB>(
  'blog/like',
  async (likedBlog: BlogDB) => {
    likedBlog.likes++

    try {
      const likedBlogUserId = {
        "id": likedBlog.id,
        "title": likedBlog.title,
        "author": likedBlog.author,
        "url": likedBlog.url,
        "likes": likedBlog.likes,
        "user": likedBlog.user.id
      }
      const updatedBlog: BlogDB = await blogService.update(likedBlogUserId.id, likedBlogUserId)

      return updatedBlog;
      //     setBlogs(blogs.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog))

    }

    catch (exception) {
      console.log(exception)
    }
  }
)

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(likeBlog.fulfilled, (state, action: PayloadAction<BlogDB>) => {
        state = state.map(blog => blog.id !== action.payload.id ? blog : action.payload)
      })
      .addCase(deleteBlog.fulfilled, (state, action: PayloadAction<string>) => {
        state = state.filter(n => n.id !== action.payload)
      })
  }
})

export default blogSlice.reducer;
