import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import FilmDetails from './FilmDetails';
import TopActors from './TopActors';
import ActorDetails from './ActorDetails';
import SearchFilms from './SearchFilms';
import RentFilm from './RentFilm';
import CustomersPage from './CustomersPage';
import CustomerDetails from './CustomerDetails';
import './App.css';

function App() {
  const [topFilms, setTopFilms] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/films/top-rented')
      .then(r => setTopFilms(r.data))
      .catch(() => {});
  }, []);

  return (
    <Router>
      <div className="App" style={{ padding: '2rem' }}>
        <h1>Top 5 Most Rented Films</h1>

        <nav style={{ marginBottom: '1rem' }}>
          <Link to="/">Home</Link> {' | '}
          <Link to="/actors">Top Actors</Link> {' | '}
          <Link to="/search">Search Films</Link> {' | '}
          <Link to="/rent">Rent a Film</Link> {' | '}
          <Link to="/customers">Customers</Link>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <ul>
                {topFilms.map(f => (
                  <li key={f.film_id}>
                    <Link to={`/films/${f.film_id}`}>{f.title}</Link> — {f.rental_count} rentals
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
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/customers/:id" element={<CustomerDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
