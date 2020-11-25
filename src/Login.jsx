import React, { useState } from 'react'

import { Redirect, useHistory } from 'react-router-dom'
import { useStateValue } from './StateProvider'
import {axios} from './axios'
function Login() {
    const history = useHistory()
    const [{token} , dispatch] = useStateValue()

    const [email, setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [name, setName] = useState('')
    const [rePass , setRePass] = useState('')

    //declares if you are signing up
    const [up , setUp ]= useState(false)
    
    const [error , setError] = useState(null)
    const handleSign = () => {
        if(up) {
            if(email && password && name) {
                if(password === rePass) {
                    axios.post('/auth/register' , {
                        name : name ,
                        email : email ,
                        password : password
                    }).then(res => history.push('/login'))
                }else {
                    setError("Passwords doesn't match" )
                }

            }
        }else {
            if(email && password) {
                axios.post('/auth/login' , {
                    email : email ,
                    password : password
                }).then(res => {
                    dispatch({type : 'SET_TOKEN' , token : res.data.token})
                    history.push('/')
                })
            }
        }
    }
    return (
        <div className="login">
            {
                token && <Redirect to='/'/>
            }
            
                <img className="login__logo" src="http://media.corporate-ir.net/media_files/IROL/17/176060/Oct18/Amazon%20logo.PNG" alt="amazon logo"/>
            
            <div className="login__info">
            <h2>{up ? "Create account" : "Sign-In"}</h2>
                {
                    up && 
                    <div>
                        <h5>Your Name</h5>
                        <input type="text" name="" id="" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                }
                <h5>Email</h5>
                <input type="email" name="" id="" value={email} onChange={(e) => setEmail(e.target.value)} />
                <h5>Password</h5>
                <input type="password" name="" id="" value={password} onChange={(e) => setPassword(e.target.value)} />
                {
                    up && 
                    <div>
                        <h5>Re-enter password</h5>
                        <input type="password" name="" id="" value={rePass} onChange={(e) => setRePass(e.target.value)} />
                    </div>
                }
                {
                    error && 
                    <p style={{color : 'red' , fontSize : '13px' , width : '300px'}}>*{error}</p>
                }
                <button onClick={handleSign}>{up ? "Create your Amazon account" : "Continue"}</button>
                <p>By {!up ? "continuing" : "creating an account"}, you agree to Amazon's Conditions of Use and Privacy Notice.</p>

                {
                    up &&
                    <div className="signup__paraf"><p>Already have an account?</p><p onClick={() => setUp(false)} className="signup__link">Sign-In</p></div>
                }
            </div>
            {
                !up && 
                    <div>
                        <p className="login__p" >New to Amazon?</p>
                        <button className="login__button" onClick={() => setUp(true)}>Create Your Amazon Account</button>
                    </div>
            }
        
        </div>
    )
}

export default Login
