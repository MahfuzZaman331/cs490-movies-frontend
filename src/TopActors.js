// src/TopActors.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function TopActors() {
  const [actors, setActors] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/actors/top')
      .then((res) => setActors(res.data))
      .catch((err) => console.error('Error fetching top actors:', err));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Top 5 Actors in Store Films</h2>
      <ul>
        {actors.map((actor) => (
          <li key={actor.actor_id}>
            <Link to={`/actors/${actor.actor_id}`}>
              <strong>{actor.name}</strong>
            </Link> — {actor.film_count} films
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopActors;
