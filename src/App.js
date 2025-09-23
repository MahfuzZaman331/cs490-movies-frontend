import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import FilmDetails from './FilmDetails';
import TopActors from './TopActors';
import ActorDetails from './ActorDetails';
import SearchFilms from './SearchFilms';
import RentFilm from './RentFilm';
import './App.css';

function App() {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/films/top-rented')
      .then((res) => setFilms(res.data))
      .catch(() => {});
  }, []);

  return (
    <Router>
      <div className="App">
        <h1>🎬 Top 5 Most Rented Films</h1>
        <nav style={{ marginBottom: '2rem' }}>
          <Link to="/">Home</Link> |{' '}
          <Link to="/actors">Top Actors</Link> |{' '}
          <Link to="/search">Search Films</Link> |{' '}
          <Link to="/rent">Rent a Film</Link>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <ul>
                {films.map((film) => (
                  <li key={film.film_id}>
                    <Link to={`/films/${film.film_id}`}>
                      {film.title} — {film.rental_count} rentals
                    </Link>
                  </li>
                ))}
              </ul>
            }
          />
          <Route path="/films/:id" element={<FilmDetails />} />
          <Route path="/actors" element={<TopActors />} />
          <Route path="/actors/:id" element={<ActorDetails />} />
          <Route path="/search" element={<SearchFilms />} />
          <Route path="/rent" element={<RentFilm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
