import React, { Component } from 'react';
import './App.css';
import NaviationItem from './NaviationItem';
import DetailItem from './DetailItem';
import $ from 'jquery';
import {TweenMax,TimelineMax,Sine } from "gsap/TweenMax";
class App extends Component {
  state = {
    movies:[
    ]
  }

  componentDidMount(){
    this._getMovies();
  }

  _getMovies = async () => {
    const movies = await this._callApi();
    this.setState({
      movies
    });
    await this._eventBinding();
  }

  _eventBinding = async () => {
    // hide loader
    $('.loader').addClass('is-loaded');

    // init variables
    var slideshow = $(".slideshow"),
      navigation = $(".navigation"),
      navigationItem = $(".navigation-item"),
      detailItem = $(".detail-item"),
      rotation,
      type = '_short';

    // prepare letters
    // $('.headline').each(function() {
    //   console.log($(this).hasClass('space-char'));
    //   const className = $(this).hasClass('space-char') ? 'letter space-char' : 'letter';
    //   $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class="+className+">$&</span>"));
    // });

    // prepare navigation and set navigation items on the right place
    navigationItem.each(function(index, elem) {
      TweenMax.set(elem, {
        left: navigation.width() / 2 - navigationItem.width() / 2 - 10,
        rotation: 90 + (index * 360 / navigationItem.length),
        transformOrigin: "50% " + navigation.width() / 2 + "px"
      });
      TweenMax.set($(elem).find('.rotate-holder'), {
        text: String(index * 360 / navigationItem.length)
      });
      TweenMax.set($(elem).find('.background-holder'), {
        rotation: -90 - (index * 360 / navigationItem.length),
      });
    });

    // set tween values
    function setTweenValues() {
      rotation = Number($(this).find('.rotate-holder').text());
    }

    // do tween
    function doTween(target) {
      var targetIndex = navigationItem.index(target),
        timeline = new TimelineMax();

      navigationItem.each(function() {
        $(this).removeClass('active');
        if ($(this).index() === $(target).index()) {
          $(this).addClass('active');
        }
      });
      detailItem.each(function() {
        $(this).removeClass('active');
        if ($(this).index() === $(target).index()) {
          $(this).addClass('active');
        }
      });

      console.log(rotation + type);
      timeline
        .to(navigation, 0.6, {
          rotation: -rotation + type,
          transformOrigin: "50% 50%",
          ease: Sine.easeInOut
        })
        .staggerTo(navigationItem.find('.background-holder'), 0.6, {
          cycle: {
            rotation: function(index, element) {
              return -90 - Number($(element).prev('.rotate-holder').text()) + rotation + type;
            }
          },
          transformOrigin: "50% 50%",
          ease: Sine.easeInOut,
        }, 0, '-=0.6')
        .staggerFromTo($('.active').find('.letter'), 0.3, {
          autoAlpha: 0,
          x: -100,
        },
        {
          autoAlpha: 1,
          x: 0,
          ease: Sine.easeInOut,
        }, 0.025, '-=0.3')
        .fromTo($('.active').find('.background'), 0.9, {
          autoAlpha: 0,
          x: -100,
        },
        {
          autoAlpha: 1,
          x: 0,
          ease: Sine.easeInOut,
        }, 0.05, '+=0.3');
    }

    navigationItem.on('mouseenter', setTweenValues);
    navigationItem.on('click', function() {
       doTween($(this));
    });

    TweenMax.to(slideshow, 1, { autoAlpha: 1 });
    TweenMax.to($('.active').find('.letter'), 0.7, { autoAlpha: 1, x: 0 });
    TweenMax.to($('.active').find('.background'), 0.7, { autoAlpha: 1, x: 0 });

    (function () {
    var width = window.innerWidth;

    window.addEventListener('resize', function () {
      if (window.innerWidth !== width) {
        window.location.reload(true);
      }
    });
    })();
  }

  _callApi = () => {
    return fetch("https://yts.am/api/v2/list_movies.json?sort_by=rating")
    .then(data => data.json())
    .then(movies => movies.data.movies.slice(0,9))
    .catch(error => console.log(error));
  }
  _renderNavigationItem = () => {
    const movies = this.state.movies.map((movie,index)=>{
      return <NaviationItem
        title={movie.title}
        poster={movie.medium_cover_image}
        key={movie.id}
        genres={movie.genres}
        synopsis={movie.synopsis}
        rotate = {index*40}
        index = {index}
      />
     });

     return movies;
  };

  _renderDetailItem = () => {
    const movies = this.state.movies.map((movie,index)=>{
      return <DetailItem
        title={movie.title}
        poster={movie.small_cover_image}
        backgroundImage={movie.background_image_original}
        key={movie.id}
        genres={movie.genres}
        synopsis={movie.synopsis}
        index = {index}
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
