import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RentFilm() {
  const [films, setFilms] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/api/films/all')
      .then((res) => setFilms(res.data))
      .catch(() => {});
    axios.get('http://localhost:3001/api/customers/all')
      .then((res) => setCustomers(res.data))
      .catch(() => {});
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/api/rentals/rent', {
      film_id: selectedFilm,
      customer_id: selectedCustomer,
    })
      .then((res) => setStatus(res.data.message || 'Rental created'))
      .catch(() => setStatus('Rental failed'));
  };

  return (
    <div>
      <h2>Rent a Film</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Select Film: </label>
          <select value={selectedFilm} onChange={(e) => setSelectedFilm(e.target.value)} required>
            <option value="">--Choose a film--</option>
            {Array.isArray(films) && films.map((film) => (
              <option key={film.film_id} value={film.film_id}>
                {film.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Select Customer: </label>
          <select value={selectedCustomer} onChange={(e) => setSelectedCustomer(e.target.value)} required>
            <option value="">--Choose a customer--</option>
            {Array.isArray(customers) && customers.map((customer) => (
              <option key={customer.customer_id} value={customer.customer_id}>
                {customer.first_name} {customer.last_name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Rent Film</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}

export default RentFilm;
