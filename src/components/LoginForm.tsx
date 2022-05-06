function LoginForm({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}: {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleUsernameChange: ({ target }: { target: EventTarget & HTMLInputElement }) => void;
  handlePasswordChange: ({ target }: { target: EventTarget & HTMLInputElement }) => void;
  username: string;
  password: string;
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        username
        <input type="text" value={username} name="Username" onChange={handleUsernameChange} />
      </div>
      <div>
        password
        <input type="text" value={password} name="Password" onChange={handlePasswordChange} />
      </div>
      <button type="submit">login</button>
    </form>
  );
}

export default LoginForm;
