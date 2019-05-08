import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';
class App extends Component {
  state = {
    movies:[
    ]
  }

  componentDidMount(){
    setTimeout(() => {
      this.setState({
        movies:[
          ...this.state.movies,
          {
            title: "matrix",
            poster: "https://t1.daumcdn.net/movie/e49c2e4eb419a9813228b5ab6bc5b039362236ea"
          },
          {
            title: "Full Metal Jacket",
            poster: "http://thumbnail.egloos.net/600x0/http://pds25.egloos.com/pds/201507/13/40/b0113440_55a2ef988b4f8.jpg"
          },
          {
            title: "Oldboy",
            poster: "http://img.cgv.co.kr/Movie/Thumbnail/Poster/000079/79861/79861_1000.jpg"
          },
          {
            title: "Star Wars",
            poster: "https://upload.wikimedia.org/wikipedia/ko/thumb/6/6a/%EC%8A%A4%ED%83%80%EC%9B%8C%EC%A6%88_%EA%B9%A8%EC%96%B4%EB%82%9C_%ED%8F%AC%EC%8A%A4.jpg/250px-%EC%8A%A4%ED%83%80%EC%9B%8C%EC%A6%88_%EA%B9%A8%EC%96%B4%EB%82%9C_%ED%8F%AC%EC%8A%A4.jpg"
          },
          {
            title: "transformer",
            poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGq676TkuwgI2Yvc5dmYVcvTnd-_ASwf6VJnjHFYSR1BMwEqIv"
          }
        ]
      })
    }, 5000);
  }
  __renderMovive = () => {
    const movies = this.state.movies.map((movie)=>{
      return <Movie title={movie.title} poster={movie.poster}/>
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
