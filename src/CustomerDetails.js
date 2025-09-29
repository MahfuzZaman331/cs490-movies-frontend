import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CustomerDetails() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/customers/${id}`)
      .then(res => setCustomer(res.data))
      .catch(err => console.error('Error fetching customer:', err));
  }, [id]);

  if (!customer) return <div>Loading...</div>;

  return (
    <div style={{ marginLeft: '200px' }}>
      <h2>Customer Details</h2>
      <p><strong>ID:</strong> {customer.customer_id}</p>
      <p><strong>Name:</strong> {customer.first_name} {customer.last_name}</p>
      <p><strong>Email:</strong> {customer.email}</p>
      <p><strong>Active:</strong> {customer.active ? 'Yes' : 'No'}</p>

      <h3>Recent Rentals</h3>
      <ul>
        {customer.rentals.map((r, index) => (
          <li key={index}>
            {r.title} — {new Date(r.rental_date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomerDetails;
