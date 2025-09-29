import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CustomersPage() {
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const totalPages = Math.max(1, Math.ceil(total / limit));

  const load = () => {
    axios
      .get(`http://localhost:3001/api/customers?page=${page}&limit=${limit}&q=${encodeURIComponent(q)}`)
      .then((res) => {
        setRows(res.data.data || []);
        setTotal(res.data.total || 0);
      })
      .catch(() => {});
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line
  }, [page]);

  const onSearch = (e) => {
    e.preventDefault();
    setPage(1);
    load();
  };

  return (
    <div style={{ padding: '1.5rem' }}>
      <h2>Customers</h2>
      <form onSubmit={onSearch} style={{ marginBottom: '1rem' }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by ID, first or last name"
          style={{ padding: '0.5rem', width: 280, marginRight: 8 }}
        />
        <button type="submit">Search</button>
      </form>

      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%', maxWidth: 900 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((c) => (
            <tr key={c.customer_id}>
              <td>{c.customer_id}</td>
              <td>{c.first_name} {c.last_name}</td>
              <td>{c.email}</td>
              <td>{c.address}</td>
              <td>{c.active ? 'Yes' : 'No'}</td>
            </tr>
          ))}
          {!rows.length && (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>No results</td>
            </tr>
          )}
        </tbody>
      </table>

      <div style={{ marginTop: 12 }}>
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1}>Prev</button>
        <span style={{ margin: '0 8px' }}>Page {page} of {totalPages}</span>
        <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page >= totalPages}>Next</button>
      </div>

      <div style={{ marginTop: 16 }}>
        <Link to="/">Home</Link>
      </div>
    </div>
  );
}

export default CustomersPage;
