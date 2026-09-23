import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ShowRow from "../components/ShowRow";

const GENRES = [
  "Drama",
  "Science-Fiction",
  "Thriller",
  "Action",
  "Crime",
  "Horror",
  "Romance",
  "Adventure",
  "Espionage",
  "Music",
  "Mystery",
  "Supernatural",
  "Fantasy",
  "Family",
  "Anime",
  "Comedy",
  "History",
  "Medical",
  "Legal",
  "Western",
  "War",
  "Sports",
  "Food",
  "Travel",
  "Nature",
  "DIY",
  "Children",
];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [popularShows, setPopularShows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const response = await fetch("https://api.tvmaze.com/shows?page=0");
        const data = await response.json();

        const sorted = [...data].sort((a, b) => {
          const ratingA = a.rating && a.rating.average ? a.rating.average : 0;
          const ratingB = b.rating && b.rating.average ? b.rating.average : 0;
          return ratingB - ratingA;
        });

        setPopularShows(sorted.slice(0, 20));
      } catch (error) {
        console.error("Error fetching popular shows:", error);
      }
    };

    fetchPopular();
  }, []);

  useEffect(() => {
    if (location.hash === "#browse") {
      const element = document.getElementById("browse");
      console.log("element found:", element);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.hash, popularShows]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/results?q=${searchTerm}`);
    }
  };

  const handleGenreClick = (genre) => {
    navigate(`/results?genre=${genre}`);
  };

  return (
    <div>
      <section className="hero">
        <h1>
          The World's Best <span>Tv Show Database</span>
        </h1>
        <p>
          FIND YOUR FAVOURITE TV SHOWS WITH <span>TVSHOWFINDER</span>
        </p>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by Show Name (try the full title for best results)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button onClick={handleSearch}>🔍</button>
        </div>
      </section>

      <ShowRow title="Popular Shows" shows={popularShows} />

      <div className="genre-tags-section" id="browse">
        <h2>Browse by Genre</h2>
        <div className="genre-tags">
          {GENRES.map((genre) => (
            <button key={genre} onClick={() => handleGenreClick(genre)}>
              {genre}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
