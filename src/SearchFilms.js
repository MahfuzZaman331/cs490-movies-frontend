import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function SearchFilms() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    try {
      const res = await axios.get(`http://localhost:3001/api/films/search?query=${encodeURIComponent(query)}`);
      setResults(res.data);
    } catch (err) {
      console.error('Search failed:', err);
      setResults([]);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Search Films</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          placeholder="Enter film title, actor, or genre"
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: '0.5rem', width: '300px' }}
        />
        <button type="submit" style={{ marginLeft: '1rem' }}>Search</button>
      </form>
      <ul>
        {results.map((film) => (
          <li key={film.film_id}>
            <Link to={`/films/${film.film_id}`}>{film.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchFilms;
