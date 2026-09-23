import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ShowCard from "../components/ShowCard";

const Results = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const genre = searchParams.get("genre");

  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    const fetchByQuery = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.tvmaze.com/search/shows?q=${query}`,
        );
        const data = await response.json();
        setShows(data);
      } catch (error) {
        console.error("Error fetching shows:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchByGenre = async () => {
      setLoading(true);
      try {
        const pagePromises = [0, 1, 2, 3].map((page) =>
          fetch(`https://api.tvmaze.com/shows?page=${page}`).then((res) =>
            res.json(),
          ),
        );
        const pages = await Promise.all(pagePromises);
        const allShows = pages.flat();

        const filtered = allShows.filter((show) => show.genres.includes(genre));
        const wrapped = filtered.map((show) => ({ show }));
        setShows(wrapped);
      } catch (error) {
        console.error("Error fetching shows by genre:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchByQuery();
    } else if (genre) {
      fetchByGenre();
    }
  }, [query, genre]);

  const sortedShows = [...shows].sort((a, b) => {
    if (sortOption === "az") {
      return a.show.name.localeCompare(b.show.name);
    } else if (sortOption === "za") {
      return b.show.name.localeCompare(a.show.name);
    } else if (sortOption === "newest") {
      return new Date(b.show.premiered) - new Date(a.show.premiered);
    } else if (sortOption === "oldest") {
      return new Date(a.show.premiered) - new Date(b.show.premiered);
    }
    return 0;
  });

  const heading = query ? `Results for "${query}"` : `Genre: ${genre}`;

  return (
    <section className="results-section">
      <div className="results-header">
        <h2>{heading}</h2>
        <select
          id="sort-select"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort by...</option>
          <option value="az">Show A to Z</option>
          <option value="za">Show Z to A</option>
          <option value="newest">Newest to Oldest</option>
          <option value="oldest">Oldest to Newest</option>
        </select>
      </div>
      <div className="show-grid">
        {loading ? (
          Array.from({ length: 9 }).map((_, i) => (
            <div className="skeleton-card" key={i}>
              <div className="skeleton-img"></div>
              <div className="skeleton-title"></div>
              <div className="skeleton-text"></div>
              <div className="skeleton-year"></div>
            </div>
          ))
        ) : sortedShows.length === 0 ? (
          <p>No results found. Try another search!</p>
        ) : (
          sortedShows.map((result) => (
            <ShowCard key={result.show.id} show={result.show} />
          ))
        )}
      </div>
    </section>
  );
};

export default Results;
