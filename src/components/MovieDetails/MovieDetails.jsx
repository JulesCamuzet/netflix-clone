import { useLocation, useParams } from "react-router-dom";
import "./MovieDetails.css";
import getByID from "../../api/getByID";
import { useEffect, useState } from "react";

function getGenreNameFromId(id) {
  const genres = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };
  return genres[id] || null;
}

const MovieDetails = () => {
  let { movieId } = useParams();

  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      let movieData = await getByID(movieId);
      setData(movieData);
    })();
  }, []);

  if (data === null) {
    return <div></div>;
  } else {
    return (
      <div className="movie-details">
        <div className="details-left">
          <div className="details-left-header">
            <h1 className="details-movie-title">{data.title}</h1>
            <div className="movie-genres">
              {data.genres.map((genre, index) => {
                return <span key={genre.id}>{genre.name}</span>;
              })}
            </div>
            <h3 className="details-rate">
              {Math.round(data.vote_average * 10) / 10}/10
            </h3>
          </div>
          <p className="details-overview">{data.overview}</p>
        </div>
        <div className="details-right">
          <div
            className="details-image-container"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500/${data.poster_path})`,
            }}
          ></div>
        </div>
      </div>
    );
  }
};

export default MovieDetails;
