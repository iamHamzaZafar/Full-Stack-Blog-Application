import './LoginSignup.css'
function Login (){
    return (
        <div className="container">

            <form action="">
                <h1>Login</h1>
                <input type="text" placeholder="username" />
                <input type="password" placeholder="password" />
                <button>Sign in</button>
            </form>
        </div>
    )
}

export default Login