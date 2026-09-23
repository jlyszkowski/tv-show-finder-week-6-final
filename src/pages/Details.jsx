import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ShowCard from "../components/ShowCard";

const Details = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reaction, setReaction] = useState(null);
  const [similarShows, setSimilarShows] = useState([]);

  useEffect(() => {
    const fetchShow = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
        const data = await response.json();
        setShow(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching show:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShow();
  }, [id]);

  useEffect(() => {
    const savedReaction = localStorage.getItem(`reaction-${id}`);
    setReaction(savedReaction);
  }, [id]);

  useEffect(() => {
    if (!show) return;

    const fetchSimilarShows = async () => {
      try {
        const response = await fetch("https://api.tvmaze.com/shows?page=0");
        const data = await response.json();

        const matches = data.filter((s) => {
          const sharesGenre = s.genres.some((genre) =>
            show.genres.includes(genre),
          );
          return sharesGenre && s.id !== show.id;
        });

        setSimilarShows(matches.slice(0, 6));
      } catch (error) {
        console.error("Error fetching similar shows:", error);
      }
    };

    fetchSimilarShows();
  }, [show]);

  const handleReaction = (type) => {
    const newReaction = reaction === type ? null : type;
    setReaction(newReaction);

    if (newReaction) {
      localStorage.setItem(`reaction-${id}`, newReaction);
    } else {
      localStorage.removeItem(`reaction-${id}`);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!show) return <p>Show not found.</p>;

  return (
    <div className="details-page">
      <div className="details-hero">
        <img
          src={
            show.image
              ? show.image.original
              : "https://via.placeholder.com/400x600?text=No+Image"
          }
          alt={show.name}
        />
        <div className="details-info">
          <h1>{show.name}</h1>
          <p className="details-genres">
            {show.genres.length > 0 ? show.genres.join(", ") : "Unknown"}
          </p>
          <p>Network: {show.network ? show.network.name : "Unknown"}</p>
          <p>
            Premiered:{" "}
            {show.premiered ? show.premiered.substring(0, 4) : "Unknown"}
          </p>
          <p>Status: {show.status}</p>
          <p>
            Rating:{" "}
            {show.rating && show.rating.average ? show.rating.average : "N/A"}
          </p>

          <div className="reaction-buttons">
            <button
              className={reaction === "like" ? "active" : ""}
              onClick={() => handleReaction("like")}
            >
              👍 Like
            </button>
            <button
              className={reaction === "dislike" ? "active" : ""}
              onClick={() => handleReaction("dislike")}
            >
              👎 Dislike
            </button>
          </div>
          <div
            className="details-summary"
            dangerouslySetInnerHTML={{ __html: show.summary }}
          />
        </div>
      </div>

      {similarShows.length > 0 && (
        <section className="results-section">
          <div className="results-header">
            <h2>Similar Shows</h2>
          </div>
          <div className="show-grid">
            {similarShows.map((show) => (
              <ShowCard key={show.id} show={show} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Details;
