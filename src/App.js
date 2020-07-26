import React, { Component } from 'react';
import './App.css';
import NaviationItem from './NaviationItem';
import DetailItem from './DetailItem';
import $ from 'jquery';
import { TweenMax, TimelineMax, Sine } from "gsap/TweenMax";
class App extends Component {
  state = {
    movies: [
    ]
  }

  componentDidMount() {
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
    //   const className = $(this).hasClass('space-char') ? 'letter space-char' : 'letter';
    //   $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class="+className+">$&</span>"));
    // });

    // prepare navigation and set navigation items on the right place
    navigationItem.each(function (index, elem) {
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
      var timeline = new TimelineMax();

      navigationItem.each(function () {
        $(this).removeClass('active');
        if ($(this).index() === $(target).index()) {
          $(this).addClass('active');
        }
      });
      detailItem.each(function () {
        $(this).removeClass('active');
        if ($(this).index() === $(target).index()) {
          $(this).addClass('active');
        }
      });

      timeline
        .to(navigation, 0.6, {
          rotation: -rotation + type,
          transformOrigin: "50% 50%",
          ease: Sine.easeInOut
        })
        .staggerTo(navigationItem.find('.background-holder'), 0.6, {
          cycle: {
            rotation: function (index, element) {
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
    navigationItem.on('click', function () {
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
    // return fetch("https://yts.mx/api/v2/list_movies.json?sort_by=rating")
    //   .then(data => data.json())
    //   .then(movies => { window.movies = movies.data.movies.slice(0, 9); return movies.data.movies.slice(0, 9) })
    //   .catch(error => console.log(error));
    return [
      {
        "id": 15553,
        "url": "https://yts.mx/movies/doctor-who-the-day-of-the-doctor-2013",
        "imdb_code": "tt2779318",
        "title": "Doctor Who The Day of the Doctor",
        "title_english": "Doctor Who The Day of the Doctor",
        "title_long": "Doctor Who The Day of the Doctor (2013)",
        "slug": "doctor-who-the-day-of-the-doctor-2013",
        "year": 2013,
        "rating": 9.4,
        "runtime": 77,
        "genres": [
          "Adventure",
          "Drama",
          "Family",
          "Mystery",
          "Sci-Fi"
        ],
        "summary": "In 2013, something terrible is awakening in London's National Gallery; in 1562, a murderous plot is afoot in Elizabethan England; and somewhere in space an ancient battle reaches its devastating conclusion.",
        "description_full": "In 2013, something terrible is awakening in London's National Gallery; in 1562, a murderous plot is afoot in Elizabethan England; and somewhere in space an ancient battle reaches its devastating conclusion.",
        "synopsis": "In 2013, something terrible is awakening in London's National Gallery; in 1562, a murderous plot is afoot in Elizabethan England; and somewhere in space an ancient battle reaches its devastating conclusion.",
        "yt_trailer_code": "Mkq8pnvsnQg",
        "language": "English",
        "mpa_rating": "",
        "background_image": "https://yts.mx/assets/images/movies/doctor_who_the_day_of_the_doctor_2013/background.jpg",
        "background_image_original": "https://yts.mx/assets/images/movies/doctor_who_the_day_of_the_doctor_2013/background.jpg",
        "small_cover_image": "https://yts.mx/assets/images/movies/doctor_who_the_day_of_the_doctor_2013/small-cover.jpg",
        "medium_cover_image": "https://yts.mx/assets/images/movies/doctor_who_the_day_of_the_doctor_2013/medium-cover.jpg",
        "large_cover_image": "https://yts.mx/assets/images/movies/doctor_who_the_day_of_the_doctor_2013/large-cover.jpg",
        "state": "ok",
        "torrents": [
          {
            "url": "https://yts.mx/torrent/download/522D19B70EB06419D339E4B1470640090CA69286",
            "hash": "522D19B70EB06419D339E4B1470640090CA69286",
            "quality": "720p",
            "type": "bluray",
            "seeds": 100,
            "peers": 11,
            "size": "734.9 MB",
            "size_bytes": 770598502,
            "date_uploaded": "2020-02-24 05:16:24",
            "date_uploaded_unix": 1582517784
          },
          {
            "url": "https://yts.mx/torrent/download/682E309437DFAE8BA08F44AD00D236B94FC0CD30",
            "hash": "682E309437DFAE8BA08F44AD00D236B94FC0CD30",
            "quality": "1080p",
            "type": "bluray",
            "seeds": 100,
            "peers": 13,
            "size": "1.42 GB",
            "size_bytes": 1524713390,
            "date_uploaded": "2020-02-24 07:15:16",
            "date_uploaded_unix": 1582524916
          }
        ],
        "date_uploaded": "2020-02-24 05:16:24",
        "date_uploaded_unix": 1582517784
      },
      {
        "id": 3709,
        "url": "https://yts.mx/movies/the-shawshank-redemption-1994",
        "imdb_code": "tt0111161",
        "title": "The Shawshank Redemption",
        "title_english": "The Shawshank Redemption",
        "title_long": "The Shawshank Redemption (1994)",
        "slug": "the-shawshank-redemption-1994",
        "year": 1994,
        "rating": 9.3,
        "runtime": 142,
        "genres": [
          "Action",
          "Crime",
          "Drama"
        ],
        "summary": "Chronicles the experiences of a formerly successful banker as a prisoner in the gloomy jailhouse of Shawshank after being found guilty of a crime he did not commit. The film portrays the man's unique way of dealing with his new, torturous life; along the way he befriends a number of fellow prisoners, most notably a wise long-term inmate named Red.",
        "description_full": "Chronicles the experiences of a formerly successful banker as a prisoner in the gloomy jailhouse of Shawshank after being found guilty of a crime he did not commit. The film portrays the man's unique way of dealing with his new, torturous life; along the way he befriends a number of fellow prisoners, most notably a wise long-term inmate named Red.",
        "synopsis": "Chronicles the experiences of a formerly successful banker as a prisoner in the gloomy jailhouse of Shawshank after being found guilty of a crime he did not commit. The film portrays the man's unique way of dealing with his new, torturous life; along the way he befriends a number of fellow prisoners, most notably a wise long-term inmate named Red.",
        "yt_trailer_code": "K_tLp7T6U1c",
        "language": "English",
        "mpa_rating": "R",
        "background_image": "https://yts.mx/assets/images/movies/The_Shawshank_Redemption_1994/background.jpg",
        "background_image_original": "https://yts.mx/assets/images/movies/The_Shawshank_Redemption_1994/background.jpg",
        "small_cover_image": "https://yts.mx/assets/images/movies/The_Shawshank_Redemption_1994/small-cover.jpg",
        "medium_cover_image": "https://yts.mx/assets/images/movies/The_Shawshank_Redemption_1994/medium-cover.jpg",
        "large_cover_image": "https://yts.mx/assets/images/movies/The_Shawshank_Redemption_1994/large-cover.jpg",
        "state": "ok",
        "torrents": [
          {
            "url": "https://yts.mx/torrent/download/AC418DB33FA5CEA4FAB11BC58008FE08F291C9BE",
            "hash": "AC418DB33FA5CEA4FAB11BC58008FE08F291C9BE",
            "quality": "720p",
            "type": "bluray",
            "seeds": 478,
            "peers": 134,
            "size": "848.96 MB",
            "size_bytes": 890199081,
            "date_uploaded": "2015-11-01 03:20:23",
            "date_uploaded_unix": 1446344423
          },
          {
            "url": "https://yts.mx/torrent/download/E0D00667650ABA9EE05AACBBBD8B55EA8A51F534",
            "hash": "E0D00667650ABA9EE05AACBBBD8B55EA8A51F534",
            "quality": "1080p",
            "type": "bluray",
            "seeds": 531,
            "peers": 75,
            "size": "1.60 GB",
            "size_bytes": 1717986918,
            "date_uploaded": "2015-11-01 03:20:25",
            "date_uploaded_unix": 1446344425
          }
        ],
        "date_uploaded": "2015-11-01 03:20:23",
        "date_uploaded_unix": 1446344423
      },
      {
        "id": 3304,
        "url": "https://yts.mx/movies/the-godfather-1972",
        "imdb_code": "tt0068646",
        "title": "The Godfather",
        "title_english": "The Godfather",
        "title_long": "The Godfather (1972)",
        "slug": "the-godfather-1972",
        "year": 1972,
        "rating": 9.2,
        "runtime": 175,
        "genres": [
          "Action",
          "Crime",
          "Drama"
        ],
        "summary": "The Godfather \"Don\" Vito Corleone is the head of the Corleone mafia family in New York. He is at the event of his daughter's wedding. Michael, Vito's youngest son and a decorated WW II Marine is also present at the wedding. Michael seems to be uninterested in being a part of the family business. Vito is a powerful man, and is kind to all those who give him respect but is ruthless against those who do not. But when a powerful and treacherous rival wants to sell drugs and needs the Don's influence for the same, Vito refuses to do it. What follows is a clash between Vito's fading old values and the new ways which may cause Michael to do the thing he was most reluctant in doing and wage a mob war against all the other mafia families which could tear the Corleone family apart.",
        "description_full": "The Godfather \"Don\" Vito Corleone is the head of the Corleone mafia family in New York. He is at the event of his daughter's wedding. Michael, Vito's youngest son and a decorated WW II Marine is also present at the wedding. Michael seems to be uninterested in being a part of the family business. Vito is a powerful man, and is kind to all those who give him respect but is ruthless against those who do not. But when a powerful and treacherous rival wants to sell drugs and needs the Don's influence for the same, Vito refuses to do it. What follows is a clash between Vito's fading old values and the new ways which may cause Michael to do the thing he was most reluctant in doing and wage a mob war against all the other mafia families which could tear the Corleone family apart.",
        "synopsis": "The Godfather \"Don\" Vito Corleone is the head of the Corleone mafia family in New York. He is at the event of his daughter's wedding. Michael, Vito's youngest son and a decorated WW II Marine is also present at the wedding. Michael seems to be uninterested in being a part of the family business. Vito is a powerful man, and is kind to all those who give him respect but is ruthless against those who do not. But when a powerful and treacherous rival wants to sell drugs and needs the Don's influence for the same, Vito refuses to do it. What follows is a clash between Vito's fading old values and the new ways which may cause Michael to do the thing he was most reluctant in doing and wage a mob war against all the other mafia families which could tear the Corleone family apart.",
        "yt_trailer_code": "Ak19g0j10-Q",
        "language": "English",
        "mpa_rating": "",
        "background_image": "https://yts.mx/assets/images/movies/The_Godfather_1972/background.jpg",
        "background_image_original": "https://yts.mx/assets/images/movies/The_Godfather_1972/background.jpg",
        "small_cover_image": "https://yts.mx/assets/images/movies/The_Godfather_1972/small-cover.jpg",
        "medium_cover_image": "https://yts.mx/assets/images/movies/The_Godfather_1972/medium-cover.jpg",
        "large_cover_image": "https://yts.mx/assets/images/movies/The_Godfather_1972/large-cover.jpg",
        "state": "ok",
        "torrents": [
          {
            "url": "https://yts.mx/torrent/download/C168B84FC2B8CF062B67E4168E35C98F10BC7C74",
            "hash": "C168B84FC2B8CF062B67E4168E35C98F10BC7C74",
            "quality": "720p",
            "type": "bluray",
            "seeds": 306,
            "peers": 87,
            "size": "1.20 GB",
            "size_bytes": 1288490189,
            "date_uploaded": "2015-11-01 02:36:37",
            "date_uploaded_unix": 1446341797
          },
          {
            "url": "https://yts.mx/torrent/download/5E915039C619366E490D08DB3FFED21F3A3AE84A",
            "hash": "5E915039C619366E490D08DB3FFED21F3A3AE84A",
            "quality": "1080p",
            "type": "bluray",
            "seeds": 636,
            "peers": 144,
            "size": "2.40 GB",
            "size_bytes": 2576980378,
            "date_uploaded": "2015-11-01 02:36:38",
            "date_uploaded_unix": 1446341798
          }
        ],
        "date_uploaded": "2015-11-01 02:36:37",
        "date_uploaded_unix": 1446341797
      },
      {
        "id": 15527,
        "url": "https://yts.mx/movies/top-gear-africa-special-part-1-2013",
        "imdb_code": "tt2741136",
        "title": "Top Gear Africa Special, Part 1",
        "title_english": "Top Gear Africa Special, Part 1",
        "title_long": "Top Gear Africa Special, Part 1 (2013)",
        "slug": "top-gear-africa-special-part-1-2013",
        "year": 2013,
        "rating": 9.2,
        "runtime": 59,
        "genres": [
          "Adventure",
          "Comedy",
          "Reality-TV",
          "Talk-Show"
        ],
        "summary": "In the first of a two-part Top Gear special, Jeremy Clarkson, Richard Hammond and James May are in Africa with a simple mission - to find the definitive source of the Nile. Over the years many explorers claim to have already done just that, but the Top Gear trio believe that they can do better by traveling using only grit, ingenuity and three ageing estate cars.",
        "description_full": "In the first of a two-part Top Gear special, Jeremy Clarkson, Richard Hammond and James May are in Africa with a simple mission - to find the definitive source of the Nile. Over the years many explorers claim to have already done just that, but the Top Gear trio believe that they can do better by traveling using only grit, ingenuity and three ageing estate cars.",
        "synopsis": "In the first of a two-part Top Gear special, Jeremy Clarkson, Richard Hammond and James May are in Africa with a simple mission - to find the definitive source of the Nile. Over the years many explorers claim to have already done just that, but the Top Gear trio believe that they can do better by traveling using only grit, ingenuity and three ageing estate cars.",
        "yt_trailer_code": "",
        "language": "English",
        "mpa_rating": "",
        "background_image": "https://yts.mx/assets/images/movies/top_gear_africa_special_part_1_2013/background.jpg",
        "background_image_original": "https://yts.mx/assets/images/movies/top_gear_africa_special_part_1_2013/background.jpg",
        "small_cover_image": "https://yts.mx/assets/images/movies/top_gear_africa_special_part_1_2013/small-cover.jpg",
        "medium_cover_image": "https://yts.mx/assets/images/movies/top_gear_africa_special_part_1_2013/medium-cover.jpg",
        "large_cover_image": "https://yts.mx/assets/images/movies/top_gear_africa_special_part_1_2013/large-cover.jpg",
        "state": "ok",
        "torrents": [
          {
            "url": "https://yts.mx/torrent/download/D76F89A72BF04B770A4B3C79EDBBCCBC8FEFDC70",
            "hash": "D76F89A72BF04B770A4B3C79EDBBCCBC8FEFDC70",
            "quality": "720p",
            "type": "web",
            "seeds": 18,
            "peers": 0,
            "size": "1.02 GB",
            "size_bytes": 1095216660,
            "date_uploaded": "2020-02-23 01:25:37",
            "date_uploaded_unix": 1582417537
          },
          {
            "url": "https://yts.mx/torrent/download/ECA37497C70EC2F4D2B81DCE0D297DC01CAD5236",
            "hash": "ECA37497C70EC2F4D2B81DCE0D297DC01CAD5236",
            "quality": "1080p",
            "type": "web",
            "seeds": 27,
            "peers": 7,
            "size": "1.89 GB",
            "size_bytes": 2029372047,
            "date_uploaded": "2020-02-23 03:25:48",
            "date_uploaded_unix": 1582424748
          }
        ],
        "date_uploaded": "2020-02-23 01:25:37",
        "date_uploaded_unix": 1582417537
      },
      {
        "id": 9717,
        "url": "https://yts.mx/movies/natsamrat-2016",
        "imdb_code": "tt5311546",
        "title": "Natsamrat",
        "title_english": "Natsamrat",
        "title_long": "Natsamrat (2016)",
        "slug": "natsamrat-2016",
        "year": 2016,
        "rating": 9.1,
        "runtime": 0,
        "genres": [
          "Action",
          "Drama",
          "Family"
        ],
        "summary": "The film is a tragedy about a veteran theatre actor named Ganpat \"Appa\" Belwalkar (Nana Patekar) who has been the best of his lot during his heyday, garnering fame and fortune acting in plays based on various works, especially William Shakespeare's. It is a tragedy of a veteran actor who enjoyed a very vital importance in his life but who becomes the victim of old age alienation and estrangement. The film reveals an intensely tragic fate of an actor who becomes victim of fate and fortune in old age, which is similar to the fate of Lear. Natsamrat suffers the pangs of old age and dishonor inflicted on him by his own children. It is a tragedy of great humanist and actor who succumbs to the ill fate and destiny. In fact, Natsamrat is a story of Ganpatrao Belvalkar, who withstands great suffering after his retirement from stage acting.",
        "description_full": "The film is a tragedy about a veteran theatre actor named Ganpat \"Appa\" Belwalkar (Nana Patekar) who has been the best of his lot during his heyday, garnering fame and fortune acting in plays based on various works, especially William Shakespeare's. It is a tragedy of a veteran actor who enjoyed a very vital importance in his life but who becomes the victim of old age alienation and estrangement. The film reveals an intensely tragic fate of an actor who becomes victim of fate and fortune in old age, which is similar to the fate of Lear. Natsamrat suffers the pangs of old age and dishonor inflicted on him by his own children. It is a tragedy of great humanist and actor who succumbs to the ill fate and destiny. In fact, Natsamrat is a story of Ganpatrao Belvalkar, who withstands great suffering after his retirement from stage acting.",
        "synopsis": "The film is a tragedy about a veteran theatre actor named Ganpat \"Appa\" Belwalkar (Nana Patekar) who has been the best of his lot during his heyday, garnering fame and fortune acting in plays based on various works, especially William Shakespeare's. It is a tragedy of a veteran actor who enjoyed a very vital importance in his life but who becomes the victim of old age alienation and estrangement. The film reveals an intensely tragic fate of an actor who becomes victim of fate and fortune in old age, which is similar to the fate of Lear. Natsamrat suffers the pangs of old age and dishonor inflicted on him by his own children. It is a tragedy of great humanist and actor who succumbs to the ill fate and destiny. In fact, Natsamrat is a story of Ganpatrao Belvalkar, who withstands great suffering after his retirement from stage acting.",
        "yt_trailer_code": "DCXDyIsPEN8",
        "language": "English",
        "mpa_rating": "",
        "background_image": "https://yts.mx/assets/images/movies/natsamrat_2016/background.jpg",
        "background_image_original": "https://yts.mx/assets/images/movies/natsamrat_2016/background.jpg",
        "small_cover_image": "https://yts.mx/assets/images/movies/natsamrat_2016/small-cover.jpg",
        "medium_cover_image": "https://yts.mx/assets/images/movies/natsamrat_2016/medium-cover.jpg",
        "large_cover_image": "https://yts.mx/assets/images/movies/natsamrat_2016/large-cover.jpg",
        "state": "ok",
        "torrents": [
          {
            "url": "https://yts.mx/torrent/download/9C2440F9D38F769B768660FE715D36572776F681",
            "hash": "9C2440F9D38F769B768660FE715D36572776F681",
            "quality": "720p",
            "type": "web",
            "seeds": 26,
            "peers": 7,
            "size": "1.37 GB",
            "size_bytes": 1471026299,
            "date_uploaded": "2018-11-12 08:18:51",
            "date_uploaded_unix": 1542007131
          },
          {
            "url": "https://yts.mx/torrent/download/5ACEB9A75BD576A15EDA44E196E6569F052AA28D",
            "hash": "5ACEB9A75BD576A15EDA44E196E6569F052AA28D",
            "quality": "1080p",
            "type": "web",
            "seeds": 36,
            "peers": 3,
            "size": "2.64 GB",
            "size_bytes": 2834678415,
            "date_uploaded": "2018-11-12 10:38:01",
            "date_uploaded_unix": 1542015481
          }
        ],
        "date_uploaded": "2018-11-12 08:18:51",
        "date_uploaded_unix": 1542007131
      },
      {
        "id": 3175,
        "url": "https://yts.mx/movies/the-dark-knight-2008",
        "imdb_code": "tt0468569",
        "title": "The Dark Knight",
        "title_english": "The Dark Knight",
        "title_long": "The Dark Knight (2008)",
        "slug": "the-dark-knight-2008",
        "year": 2008,
        "rating": 9,
        "runtime": 152,
        "genres": [
          "Action",
          "Adventure",
          "Crime",
          "Drama",
          "Thriller"
        ],
        "summary": "Set within a year after the events of Batman Begins (2005), Batman, Lieutenant James Gordon, and new District Attorney Harvey Dent successfully begin to round up the criminals that plague Gotham City, until a mysterious and sadistic criminal mastermind known only as \"The Joker\" appears in Gotham, creating a new wave of chaos. Batman's struggle against The Joker becomes deeply personal, forcing him to \"confront everything he believes\" and improve his technology to stop him. A love triangle develops between Bruce Wayne, Dent, and Rachel Dawes.",
        "description_full": "Set within a year after the events of Batman Begins (2005), Batman, Lieutenant James Gordon, and new District Attorney Harvey Dent successfully begin to round up the criminals that plague Gotham City, until a mysterious and sadistic criminal mastermind known only as \"The Joker\" appears in Gotham, creating a new wave of chaos. Batman's struggle against The Joker becomes deeply personal, forcing him to \"confront everything he believes\" and improve his technology to stop him. A love triangle develops between Bruce Wayne, Dent, and Rachel Dawes.",
        "synopsis": "Set within a year after the events of Batman Begins (2005), Batman, Lieutenant James Gordon, and new District Attorney Harvey Dent successfully begin to round up the criminals that plague Gotham City, until a mysterious and sadistic criminal mastermind known only as \"The Joker\" appears in Gotham, creating a new wave of chaos. Batman's struggle against The Joker becomes deeply personal, forcing him to \"confront everything he believes\" and improve his technology to stop him. A love triangle develops between Bruce Wayne, Dent, and Rachel Dawes.",
        "yt_trailer_code": "kmJLuwP3MbY",
        "language": "English",
        "mpa_rating": "PG-13",
        "background_image": "https://yts.mx/assets/images/movies/The_Dark_Knight_2008/background.jpg",
        "background_image_original": "https://yts.mx/assets/images/movies/The_Dark_Knight_2008/background.jpg",
        "small_cover_image": "https://yts.mx/assets/images/movies/The_Dark_Knight_2008/small-cover.jpg",
        "medium_cover_image": "https://yts.mx/assets/images/movies/The_Dark_Knight_2008/medium-cover.jpg",
        "large_cover_image": "https://yts.mx/assets/images/movies/The_Dark_Knight_2008/large-cover.jpg",
        "state": "ok",
        "torrents": [
          {
            "url": "https://yts.mx/torrent/download/F5D61BF3D57082BA2EE1305DA5DF8DCD10D34539",
            "hash": "F5D61BF3D57082BA2EE1305DA5DF8DCD10D34539",
            "quality": "720p",
            "type": "bluray",
            "seeds": 86,
            "peers": 66,
            "size": "949.99 MB",
            "size_bytes": 996136714,
            "date_uploaded": "2015-11-01 02:20:06",
            "date_uploaded_unix": 1446340806
          },
          {
            "url": "https://yts.mx/torrent/download/A54926C2E07B0E5F0243954330B599B31C804F0B",
            "hash": "A54926C2E07B0E5F0243954330B599B31C804F0B",
            "quality": "1080p",
            "type": "bluray",
            "seeds": 775,
            "peers": 151,
            "size": "1.70 GB",
            "size_bytes": 1825361101,
            "date_uploaded": "2015-11-01 02:20:12",
            "date_uploaded_unix": 1446340812
          },
          {
            "url": "https://yts.mx/torrent/download/61BE42FB337B1B84F844B88FD904982A0A2330E3",
            "hash": "61BE42FB337B1B84F844B88FD904982A0A2330E3",
            "quality": "2160p",
            "type": "bluray",
            "seeds": 161,
            "peers": 60,
            "size": "7.52 GB",
            "size_bytes": 8074538516,
            "date_uploaded": "2020-05-26 17:14:13",
            "date_uploaded_unix": 1590506053
          }
        ],
        "date_uploaded": "2015-11-01 02:20:06",
        "date_uploaded_unix": 1446340806
      },
      {
        "id": 3305,
        "url": "https://yts.mx/movies/the-godfather-part-ii-1974",
        "imdb_code": "tt0071562",
        "title": "The Godfather: Part II",
        "title_english": "The Godfather: Part II",
        "title_long": "The Godfather: Part II (1974)",
        "slug": "the-godfather-part-ii-1974",
        "year": 1974,
        "rating": 9,
        "runtime": 202,
        "genres": [
          "Action",
          "Crime",
          "Drama"
        ],
        "summary": "The continuing saga of the Corleone crime family tells the story of a young Vito Corleone growing up in Sicily and in 1910s New York; and follows Michael Corleone in the 1950s as he attempts to expand the family business into Las Vegas, Hollywood and Cuba.",
        "description_full": "The continuing saga of the Corleone crime family tells the story of a young Vito Corleone growing up in Sicily and in 1910s New York; and follows Michael Corleone in the 1950s as he attempts to expand the family business into Las Vegas, Hollywood and Cuba.",
        "synopsis": "The continuing saga of the Corleone crime family tells the story of a young Vito Corleone growing up in Sicily and in 1910s New York; and follows Michael Corleone in the 1950s as he attempts to expand the family business into Las Vegas, Hollywood and Cuba.",
        "yt_trailer_code": "9O1Iy9od7-A",
        "language": "English",
        "mpa_rating": "",
        "background_image": "https://yts.mx/assets/images/movies/The_Godfather_Part_II_1974/background.jpg",
        "background_image_original": "https://yts.mx/assets/images/movies/The_Godfather_Part_II_1974/background.jpg",
        "small_cover_image": "https://yts.mx/assets/images/movies/The_Godfather_Part_II_1974/small-cover.jpg",
        "medium_cover_image": "https://yts.mx/assets/images/movies/The_Godfather_Part_II_1974/medium-cover.jpg",
        "large_cover_image": "https://yts.mx/assets/images/movies/The_Godfather_Part_II_1974/large-cover.jpg",
        "state": "ok",
        "torrents": [
          {
            "url": "https://yts.mx/torrent/download/B27022D09BC067D46BBDB65AE62348AB3F21C727",
            "hash": "B27022D09BC067D46BBDB65AE62348AB3F21C727",
            "quality": "720p",
            "type": "bluray",
            "seeds": 383,
            "peers": 63,
            "size": "1.30 GB",
            "size_bytes": 1395864371,
            "date_uploaded": "2015-11-01 02:36:45",
            "date_uploaded_unix": 1446341805
          },
          {
            "url": "https://yts.mx/torrent/download/6C9124FE9A99B2001FAD76A76152691BC515A80D",
            "hash": "6C9124FE9A99B2001FAD76A76152691BC515A80D",
            "quality": "1080p",
            "type": "bluray",
            "seeds": 247,
            "peers": 31,
            "size": "2.70 GB",
            "size_bytes": 2899102925,
            "date_uploaded": "2015-11-01 02:36:50",
            "date_uploaded_unix": 1446341810
          }
        ],
        "date_uploaded": "2015-11-01 02:36:45",
        "date_uploaded_unix": 1446341805
      },
      {
        "id": 2429,
        "url": "https://yts.mx/movies/pulp-fiction-1994",
        "imdb_code": "tt0110912",
        "title": "Pulp Fiction",
        "title_english": "Pulp Fiction",
        "title_long": "Pulp Fiction (1994)",
        "slug": "pulp-fiction-1994",
        "year": 1994,
        "rating": 8.9,
        "runtime": 154,
        "genres": [
          "Action",
          "Crime",
          "Drama"
        ],
        "summary": "Jules Winnfield (Samuel L. Jackson) and Vincent Vega (John Travolta) are two hit men who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace (Ving Rhames). Wallace has also asked Vincent to take his wife Mia (Uma Thurman) out a few days later when Wallace himself will be out of town. Butch Coolidge (Bruce Willis) is an aging boxer who is paid by Wallace to lose his fight. The lives of these seemingly unrelated people are woven together comprising of a series of funny, bizarre and uncalled-for incidents.",
        "description_full": "Jules Winnfield (Samuel L. Jackson) and Vincent Vega (John Travolta) are two hit men who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace (Ving Rhames). Wallace has also asked Vincent to take his wife Mia (Uma Thurman) out a few days later when Wallace himself will be out of town. Butch Coolidge (Bruce Willis) is an aging boxer who is paid by Wallace to lose his fight. The lives of these seemingly unrelated people are woven together comprising of a series of funny, bizarre and uncalled-for incidents.",
        "synopsis": "Jules Winnfield (Samuel L. Jackson) and Vincent Vega (John Travolta) are two hit men who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace (Ving Rhames). Wallace has also asked Vincent to take his wife Mia (Uma Thurman) out a few days later when Wallace himself will be out of town. Butch Coolidge (Bruce Willis) is an aging boxer who is paid by Wallace to lose his fight. The lives of these seemingly unrelated people are woven together comprising of a series of funny, bizarre and uncalled-for incidents.",
        "yt_trailer_code": "tGpTpVyI_OQ",
        "language": "English",
        "mpa_rating": "R",
        "background_image": "https://yts.mx/assets/images/movies/Pulp_Fiction_1994/background.jpg",
        "background_image_original": "https://yts.mx/assets/images/movies/Pulp_Fiction_1994/background.jpg",
        "small_cover_image": "https://yts.mx/assets/images/movies/Pulp_Fiction_1994/small-cover.jpg",
        "medium_cover_image": "https://yts.mx/assets/images/movies/Pulp_Fiction_1994/medium-cover.jpg",
        "large_cover_image": "https://yts.mx/assets/images/movies/Pulp_Fiction_1994/large-cover.jpg",
        "state": "ok",
        "torrents": [
          {
            "url": "https://yts.mx/torrent/download/D55F1E840F1BD6576EAD67A4D04E5D6EA294414B",
            "hash": "D55F1E840F1BD6576EAD67A4D04E5D6EA294414B",
            "quality": "720p",
            "type": "bluray",
            "seeds": 116,
            "peers": 25,
            "size": "751.29 MB",
            "size_bytes": 787784663,
            "date_uploaded": "2015-11-01 01:52:11",
            "date_uploaded_unix": 1446339131
          },
          {
            "url": "https://yts.mx/torrent/download/3F8F219568B8B229581DDDD7BC5A5E889E906A9B",
            "hash": "3F8F219568B8B229581DDDD7BC5A5E889E906A9B",
            "quality": "1080p",
            "type": "bluray",
            "seeds": 512,
            "peers": 40,
            "size": "1.40 GB",
            "size_bytes": 1503238554,
            "date_uploaded": "2015-11-01 01:52:15",
            "date_uploaded_unix": 1446339135
          }
        ],
        "date_uploaded": "2015-11-01 01:52:11",
        "date_uploaded_unix": 1446339131
      },
      {
        "id": 2640,
        "url": "https://yts.mx/movies/schindlers-list-1993",
        "imdb_code": "tt0108052",
        "title": "Schindler's List",
        "title_english": "Schindler's List",
        "title_long": "Schindler's List (1993)",
        "slug": "schindlers-list-1993",
        "year": 1993,
        "rating": 8.9,
        "runtime": 195,
        "genres": [
          "Action",
          "Biography",
          "Drama",
          "History"
        ],
        "summary": "Oskar Schindler is a vain and greedy German businessman who becomes an unlikely humanitarian amid the barbaric German Nazi reign when he feels compelled to turn his factory into a refuge for Jews. Based on the true story of Oskar Schindler who managed to save about 1100 Jews from being gassed at the Auschwitz concentration camp, it is a testament to the good in all of us.",
        "description_full": "Oskar Schindler is a vain and greedy German businessman who becomes an unlikely humanitarian amid the barbaric German Nazi reign when he feels compelled to turn his factory into a refuge for Jews. Based on the true story of Oskar Schindler who managed to save about 1100 Jews from being gassed at the Auschwitz concentration camp, it is a testament to the good in all of us.",
        "synopsis": "Oskar Schindler is a vain and greedy German businessman who becomes an unlikely humanitarian amid the barbaric German Nazi reign when he feels compelled to turn his factory into a refuge for Jews. Based on the true story of Oskar Schindler who managed to save about 1100 Jews from being gassed at the Auschwitz concentration camp, it is a testament to the good in all of us.",
        "yt_trailer_code": "bJcLRFWxRno",
        "language": "English",
        "mpa_rating": "R",
        "background_image": "https://yts.mx/assets/images/movies/Schindlers_List_1993/background.jpg",
        "background_image_original": "https://yts.mx/assets/images/movies/Schindlers_List_1993/background.jpg",
        "small_cover_image": "https://yts.mx/assets/images/movies/Schindlers_List_1993/small-cover.jpg",
        "medium_cover_image": "https://yts.mx/assets/images/movies/Schindlers_List_1993/medium-cover.jpg",
        "large_cover_image": "https://yts.mx/assets/images/movies/Schindlers_List_1993/large-cover.jpg",
        "state": "ok",
        "torrents": [
          {
            "url": "https://yts.mx/torrent/download/69B6CF5AD84C75E257A0597F827E1F032BA831BF",
            "hash": "69B6CF5AD84C75E257A0597F827E1F032BA831BF",
            "quality": "720p",
            "type": "bluray",
            "seeds": 223,
            "peers": 49,
            "size": "1.20 GB",
            "size_bytes": 1288490189,
            "date_uploaded": "2015-11-01 01:16:11",
            "date_uploaded_unix": 1446336971
          },
          {
            "url": "https://yts.mx/torrent/download/F64C844C39FCD6A5F9157884E97296F7019DB83B",
            "hash": "F64C844C39FCD6A5F9157884E97296F7019DB83B",
            "quality": "1080p",
            "type": "bluray",
            "seeds": 126,
            "peers": 32,
            "size": "2.50 GB",
            "size_bytes": 2684354560,
            "date_uploaded": "2015-11-01 01:16:14",
            "date_uploaded_unix": 1446336974
          }
        ],
        "date_uploaded": "2015-11-01 01:16:11",
        "date_uploaded_unix": 1446336971
      }
    ]
  }
  _renderNavigationItem = () => {
    const movies = this.state.movies.map((movie, index) => {
      return <NaviationItem
        title={movie.title}
        poster={movie.medium_cover_image}
        key={movie.id}
        genres={movie.genres}
        synopsis={movie.synopsis}
        rotate={index * 40}
        index={index}
      />
    });

    return movies;
  };

  _renderDetailItem = () => {
    const movies = this.state.movies.map((movie, index) => {
      return <DetailItem
        title={movie.title}
        poster={movie.small_cover_image}
        backgroundImage={movie.background_image_original}
        key={movie.id}
        genres={movie.genres}
        synopsis={movie.synopsis}
        index={index}
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
