import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const limit = 10;

  const load = useCallback(() => {
    axios.get(`http://localhost:3001/api/customers?limit=${limit}&page=${page}&search=${search}`)
      .then(res => {
        setCustomers(res.data.results);
        setTotal(res.data.total);
      })
      .catch(err => console.error('Error fetching customers:', err));
  }, [limit, page, search]);

  useEffect(() => {
    load();
  }, [load]);

  const onSearch = (e) => {
    e.preventDefault();
    setPage(1);
    load();
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Customers</h2>
      <form onSubmit={onSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by first or last name"
        />
        <button type="submit">Search</button>
      </form>
      <table style={{ marginTop: '1rem', borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(c => (
            <tr key={c.customer_id}>
              <td><Link to={`/customers/${c.customer_id}`}>{c.customer_id}</Link></td>
              <td>{c.first_name} {c.last_name}</td>
              <td>{c.email}</td>
              <td>{c.active ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '1rem' }}>
        Page {page} of {Math.ceil(total / limit)}
        <br />
        {page > 1 && <button onClick={() => setPage(page - 1)}>Previous</button>}
        {page < Math.ceil(total / limit) && <button onClick={() => setPage(page + 1)}>Next</button>}
      </div>
    </div>
  );
}

export default CustomersPage;
