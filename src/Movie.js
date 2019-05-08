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

function MoviePoster ({poster}){
    return (
        <img src={poster}></img>
    )
}

export default Movie;