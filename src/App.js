import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import FilmDetails from './FilmDetails';
import './App.css';

function App() {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/films/top-rented')
      .then((res) => setFilms(res.data))
      .catch((err) => console.error('Error fetching top rented films:', err));
  }, []);

  return (
    <Router>
      <div className="App">
        <h1>🎬 Top 5 Most Rented Films</h1>
        <Routes>
          <Route path="/" element={
            <ul>
              {films.map((film) => (
                <li key={film.film_id}>
                  <Link to={`/films/${film.film_id}`}>
                    <strong>{film.title}</strong> — {film.rental_count} rentals
                  </Link>
                </li>
              ))}
            </ul>
          } />
          <Route path="/films/:id" element={<FilmDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
