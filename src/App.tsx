import { useEffect, useState, useRef } from 'react';
import Blog from '../src/features/blog/Blog'
import LoginForm from './components/LoginForm';
import NewBlog from './components/NewBlog';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

import { iBlog } from './interfaces/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

import { RefObject } from './components/Togglable'

import { BlogDB } from './interfaces/Blog'


type user = {
  token: string;
  username: string;
  name: string;
  id: string;
};

enum NotificationType {
  info = 0,
  error,
}

type NoteType = {
  notificationType: NotificationType,
  message: string
}


function App() {
  const [blogs, setBlogs] = useState<BlogDB[]>([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<user | null>(null);

  const [errorMessage, setErrorMessage] = useState<NoteType>({ notificationType: 0, message: '' });


  useEffect(() => {
    blogService.getAll().then((initialBlogs) => {
      console.log(initialBlogs);
      setBlogs(initialBlogs);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const blogFormRef = useRef<RefObject>(null);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('logging in with', username, password);
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user); setUsername(''); setPassword('');
    } catch (exception) {
      setUsername(''); setPassword('');
      const errorNote: NoteType = { notificationType: NotificationType.error, message: `wrong username or password` };
      setErrorMessage(errorNote);
      console.log(exception)
      setTimeout(() => {
        setErrorMessage({ notificationType: NotificationType.info, message: '' })
      }, 5000)
    }
  };
  const handleNewBlog = async (title: string, author: string, url: string) => {
    try {
      if (blogFormRef.current)
        blogFormRef.current.toggleVisibility()

      const blog: iBlog = { title, author, url }

      const savedBlog = await blogService.create(blog);

      setBlogs(blogs.concat(savedBlog))
      const infoNote: NoteType = { notificationType: NotificationType.info, message: `a new blog ${blog.title} by ${blog.author} added` };
      setErrorMessage(infoNote);
      setTimeout(() => {
        setErrorMessage({ notificationType: NotificationType.info, message: '' })
      }, 5000)
    } catch (exception) {
      console.log('exception');
    }
  };

  const handleLike = async (likedBlog: BlogDB) => {
    likedBlog.likes++
    console.log(user)
    try {
      const likedBlogUserId = {
        "id": likedBlog.id,
        "title": likedBlog.title,
        "author": likedBlog.author,
        "url": likedBlog.url,
        "likes": likedBlog.likes,
        "user": likedBlog.user.id
      }
      const updatedBlog = await blogService.update(likedBlogUserId.id, likedBlogUserId)

      setBlogs(blogs.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog))

    }

    catch (exception) {
      console.log(exception)
    }



  }

  const deleteBlog = (id: string) => {
    if (window.confirm(`Delete ${blogs.find(blog => blog.id === id)?.title} ?`)) {
      blogService.deleteBlog(id)
      setBlogs(blogs.filter(n => n.id !== id))
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification noteType={errorMessage} />
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>
    );
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification noteType={errorMessage} />
      <p>
        {user.name} logged-in
        <button
          onClick={() => {
            window.localStorage.removeItem('loggedBlogappUser');
            setUser(null);
          }}
        >
          logout
        </button>
      </p>
      <Togglable buttonLabel='New Blog' ref={blogFormRef}>
        <NewBlog
          addNewBlog={handleNewBlog}
        />
      </Togglable>
      {blogs.sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} name={user.name} />
        ))}

    </div>
  );
}

export default App;
