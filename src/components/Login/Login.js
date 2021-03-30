import { useContext } from "react";
import { useState } from 'react';
import { useHistory, useLocation } from "react-router";
import { UserContext } from "../../App";
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from "./LoginManager";



function Login() {
  const [newUser,setNewUser] = useState(false)
  const [user,setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password:"",
    photo: "",
  })

  initializeLoginFramework();
 const [loggedInUser,setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

const googleSignIn = () =>{
  handleGoogleSignIn()
  .then( res => {
    handleResponse( res,true )
  })
}

const fbSignIn = () =>{
  handleFbSignIn()
  .then ( res => {
    handleResponse( res,true )
  })
}

const signOut = () =>{
  handleSignOut()
  .then ( res => {
    handleResponse( res,false )
  })
}

  const handleBlur = (event) =>{
    let isFieldValid = true;

    if(event.target.name === 'email'){
       isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if(event.target.name === 'password'){
      const isPasswordValid = event.target.value.length >= 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[event.target.name] = event.target.value;
      console.log(newUserInfo)
      setUser(newUserInfo);
    }

  }

  const handleSubmit = (event) =>{ 
    if( newUser && user.email && user.password){
      createUserWithEmailAndPassword( user.name,user.email,user.password )
      .then ( res => {
        handleResponse( res,true )
      })
    }

    if( !newUser && user.email && user.password){
      signInWithEmailAndPassword( user.email,user.password )
      .then ( res => {
        handleResponse( res,true )
      })
    }
    event.preventDefault();
  }

  const handleResponse = ( res,redirect ) =>{
    setUser(res);
    setLoggedInUser(res);
    if(redirect){
      history.replace(from);
    }
  }
  
  return (
    <div style={{textAlign:"center"}}>
      {
        user.isSignedIn ? <button onClick={signOut}>Sign out</button> :
        <button onClick={googleSignIn}>Sign in</button>
      }
      <br/>
        <button onClick={fbSignIn}> Sign in with facebook</button>
      {
        user.isSignedIn && <p> Welcome,{user.name}</p>
      }
      <br></br><br></br><br></br>
      <h1> Our own authentication</h1>
      <p style={{color:"red"}}> {user.error} </p>
      { user.success && <p style={{color:"green"}}> user{ newUser?" created":" logged in"} successfully </p>}
      <form onSubmit={handleSubmit}>
        <input type="checkbox" onChange={()=> setNewUser(!newUser)} name="newUser" id=""/>
        <label htmlFor="newUser"> Sign up </label>
        <br/>
        {
          newUser && <input type="text" onBlur={handleBlur} name="name" placeholder="your name"/>
        }
        <br/>
        <input type="text" onBlur={handleBlur} name="email" placeholder="your email" required/>
        <br></br>
        <input type="password" onBlur={handleBlur} name="password" id="" placeholder="your password" required/>
        <br></br>
        <input type="submit" value="Submit"/>
      </form>
    </div>
  );
}

export default Login;
