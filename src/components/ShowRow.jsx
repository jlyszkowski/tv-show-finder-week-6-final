import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const ShowRow = ({ title, shows }) => {
  const rowRef = useRef();

  useEffect(() => {
    const row = rowRef.current;

    const handleWheel = (event) => {
      const canScrollHorizontally = row.scrollWidth > row.clientWidth;
      if (canScrollHorizontally) {
        event.preventDefault();
        row.scrollLeft += event.deltaY;
      }
    };

    row.addEventListener("wheel", handleWheel);

    return () => {
      row.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className="show-row">
      <h2>{title}</h2>
      <div className="show-row-list" ref={rowRef}>
        {shows.map((show) => (
          <Link to={`/show/${show.id}`} className="show-row-card" key={show.id}>
            <img
              src={show.image ? show.image.medium : "https://via.placeholder.com/210x295?text=No+Image"}
              alt={show.name}
            />
            <p>{show.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ShowRow;