import React, { useEffect, useState , useCallback} from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";
import Loading from "../src/assets/loading2.gif";

const dummyMovies = [
  {
    id: 1,
    title: "Some Dummy Movie",
    openingText: "This is the opening text of the movie",
    releaseDate: "2021-05-18",
  },
  {
    id: 2,
    title: "Some Dummy Movie 2",
    openingText: "This is the second opening text of the movie",
    releaseDate: "2021-05-19",
  },
];

function App() {
  const [isloading, setisloading] = useState(false);
  const [deatils, setdetails] = useState([]);
  const [error, setError] = useState(null);
  const [retryInterval, setRetryInterval] = useState(null);

  

   
  const fetchMoviehandler= useCallback(async()=> {
    setisloading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films/");
      if (!response.ok) {
        throw new Error("Something went wrong... ");
      }

      const data = await response.json();
      const transformation = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setdetails(transformation);
    } catch (err) {
      setError(err.message);
      setRetryInterval(setInterval(fetch("https://swapi.dev/api/film/"), 2000));
    }
    setisloading(false);
  }, [])

  useEffect(()=>{
    fetchMoviehandler()
  }, [fetchMoviehandler])

  const cancelRetry = () => {
    if (retryInterval) {
      console.log('cleaned interval')
      clearInterval(retryInterval);
      setRetryInterval(null);
    }
  };

  // useEffect(() => {
  //   // Cleanup interval on component unmount
  //   return () => {
  //     cancelRetry();
  //   };
  // }, []);
  const submitHandler = (e) => {
    e.preventDefault();

  }

  return (
    <React.Fragment>
      <section>
        <form>
        <label htmlFor="title">Title</label>
        <input type="text" id="title"/> <br/>
        <label htmlFor="openingText">Opening Text</label>
        <textarea rows='5' id="openingText"/><br/>
        <label htmlFor="date">Release Date</label>
        <input type="text" id="date"/><br/>
        <button style={{marginLeft: '210px'}}type="submit" onClick={submitHandler}>Add Movie</button>
        </form>

      </section>
      <section>
        <button onClick={fetchMoviehandler}>Fetch Movies</button>
      </section>

      <section>
        {!isloading && deatils.length > 0 && <MoviesList movies={deatils} />}
        {!isloading && deatils.length === 0 && !error && (
          <p>Found no movie details.</p>
        )}
        
        {isloading && <img src={Loading}></img>}
        {!isloading && error && (
          <p>
            {error}
            <b>Retrying</b>
            <button onClick={cancelRetry}>Cancel</button>
          </p>
        )}


      </section>
    </React.Fragment>
  );
}

export default App;
