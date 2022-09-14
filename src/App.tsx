import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { MovieCard } from "./components/movieCard";
import type { PaginationProps } from "antd";
import "antd/dist/antd.css";
import { Input, Pagination, Spin, Tabs } from "antd";
import { json } from "stream/consumers";
import { getMovies } from "./services/getMovies";
import { Tabs1 } from "./components/Tabs1";

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("return");
  const [current, setCurrent] = useState(1);
  const [isSearch, setIsSearch] = useState("1");
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_KEY}`;
  useEffect(() => {
    getMovies(url, current, query, setMovies);
  }, [query, current]);
  console.log(movies);
  const onChange: PaginationProps["onChange"] = page => {
    console.log(page);
    setCurrent(page);
    window.scrollTo(0, 0);
  };
  const tabOnChange = (key: string) => {
    setIsSearch(key);
    console.log(isSearch);
  };
  return (

    <div className="App">
      <Tabs1 func={setIsSearch} />
      <input value={query} onChange={(event) => {
        setQuery(event.target.value);
      }} />
      <div style={{ display: "flex", flexWrap: "wrap", width: "1000px" }}>
        {movies && isSearch === "1" ? movies.map(({
                                                    original_title,
                                                    overview,
                                                    vote_average,
                                                    release_date,
                                                    poster_path,
                                                    genre_ids,
                                                    id,
                                                    backdrop_path
                                                  }) => < MovieCard title={original_title}
                                                                    overview={overview}
                                                                    vote={vote_average}
                                                                    date={release_date}
                                                                    img={poster_path}
                                                                    img2={backdrop_path}
                                                                    genres={genre_ids}
                                                                    id={id}
        />) : null}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", width: "1000px" }}>
        {isSearch === "2" ? Object.keys(localStorage).map((ids) =>
            <MovieCard {...JSON.parse(localStorage.getItem(ids!)!)} />)
          : null}
      </div>
      <Pagination hideOnSinglePage={true} onChange={onChange} current={current} showSizeChanger={false}
                  defaultCurrent={10} total={40} />
    </div>
  );
}

export default App;
