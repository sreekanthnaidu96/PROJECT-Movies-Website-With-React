import { Chip } from "@material-ui/core";
import axios from "axios";
import React, { useEffect } from "react";

function Genres({
  type,
  SelectedGenres,
  setSelectedGenres,
  genres,
  setgenres,
  setPage,
}) {
  const HandleAdd = (genre) => {
    setSelectedGenres([...SelectedGenres, genre]);
    setgenres(genres.filter((single) => single.id !== genre.id));
    setPage(1);
  };

  const HandleRemove = (genre) => {
    setSelectedGenres(
      SelectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setgenres([...genres, genre]);
    setPage(1);
  };

  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-us`
    );
    setgenres(data.genres);
  };
  useEffect(() => {
    fetchGenres();
    return () => {
      setgenres({}); //clean up function
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ padding: "6px 0" }}>
      {SelectedGenres &&
        SelectedGenres.map((genre) => (
          <Chip
            label={genre.name}
            style={{ margin: 2 }}
            color="primary"
            clickable
            key={genre.id}
            size="small"
            onDelete={() => {
              HandleRemove(genre);
            }}
          />
        ))}
      {genres &&
        genres.map((genre) => (
          <Chip
            label={genre.name}
            style={{ margin: 2 }}
            clickable
            key={genre.id}
            size="small"
            onClick={() => HandleAdd(genre)}
          />
        ))}
    </div>
  );
}

export default Genres;
