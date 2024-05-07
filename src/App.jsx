import React, { useState } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";

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
  const [deatils, setdetails] = useState([]);
  async function fetchMoviehandler() {
    const response = await fetch("https://swapi.dev/api/films/");
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
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviehandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={deatils} />
      </section>
    </React.Fragment>
  );
}

export default App;
