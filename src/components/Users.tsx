import React from 'react'

import { useGetUsersQuery } from '../features/api/apiSlice'
import { Link } from 'react-router-dom'

function Users() {

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUsersQuery()

  return (
    <>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
              <th><Link to={`/users/${user.id}`}>{user.name}</Link></th>
              <th>{user.blogs.length}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Users;
