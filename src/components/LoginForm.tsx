import React, { useState } from 'react';
import { useAppDispatch } from '../app/hooks';

import { setUser as setReduxUser } from '../features/user/userSlice'
import { useUserLoginMutation } from '../features/api/apiSlice'
import { setMessage } from '../features/notification/notificationSlice'

enum NotificationType {
  info = 0,
  error,
}

type NoteType = {
  notificationType: NotificationType,
  message: string
}

function LoginForm() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();

  const [userLogin, { isLoading }] = useUserLoginMutation()

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      //const user = await loginService.login({ username, password });

      const user = await userLogin({ username, password }).unwrap()
      if (user) {
        dispatch(setReduxUser(user))

        //window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
        //blogService.setToken(user.token);
        //setToken(user.token)
        //setUser(user); 
        setUsername(''); setPassword('');
      }
    } catch (exception) {
      setUsername(''); setPassword('');

      const errorNote: NoteType = { notificationType: NotificationType.error, message: `wrong username or password` };
      dispatch(setMessage(errorNote));
      console.log(exception)
      setTimeout(() => {
        dispatch(setMessage({ notificationType: NotificationType.info, message: '' }));
      }, 5000)
    }
  };

  

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input id="username" type="text" value={username} name="Username" onChange={(event) => setUsername(event.target.value)} />
      </div>
      <div>
        password
        <input id="password" type="text" value={password} name="Password" onChange={(event) => setPassword(event.target.value)} />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  );
}

export default LoginForm;
