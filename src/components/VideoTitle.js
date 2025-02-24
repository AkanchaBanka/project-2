import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className= "w-screen aspect-video pt-[9%] px-24 absolute text-white bg-gradient-to-r from-black">
        <h1 className='text-2xl md:text-6xl font-bold text-white'>{title}</h1>
        <p className='hidden md:inline-block p-6 text-lg w-1/4 text-white'>{overview}</p>
        <div className='my-4 md:my-0'>
            <button className='bg-white text-black py-1 md:py-4 px-6 text-xl rounded-lg hover:bg-opacity-80'> 
                ▶️ Play
            </button>
            <button className='hidden md:inline-block mx-2 my-2 bg-gray-500 text-white p-4 px-12 text-xl bg-opacity-50 rounded-lg'>
                 More Info
            </button>
        </div>
    </div>
  )
}

export default VideoTitle