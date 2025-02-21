import React, { useRef } from 'react'
import openai from '../utils/openai';
import { API_OPTIONS } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { addGptMovieResult } from '../utils/gptSlice';

const GptSearchBar = () => {

  const dispatch = useDispatch();
  // helper function to search movie in TMDB
  const searchMovieTMDB = async(movie) => {
    const data = await fetch('https://api.themoviedb.org/3/search/movie?query='+movie+'&include_adult=false&language=en-US&page=1',API_OPTIONS);
    const json = await data.json();
    console.log(json.results);
    return json.results;
  }

  const handleGptSearchClick = async () => {
    console.log(searchText.current.value);
    
    const gptQuery = "Act as a movie recommendation system and suggest some movies for the query"+searchText.current.value+"only give me names of 5 movies, comma separated";

    const gptResults = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
          { role: "developer", content: gptQuery}],
    });

    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");
    console.log(gptMovies);

    // For each movie search TMDB api and find the results of that movie
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    // [Promise, Promise, Promise, Promise, Promise]
    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults);
    dispatch(addGptMovieResult({movieNames: gptMovies, movieResults: tmdbResults}));
  }

  const searchText = useRef(null);

  return (
    <div className='pt-[8%] flex justify-center'>
        <form 
          className=' bg-black w-1/2 grid grid-cols-12' 
          onSubmit={(e)=>e.preventDefault()}
        >
            <input 
                type="text" 
                className="p-4 m-4 col-span-9" 
                placeholder='What would you like to watch today?'
                ref={searchText}
            />
            <button 
              className='col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg'
              onClick = {handleGptSearchClick}
             >
                Search
            </button>
        </form>
    </div>
  )
}

export default GptSearchBar