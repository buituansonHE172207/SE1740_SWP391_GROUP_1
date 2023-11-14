import { useState, useContext } from "react"
import "./login.scss"
import { useNavigate } from "react-router-dom"
import jwt_decode from "jwt-decode";
import { login } from "../../service/UserService";
import { AuthContext } from "../../context/AuthContext"

const Login = () => {
  const [error, setError] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { dispatch } = useContext(AuthContext)
  const navigate = useNavigate()
  
  const handleLogin = (e) => {
    e.preventDefault()
    login({ email, password}).then(res => {
      const user = jwt_decode(res.data.token)
      if (user.authorities[0].authority !== "ADMIN") {
        setError(true)
        return
      }
      dispatch({ type: "LOGIN", payload: user})
      navigate("/")
    })
    .catch(err => {
      setError(true)
    })
  }

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <input type="email"  placeholder="email" onChange={e => setEmail(e.target.value)}/>
        <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)}/>
        <button>Login</button>
        {error && <span>Wrong email or password!</span>}
      </form>
    </div>
  )
}

export default Login