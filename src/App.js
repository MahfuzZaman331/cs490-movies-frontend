import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/films/top-rented')
      .then((response) => {
        setFilms(response.data);
      })
      .catch((error) => {
        console.error('Error fetching top rented films:', error);
      });
  }, []);

  return (
    <div className="App">
      <h1>🎬 Top 5 Most Rented Films</h1>
      <ul>
        {films.map((film) => (
          <li key={film.film_id}>
            <strong>{film.title}</strong> — {film.rental_count} rentals
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
