import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';

const Login = ({type, setToken, setUser}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const title = type === 'login' ? 'Login' : 'Register';
  const toggleTitle = type === 'login' ? "Don't have an account?" : "Already registered?";
  const toggleType = type === 'login' ? 'register' : 'login';
  const history = useHistory();
 

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('username: ', username);
    console.log('password: ', password);
    const response = await fetch(`https://strangers-things.herokuapp.com/api/2104-UIC-RM-WEB-FT/users/${type}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          username,
          password
        }
      })
    });
    const {data} = await response.json();
    const token = data?.token;
    if (token) {
    setToken(token);
    localStorage.setItem('token', token)
      const response = await fetch(`https://strangers-things.herokuapp.com/api/2104-UIC-RM-WEB-FT/users/me`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    const {data} = await response.json();
    console.log("data:", data)
    setUser(data)
    setUsername('');
    setPassword('');
    history.push('/');
  }
}
  return <>
    <div className="login-container">
    <h2 className="login-title">{title}</h2>
    <form onSubmit={handleSubmit} className="signin-form">
      <input type="text"  value={username} onChange={(event) => setUsername(event.target.value)}placeholder="username"></input>
      <input type="password" value={password} onChange={(event) => setPassword(event.target.value)}placeholder="password"></input>
      <button type="submit" className="button" >{title}</button>
    <Link to={`/${toggleType}`} className="toggle-login">{toggleTitle}</Link>
    </form>
    </div>
  </>
}

export default Login;