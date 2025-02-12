import React from 'react';
import { auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { addUser } from '../utils/userSlice';
import { removeUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
import { LOGO } from '../utils/constant';
import { toggleGptSearchView } from '../utils/gptSlice';

const Header = () => {

  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  
  const handleSignOut = () =>{
    signOut(auth)
    .then(() => {})
    .catch((error) => {
      navigate("/error");
    });    
  }
  const dispatch = useDispatch();

  const handleGPTSearchClick = () => {
    console.log('Toggle dispatched')
    dispatch(toggleGptSearchView());
  }

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid:uid, 
            email:email,
            displayName : displayName, 
            photoURL : photoURL
          })
        );
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Unsubscribe when component unmount
    return () => unsubscribe();
  },[]);

  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
        <img className="w-44"
          src = {LOGO}
          alt="logo"
        />
        {user && 
          <div className="flex p-2">
            <button 
              className='py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg'
              onClick={handleGPTSearchClick}> 
                GPT Search 
            </button>
            <img
              className='w-12 h-12'
              src= {user?.photoURL}
              alt="usericon"
            />
            <button className="font-bold text-white"
              onClick = {handleSignOut}>
              (SignOut)
            </button>
          </div> 
        }
    </div>
  )
}

export default Header