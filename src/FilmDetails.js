import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function FilmDetails() {
  const { id } = useParams();
  const [film, setFilm] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/films/${id}`)
      .then((res) => setFilm(res.data))
      .catch((err) => console.error('Error fetching film details:', err));
  }, [id]);

  if (!film) return <p>Loading film details...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{film.title}</h2>
      <p><strong>Description:</strong> {film.description}</p>
      <p><strong>Release Year:</strong> {film.release_year}</p>
      <p><strong>Length:</strong> {film.length} minutes</p>
      <p><strong>Rating:</strong> {film.rating}</p>
      <p><strong>Categories:</strong> {film.categories}</p>
      <p><strong>Actors:</strong> {film.actors}</p>
    </div>
  );
}

export default FilmDetails;
