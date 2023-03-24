import React,{useState,useEffect} from 'react'
import axios from 'axios';
import "./row.css"
import YouTube from "react-youtube"
import movieTrailer  from "movie-trailer";
axios.defaults.baseURL = "https://api.themoviedb.org/3"



function Row({title,fetchUrl,isLargeRow}) {

    const [movies,setMovies] = useState([]);
    const base_url = "https://image.tmdb.org/t/p/original/";
    const [trailerUrl, setTrailerUrl] = useState('')


    useEffect(() =>{
        async function fetchData(){
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    },[fetchUrl]);

    const opts = {
      height: "390",
      width: "100%",
      playerVars: {
          autoplay: 1.
      },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
        setTrailerUrl('');
    } else {
        movieTrailer(movie?.name || "")
            .then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search)
                setTrailerUrl(urlParams.get('v'));
            })
    }
}
  
  return (
    <div className='row'>
        <h2 id='title'>{title}</h2>
        <div className='row__posters'>
          {movies.map(movie =>(
            <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`} 
            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.name}/>
          ))}

        </div>
         {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  )
}

export default Row