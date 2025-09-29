import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FilmDetails from './FilmDetails';
import TopActors from './TopActors';
import SearchFilms from './SearchFilms';
import RentFilm from './RentFilm';
import CustomersPage from './CustomersPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App" style={{ padding: '1.5rem' }}>
        <h1>Top 5 Most Rented Films</h1>

        <nav style={{ marginBottom: '1rem' }}>
          <Link to="/">Home</Link> |{' '}
          <Link to="/actors">Top Actors</Link> |{' '}
          <Link to="/search">Search Films</Link> |{' '}
          <Link to="/rent">Rent a Film</Link> |{' '}
          <Link to="/customers">Customers</Link>
        </nav>

        <Routes>
          <Route path="/" element={<div />} />
          <Route path="/films/:id" element={<FilmDetails />} />
          <Route path="/actors" element={<TopActors />} />
          <Route path="/search" element={<SearchFilms />} />
          <Route path="/rent" element={<RentFilm />} />
          <Route path="/customers" element={<CustomersPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
