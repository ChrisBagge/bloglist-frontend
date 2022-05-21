import React, { useEffect } from 'react'

import { useAppDispatch } from '../../app/hooks';
import { useSelector } from 'react-redux';

import { RootState } from '../../app/store'

import { fetchBlogs, selectAllBlogs } from './blogSlice'
import Blog from './Blog';

function BlogList({ user }: {
  user: {
    token: string;
    username: string;
    name: string;
    id: string;
  };
}) {

  const dispatch = useAppDispatch();
  const blogs = useSelector(selectAllBlogs)
  
  const blogStatus = useSelector((state: RootState) => state.blogs.status);

  useEffect(() => {
    if (blogStatus === 'idle') {
      dispatch(fetchBlogs())
    }
  }, [blogStatus, dispatch])

  if (blogStatus === 'succeeded') {

    return (
      <>
        {[...blogs].sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog key={blog.id} blog={blog} name={user.name} />
          ))}
      </>
    );
  }
  return (
    <>Loading</>
  )

}

export default BlogList;
