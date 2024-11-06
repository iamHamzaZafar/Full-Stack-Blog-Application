import { useState } from 'react'
import './LoginSignup.css'
function Login (){
    const[username , setUserName] = useState('') ;
    const[password , setPassword] = useState('') ;
    function hanldeSubmit (e){
        e.preventDefault() ;
        const data = {username , password} ;
        console.log('user details are:' , data)
    }
    return (
        <div className="container">

            <form onSubmit={hanldeSubmit}>
                <h1>Login</h1>
                <input onChange={(e)=>setUserName(e.target.value)} value={username} type="text" placeholder="username" />
                <input onChange={(e)=> setPassword(e.target.value)} value={password} type="password" placeholder="password" />
                <button>Sign in</button>
            </form>
        </div>
    )
}

export default Login