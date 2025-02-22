import React from 'react'
import GptMovieSuggestions from './GptMovieSuggestions'
import GptSearchBar from './GptSearchBar'
import { BACKGROUND_URL } from '../utils/constant'

const GptSearchPage = () => {
  return (
    <>
      <div className='fixed -z-10'>
            <img className='h-screen object-cover'
              src= {BACKGROUND_URL}
              alt = "background"
            />
        </div>
      <div className='pt-[10%] md:pt-0'>
        <GptSearchBar/>
        <GptMovieSuggestions/>
      </div>
    </>
  )
}

export default GptSearchPage