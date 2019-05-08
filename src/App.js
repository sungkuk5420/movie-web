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
      return <Movie title={movie.title} poster={movie.large_cover_image}/>
     });

     return movies;
  };
  render() {
    return (
      <div className="App">
        {this.state.movies.length !== 0 ? this.__renderMovive() : "Loding..."}
      </div>
    );
  }
}

export default App;
