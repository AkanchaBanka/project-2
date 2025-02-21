import React from 'react'

const MovieCard = ({posterPath}) => {
  if (!posterPath){
    return null;
  }
  return (
    <div className='w-48 pr-4'>
        <img 
            src={"https://image.tmdb.org/t/p/w500" + posterPath}
            alt = "movie poster"
        />
    </div>
  )
}

export default MovieCard