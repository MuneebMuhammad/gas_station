import React from 'react'

function Login() {
    const handleLogin = (e) => {
        e.preventDefault();
        // Here you would normally check the credentials against a database
        const username = e.target.username.value;
        const password = e.target.password.value;
    
        if (username === 'admin' && password === 'admin') {
            window.location.replace('http://localhost:3000/admin');
        } else if (username === 'user' && password === 'user'){
            window.location.replace('http://localhost:3000/user');
        }
    }

  return (
    <div className="container mt-5">
        <form onSubmit={handleLogin}>
            <input type="text" name="username" placeholder="Username" required />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
    </div>
  )
}

export default Login