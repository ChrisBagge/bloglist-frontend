import React from 'react'

import Blog from './Blog';

import { useGetBlogsQuery } from '../features/api/apiSlice'

function BlogList() {
   
  const {
    data: blogs,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetBlogsQuery()

  if (isSuccess) { //blogStatus === 'succeeded') {

    return (
      <>
        {[...blogs].sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            //<Blog key={blog.id} blog={blog} name={user.name} />
            <Blog key={blog.id} id={blog.id} />
          ))}
      </>
    );
  }
  return (
    <>Loading</>
  )

}

export default BlogList;
