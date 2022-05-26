import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BlogDB, iBlog } from '../../interfaces/Blog'

let token = ''

interface BlogUpdate {
  id: string,
  title: string,
  author: string,
  url: string,
  likes: number,
  user: string
}

interface User {
  username: string,
  password: string
}

export const setToken = (newToken: string) => {
  token = `bearer ${newToken}`
}

export const apiSlice = createApi({
  reducerPath: 'api',

  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  tagTypes: ['Blogs'],
  endpoints: builder => ({
    getBlogs: builder.query<Array<BlogDB>, void>({
      query: () => 'blogs',
      providesTags: ['Blogs']
    }),
    addBlog: builder.mutation<void, iBlog>({
      query: initialBlog => ({
        url: 'blogs',
        method: 'POST',
        body: initialBlog,
        headers: { Authorization: token }
      }),
      invalidatesTags: ['Blogs']
    }),


    updateBlog: builder.mutation<BlogDB, Partial<BlogUpdate>>({
      query(data) {
        const { id, ...body } = data
        return {
          url: `blogs/${id}`,
          method: 'PUT',
          body
        }
      },

      invalidatesTags: ['Blogs']

    }),
    deleteBlog: builder.mutation<{ success: boolean; id: string }, string>({
      query(id) {
        return {
          url: `blogs/${id}`,
          method: 'DELETE',
          headers: { Authorization: token }
        }
      },
      invalidatesTags: ['Blogs']
    }),
    userLogin: builder.mutation<{token:string, username: string, name: string, id: string} | null, User>({
      query: user => ({
        url: 'login',
        method: 'POST',
        body: user,
      })
    }),
  })
})

export const { useGetBlogsQuery, useAddBlogMutation, useUpdateBlogMutation, useDeleteBlogMutation, useUserLoginMutation } = apiSlice