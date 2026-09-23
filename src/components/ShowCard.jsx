import React from "react";
import { Link } from "react-router-dom";

const ShowCard = ({ show }) => {
  const artwork = show.image
    ? show.image.original
    : "https://via.placeholder.com/400x400?text=No+Image";

  const genres = show.genres.length > 0 ? show.genres.join(", ") : "Unknown";
  const premiered = show.premiered ? show.premiered.substring(0, 4) : "Unknown";

  return (
    <Link to={`/show/${show.id}`} className="show-card-link">
      <div className="show-card">
        <img src={artwork} alt={show.name} />
        <div className="show-card-info">
          <h3>{show.name}</h3>
          <p>Genre: {genres}</p>
          <p>Network: {show.network ? show.network.name : "Unknown"}</p>
          <p className="year">{premiered}</p>
        </div>
      </div>
    </Link>
  );
};

export default ShowCard;
