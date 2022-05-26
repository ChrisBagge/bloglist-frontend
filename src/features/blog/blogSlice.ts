import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

import { BlogDB } from '../../interfaces/Blog'
import blogService from '../../services/blogs';


interface blogState {
  blogs: Array<BlogDB>,
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | undefined
}


const initialState: blogState = {
  blogs: [] as BlogDB[],
  status: 'idle',
  error: undefined
}

export const likeBlog = createAsyncThunk<any, BlogDB>(
  'blogs/likeBlog',
  async (blog: BlogDB) => {
    
    const likedBlog = {...blog}
    likedBlog.likes += 1;

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
export const fetchBlogs = createAsyncThunk(
  'blogs/fetchBlogs',
  async () => {
    const blogs = await blogService.getAll();
    return blogs;
  }
)

export const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      
      .addCase(likeBlog.fulfilled, (state, action: PayloadAction<BlogDB>) => {
        state.blogs = state.blogs.map(blog => blog.id !== action.payload.id ? blog : action.payload)
      })      
      .addCase(fetchBlogs.fulfilled, (state, action: PayloadAction<BlogDB[]>) => {
        state.status = 'succeeded';
        state.blogs = action.payload;       
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.error = action.error.message        
      })

  }
})


//export const selectAllBlogs = (state: RootState) => state.blogs

export default blogSlice.reducer;
