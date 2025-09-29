// src/ActorDetails.js

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function ActorDetails() {
  const { id } = useParams();
  const [films, setFilms] = useState([]);
  const [actorName, setActorName] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3001/api/actors/${id}/films`)
      .then((res) => {
        setFilms(res.data);
      })
      .catch((err) => {
        console.error('Error fetching actor films:', err);
      });

    axios.get('http://localhost:3001/api/actors/top')
      .then((res) => {
        const actor = res.data.find((a) => String(a.actor_id) === id);
        if (actor) setActorName(actor.name);
      });
  }, [id]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🎭 Films Featuring {actorName || `Actor #${id}`}</h2>
      <ul>
        {films.map((film) => (
          <li key={film.film_id}>
            <Link to={`/films/${film.film_id}`}>
              <strong>{film.title}</strong>
            </Link> — {film.rental_count} rentals
          </li>
        ))}
      </ul>
      <Link to="/actors">← Back to Top Actors</Link>
    </div>
  );
}

export default ActorDetails;
