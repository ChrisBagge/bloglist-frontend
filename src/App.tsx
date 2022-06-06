
import { clearUser } from '../src/features/user/userSlice'
import { useAppDispatch, useAppSelector } from './app/hooks';
import LoginForm from './components/LoginForm';

import Notification from './components/Notification';

import {
  Outlet
} from "react-router-dom"





function App() {

  const user = useAppSelector((state) => state.users.user);
  const dispatch = useAppDispatch()


  if (user === null) {
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
      <div>
        {user.name} logged-in
        <div>
          <button onClick={() => { dispatch(clearUser()) }} >
            logout
          </button>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default App;
