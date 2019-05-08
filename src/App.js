import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';
class App extends Component {
  state = {
    movies:[
    ]
  }

  componentDidMount(){
    this.__getMovies();
  }

  __getMovies = async () => {
    const movies = await this.__callApi();
    console.log(movies);
    this.setState({
      movies
    });
  }

  __callApi = () => {
    return fetch("https://yts.am/api/v2/list_movies.json?sort_by=rating")
    .then(data => data.json())
    .then(movies => movies.data.movies)
    .catch(error => console.log(error));
  }
  __renderMovive = () => {
    const movies = this.state.movies.map((movie)=>{
      return <Movie
        title={movie.title}
        poster={movie.medium_cover_image}
        key={movie.id}
        genres={movie.genres}
        synopsis={movie.synopsis}
      />
     });

     return movies;
  };
  render() {
    const { movies } = this.state;
    return (
      <div className={movies ? "App" : "App--loading"}>
        {movies ? this.__renderMovive() : "Loading"}
      </div>
    );
  }
}

export default App;
