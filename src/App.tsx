import { useRef } from 'react';

import LoginForm from './components/LoginForm';
import NewBlog from './components/NewBlog';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

import { iBlog } from './interfaces/Blog';

import { RefObject } from './components/Togglable'

import BlogList from './features/blog/BlogList';

import {  useAddBlogMutation } from '../src/features/api/apiSlice'

import { setMessage } from '../src/features/notification/notificationSlice'
import { clearUser } from '../src/features/user/userSlice'

import { useAppDispatch, useAppSelector } from './app/hooks';


enum NotificationType {
  info = 0,
  error,
}

type NoteType = {
  notificationType: NotificationType,
  message: string
}


function App() {

  const userRedux = useAppSelector((state) => state.users.user);

  const dispatch = useAppDispatch()
  
  const [addBlog, { isLoading }] = useAddBlogMutation()
  

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
        //setErrorMessage({ notificationType: NotificationType.info, message: '' })
      }, 5000)
    } catch (exception) {
      console.log('exception');
    }
  };

  if (userRedux === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    );
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {userRedux.name} logged-in
        <button
          onClick={() => {
            dispatch(clearUser())

          }}
        >
          logout
        </button>
      </p>
      <Togglable buttonLabel='New Blog' ref={blogFormRef}>
        <NewBlog
          addNewBlog={handleAddBlog}
        />
      </Togglable>
      <BlogList user={userRedux} />
    </div>
  );
}

export default App;
