import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {MovieCard} from "./components/movieCard";
import type {PaginationProps} from 'antd';
import 'antd/dist/antd.css'
import {Input, Pagination, Spin, Tabs} from "antd"
import {json} from "stream/consumers";

function App() {
    const [movies, setMovies] = useState([])
    const [query, setQuery] = useState('')
    const [current, setCurrent] = useState(1)
    const [isSearch, setIsSearch] = useState('1')
    const api = 'ddb44769a9fa28d200546e7d28aa707c'
    const session = "6380fcbe82721b8fda03ebc779996483"
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=ddb44769a9fa28d200546e7d28aa707c'
    useEffect(() => {
        fetch(`${url}&language=en-US&page=${current}&include_adult=false&query=${query}`)
            .then((res) => {
                return res.json()
            })
            .then((body) => {
                console.log(body.results);
                setMovies(body.results)
            })
    }, [query, current])
    console.log(movies)
    const onChange: PaginationProps['onChange'] = page => {
        console.log(page);
        setCurrent(page);
    };
    const tabOnChange = (key: string) => {
        setIsSearch(key)
        console.log(isSearch)
    };
    return (

        <div className="App">
            <div className="tabs">
                <Tabs onChange={tabOnChange}>
                    <Tabs.TabPane tab="Search" key="1">
                        Content of Tab Pane 1
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Rates" key="2">
                        Content of Tab Pane 2
                    </Tabs.TabPane>
                </Tabs>
            </div>
            <input value={query} onChange={(event) => {
                setQuery(event.target.value)
            }}/>
            {movies && isSearch === '1' ? movies.map(({
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
                                                    key={id}
                                                    id={id}
            />) : null}
            {isSearch === '2' ? Object.keys(localStorage).map((ids)=> <MovieCard {...JSON.parse(localStorage.getItem(ids!)!)}/> )
                : null}
            <Pagination hideOnSinglePage={true} onChange={onChange} current={current} showSizeChanger={false}
                        defaultCurrent={10} total={40}/>
        </div>
    );
}

export default App;
