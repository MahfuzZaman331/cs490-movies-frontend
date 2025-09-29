import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function TopFilms() {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/films/top-rented')
      .then((res) => setFilms(res.data))
      .catch((err) => console.error('Error fetching top films:', err));
  }, []);

  return (
    <div>
      <ul>
        {films.map((film) => (
          <li key={film.film_id}>
            <Link to={`/films/${film.film_id}`}>
              <strong>{film.title}</strong> — {film.rental_count} rentals
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopFilms;
