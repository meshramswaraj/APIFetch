import React, { useState } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";
import Loading from '../src/assets/loading2.gif'


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
  const[isloading, setisloading]= useState(false)
  const [deatils, setdetails] = useState([]);

  async function fetchMoviehandler() {
    setisloading(true);
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
    setisloading(false)
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviehandler} >Fetch Movies</button>
      </section>
      <section>
        {!isloading && deatils.length > 0 && <MoviesList movies={deatils} />}
        {!isloading && deatils.length=== 0 && <p>Found no movie details.</p>}
        {isloading &&  <img src={Loading}></img>}
      </section>
    </React.Fragment>
  );
}

export default App;
