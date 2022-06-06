import React from "react";

import NewBlog from './NewBlog';
import Togglable from './Togglable';
import BlogList from './BlogList'

import { useRef } from 'react';
import { iBlog } from '../interfaces/Blog';
import { RefObject } from './Togglable'
import { useAddBlogMutation } from '../../src/features/api/apiSlice'
import { setMessage } from '../../src/features/notification/notificationSlice'

import { useAppDispatch } from '../app/hooks';


enum NotificationType {
  info = 0,
  error,
}

type NoteType = {
  notificationType: NotificationType,
  message: string
}
function NewBlogBlogList() {

  const [addBlog, { isLoading }] = useAddBlogMutation()

  const dispatch = useAppDispatch()
  const blogFormRef = useRef<RefObject>(null);
  const handleAddBlog = async (title: string, author: string, url: string) => {
    try {
      if (blogFormRef.current)
        blogFormRef.current.toggleVisibility()

      const blog: iBlog = { title, author, url }
      await addBlog(blog).unwrap()

      const infoNote: NoteType = { notificationType: NotificationType.info, message: `a new blog ${blog.title} by ${blog.author} added` };
      dispatch(setMessage(infoNote));
      //setErrorMessage(infoNote);
      setTimeout(() => {
        dispatch(setMessage({ notificationType: NotificationType.info, message: '' }));
      }, 5000)
    } catch (exception) {
      console.log(exception);
    }
  };

  return (
    <>
      <Togglable buttonLabel='New Blog' ref={blogFormRef}>
        <NewBlog
          addNewBlog={handleAddBlog}
        />
      </Togglable>
      <BlogList />
    </>
  )
}

export default NewBlogBlogList