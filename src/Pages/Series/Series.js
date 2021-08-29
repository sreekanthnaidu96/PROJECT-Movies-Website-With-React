import axios from "axios";
import React, { useState, useEffect } from "react";
import CustomPagination from "../../Components/pagination/CustomPagination";
import SingleMovie from "../../Components/SingleMovieFile/SingleMovie";
import Genres from "../../Components/Genres/Genres";
import useGenres from "../../CustomHook/useGenre";

function Series() {
  const [Page, setPage] = useState(1);
  const [Content, setContent] = useState([]);
  const [numofpages, setNumofpages] = useState();
  const [SelectedGenres, setSelectedGenres] = useState([]);
  const [genres, setgenres] = useState([]);
  const genreforURL = useGenres(SelectedGenres);

  const Fetch_movies = async () => {
    const { data } = await axios.get(`
https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=${Page}&with_genres=${genreforURL}
`);
    setContent(data.results);
    setNumofpages(data.total_pages);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    Fetch_movies();
    // eslint-disable-next-line
  }, [Page, genreforURL]);
  return (
    <div>
      <span className="pageTitle">T.V SERIES</span>
      <Genres
        type="tv"
        SelectedGenres={SelectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setgenres={setgenres}
        setPage={setPage}
      />
      <div className="trending">
        {Content &&
          Content.map((Data) => (
            <SingleMovie
              key={Data.id}
              id={Data.id}
              poster={Data.poster_path}
              title={Data.title || Data.name}
              date={Data.first_air_date || Data.release_date}
              mediatype="tv"
              voteaverage={Data.vote_average}
            />
          ))}
      </div>
      {numofpages > 1 && (
        <CustomPagination setPage={setPage} number_of_pages={numofpages} />
      )}
    </div>
  );
}

export default Series;
