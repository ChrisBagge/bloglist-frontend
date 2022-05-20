import { useState } from 'react';
import { BlogDB } from '../interfaces/Blog';
import React from 'react'

function Blog({ blog, likeBlog, name, deleteBlog }: { blog: BlogDB, likeBlog: (likedBlog: BlogDB) => void, name: string, deleteBlog: (id: string) => void }) {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [viewDetails, setviewDetails] = useState(false);

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
      <button onClick={() => likeBlog(blog)}>like</button><br />
      {blog.user.name}
      {name === blog.user.name &&
        <>
          <button onClick={() => deleteBlog(blog.id)}>remove</button><br />
        </>
      }


    </div>
  );
}

export default Blog;
