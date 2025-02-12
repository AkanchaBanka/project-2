import React from 'react'
import GptMovieSuggestions from './GptMovieSuggestions'
import GptSearchBar from './GptSearchBar'
import { BACKGROUND_URL } from '../utils/constant'

const GptSearchPage = () => {
  return (
    <div>
      <div className='absolute -z-10'>
          <img 
            src= {BACKGROUND_URL}
            alt = "background"
          />
      </div>
      <GptSearchBar/>
      <GptMovieSuggestions/>
    </div>
  )
}

export default GptSearchPage