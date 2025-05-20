import React, { useState } from "react";

const Movies = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (!query) return;

    setMovies([]);

    fetch(
      `https://www.omdbapi.com/?apikey=a3c24d43&s=${encodeURIComponent(query)}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.Response === "True") {
          setMovies(data.Search);
        } else {
          setMovies([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setMovies([]);
        setLoading(false);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1960B6",
        minHeight: "100vh",
        minWidth: "229vh",
        color: "#FCCB1A",
        gap: "10px"
      }}
    >
      <h1>Ingresa la película que quieres ver</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: "15px"
        }}
      >
        <input value={query} onChange={(e) => setQuery(e.target.value)} />
        <button onClick={handleSearch}>Buscar</button>
      </div>
      <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          color: "#FFFFFF"
        }}>
        {movies.map((movie) => (
          <div key={movie.imdbID}>
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/150"
              }
            />
            <h2>{movie.Title}</h2>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;