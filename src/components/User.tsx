import React from 'react'

import { useParams } from 'react-router-dom'

import { useGetUsersQuery } from '../features/api/apiSlice'

function User() {
  const { id } = useParams();

  const { user } = useGetUsersQuery(undefined, {
    selectFromResult: ({ data }) => ({
      user: data?.find((user) => user.id === id)
    })
  })

  return (
    <>
      <h2>{user?.name}</h2>
      <h3>added blogs</h3>
      {user?.blogs.map((blog) => (
        <li key={blog.id}>
          {blog.title}
        </li>
      ))}
    </>
  );
}

export default User;
