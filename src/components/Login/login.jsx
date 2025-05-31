import './login.css'
import {useState} from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const Login=()=>{
    const [userName,setUserName]=useState("")
    const [password,setPassword]=useState("")
    const [errorMessage, setErrorMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const navigate=useNavigate()
    const jwtToken=Cookies.get('jwt_token')
    if(jwtToken!==undefined){
        return <Navigate to="/" replace/>
    }
    const onUsernameChange=(e)=>{
        setUserName(e.target.value)
    }
    const onPasswordChange=(e)=>{
        setPassword(e.target.value)
    }
    const displayErrorMessage = (message) => {
        setErrorMessage(message);
    }
    const handleSubmit=async(event)=>{
        event.preventDefault()
        const url="https://apis.ccbp.in/login"
        const details={
            "username": userName,
            "password": password
        }
        const options={
            method:"POST",
            body:JSON.stringify(details),
        }
        const response=await fetch(url,options)
        const data=await response.json()
        if (response.ok === true) {
            Cookies.set('jwt_token', data.jwt_token, { expires: 30 })
            navigate('/',{replace:true})
        }
        else{
            setUserName('');
            setPassword('');
            displayErrorMessage(data.error_msg);
            setIsError(true);
        }
    }

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="logo"
          className="login-logo"
        />

        <label htmlFor="username" className="login-label">USERNAME</label>
        <input
          type="text"
          id="username"
          name="username"
          className="login-input"
          placeholder="Username"
          onChange={onUsernameChange}
          value={userName}
          required
        />

        <label htmlFor="password" className="login-label">PASSWORD</label>
        <input
          type="password"
          id="password"
          name="password"
          className="login-input"
          placeholder="Password"
          onChange={onPasswordChange}
          value={password}
          required
        />

        <button type="submit" className="login-button">Login</button>
        {isError && <p className='error-message'>{errorMessage}</p>}
      </form>
    </div>
  )
}
export default Login