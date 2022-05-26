import React from 'react'

import Blog from './Blog';

import { useGetBlogsQuery } from '../api/apiSlice'

function BlogList({ user }: {
  user: {
    token: string;
    username: string;
    name: string;
    id: string;
  };
}) {

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
            <Blog key={blog.id} id={blog.id} name={user.name} />
          ))}
      </>
    );
  }
  return (
    <>Loading</>
  )

}

export default BlogList;
