import React, { useState } from 'react'
import Header from './Header'
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useRef } from 'react';
import { checkValidData } from '../utils/validate';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';


const Login = () => {

  const [isSignInForm, setIsSignForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleSignInForm = () => {
    setIsSignForm(!isSignInForm);
  }

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name.current.value, 
          photoURL: "https://avatars.githubusercontent.com/u/42597089?s=64&v=4"
        })
        .then(() => {
          const {uid, email, displayName, photoURL } = auth.currentUser;
          dispatch(
            addUser({
              uid:uid, 
              email:email,
              displayName : displayName, 
              photoURL : photoURL
            })
          );
          navigate("/browse");
        }).catch((error) => {
          setErrorMessage(error.message);
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + "-" + errorMessage);
      }); 
    } else {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        navigate("/browse");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + "-" + errorMessage);
      });
    }
  };


  return (
    <div>
        <Header/>
        <div className='absolute'>
            <img 
              src= "https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg"
              alt = "background"
            />
        </div>
        <form 
          onSubmit = {(e) => e.preventDefault()}
          className='w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80 rounded-lg'>
          <h1 className='font-bold text-3xl py-4'>
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignInForm && (
            <input
              ref = {name}
              type="text" 
              placeholder="Full name" 
              className='p-4 my-4 w-full bg-gray-700'
            />
          )}
          <input 
            ref = {email}
            type="text" 
            placeholder="Email Address" 
            className='p-4 my-4 w-full bg-gray-700'
          />
          <input
            ref = {password}
            type="text" 
            placeholder="password" 
            className='p-4 my-4 w-full bg-gray-700'
          />
          <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
          <button className='p-4 my-6 bg-red-700 w-full rounded-lg'
          onClick={handleButtonClick}>
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          <p className='py-4 cursor-pointer' onClick ={toggleSignInForm}>
            {isSignInForm ? "New to Netflix? Sign Up" : "Already registered? Sign In"}
          </p>
        </form>
    </div>
  )
}


export default Login;