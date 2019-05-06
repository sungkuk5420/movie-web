import React, { Component } from 'react';
import './movie.css';

class Movie extends Component {
    render () {
        return (
            <>
            <MoviePoster poster={this.props.poster}/>
            <h1>{this.props.title}</h1>
            </>
        )
    }
}

class MoviePoster extends Component {
    render () {
        return (
            <img src={this.props.poster}></img>
        )
    }
}
export default Movie;