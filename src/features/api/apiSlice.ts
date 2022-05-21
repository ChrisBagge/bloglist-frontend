import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',

  baseQuery: fetchBaseQuery({baseUrl: '/api'}),
  endpoints: builder => ({
    getBlogs: builder.query({
      query: () => '/blogs'
    })
  })
})

export const { useGetBlogsQuery } = apiSlice