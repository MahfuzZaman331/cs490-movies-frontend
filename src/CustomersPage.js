import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/customers?page=${page}&search=${search}`);
        setCustomers(res.data.customers);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error('Error fetching customers:', err);
      }
    };

    fetchCustomers();
  }, [page, search]);

  const onSearch = (e) => {
    e.preventDefault();
    setPage(1); // useEffect will trigger fetch
  };

  return (
    <div style={{ marginLeft: '200px' }}>
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

      <table>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Active</th>
          </tr>
        </thead>
        <tbody>
          {customers.length > 0 ? (
            customers.map((c) => (
              <tr key={c.customer_id}>
                <td><Link to={`/customers/${c.customer_id}`}>{c.customer_id}</Link></td>
                <td>{c.first_name} {c.last_name}</td>
                <td>{c.email}</td>
                <td>{c.active ? 'Yes' : 'No'}</td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="4">No results</td></tr>
          )}
        </tbody>
      </table>

      <div>
        Page {page} of {totalPages}
        <div>
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
          <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default CustomersPage;
