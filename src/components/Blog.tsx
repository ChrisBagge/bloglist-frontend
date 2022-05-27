import { useState } from 'react';
import React from 'react'

import { useUpdateBlogMutation, useDeleteBlogMutation } from '../features/api/apiSlice'
import { useGetBlogsQuery } from '../features/api/apiSlice'
import { useAppSelector } from '../app/hooks';

//function Blog({ blog, name }: { blog: BlogDB, name: string }) {
function Blog({ id }: { id: string }) {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [updateBlog, { isLoading: isUpdating },] = useUpdateBlogMutation()
  const [deleteBlog, { isLoading: isDeleting },] = useDeleteBlogMutation()

  const [viewDetails, setviewDetails] = useState(false);

  const user = useAppSelector((state) => state.users.user);

  const { blog } = useGetBlogsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      blog: data?.find((blog) => blog.id === id)
    })
  })

  if (!blog)
    return (
      <div>
        No blog data found
      </div>
    )

  if (!viewDetails)
    return (
      <div style={blogStyle} className='simpleBlog'>
        {blog.title} {blog.author}
        <button onClick={() => setviewDetails(!viewDetails)}>view</button>
      </div>
    );

  return (
    <div style={blogStyle} className='advancedBlog'>
      {blog.title} {blog.author}
      <button onClick={() => setviewDetails(!viewDetails)}>hide</button><br />
      {blog.url}<br />
      likes {blog.likes}
      {/* <button onClick={() => dispatch(likeBlog(blog))}>like</button><br /> */}
      <button onClick={() => updateBlog({ id: blog.id, likes: blog.likes + 1 })}>like</button><br />
      {blog.user.name}
      {user?.name === blog.user.name &&
        <>
          <button onClick={() => deleteBlog(blog.id)}>remove</button><br />
        </>
      }


    </div>
  );
}

export default Blog;
