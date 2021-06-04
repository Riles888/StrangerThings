import React, { useEffect, useState} from 'react';
import Axios from 'axios';

export default function Login() {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");

    const [loginStatus, setLoginStatus] = useState(""); 
    const [token, setToken] = useState("");
    
    const user = {user: 
        {
            username: username,
            password: password,
        }
    }
    const login = async () => {
        console.log(username, password);
       
        let response = await Axios.post("https://strangers-things.herokuapp.com/api/2104-uic-web-ft/users/login", 
        user)
        console.log('Here is the response object: ', response);

        const userToken = response.data.data.token
        const setToken = userToken;
        localStorage.setItem('token', setToken)
        console.log('Stored token: ', setToken);

        
    };
    

return (
    <div>
      <h1>Login</h1><br/><br/>
      <div className="registration">
        <label>Username</label> <br/>
        <input
          type="text"
          onChange={(e) => {
            setusername(e.target.value);
          }}
        />
        <br/><label>Password</label><br/>
        <input
          type="text"
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        />
        <br/><br/><button onClick={() => login()}> Login </button>
      </div>

      <h1>{loginStatus}</h1>
    </div>
  );
}