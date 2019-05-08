import React, { Component } from 'react';
import './App.css';
import NaviationItem from './NaviationItem';
import DetailItem from './DetailItem';
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
  _renderNavigationItem = () => {
    const movies = this.state.movies.map((movie)=>{
      return <NaviationItem
        title={movie.title}
        poster={movie.medium_cover_image}
        key={movie.id}
        genres={movie.genres}
        synopsis={movie.synopsis}
      />
     });

     return movies;
  };

  _renderDetailItem = () => {
    const movies = this.state.movies.map((movie)=>{
      return <DetailItem
        title={movie.title}
        poster={movie.small_cover_image}
        backgroundImage={movie.background_image_original}
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
      <>
        <ul className="navigation">
          {movies ? this._renderNavigationItem() : "Loading"}
        </ul>

        <div className="detail">
          {movies ? this._renderDetailItem() : "Loading"}
        </div>
      </>
    );
  }
}

export default App;
