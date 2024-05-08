import React, { useEffect, useState } from "react";
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
  const [startRunning, setStartrunning] = useState(false);

  
  async function fetchMoviehandler() {
    setisloading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/film/");
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
    }
    setisloading(false);
  }

  return (
    <React.Fragment>
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
            <button>Cancel</button>
          </p>
        )}
      </section>
    </React.Fragment>
  );
}

export default App;
