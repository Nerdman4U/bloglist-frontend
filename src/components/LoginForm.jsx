import PropTypes from 'prop-types'

const LoginForm = ({
  loginFormHandler,
  usernameClickHandler,
  passwordClickHandler,
  username,
  password
}) => {
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={loginFormHandler}>
        <div>
        username
          <input
            type="text"
            value={username}
            name="username"
            autoComplete="username"
            onChange={usernameClickHandler}
          />
        </div>
        <div>
        password
          <input
            type="password"
            value={password}
            name="password"
            autoComplete="current-password"
            onChange={passwordClickHandler}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  loginFormHandler: PropTypes.func,
  usernameClickHandler: PropTypes.func,
  passwordClickHandler: PropTypes.func,
  username: PropTypes.string,
  password: PropTypes.string
}

export default LoginForm
