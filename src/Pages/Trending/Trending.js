import axios from "axios";
import React, { useState, useEffect } from "react";
import SingleMovie from "../../Components/SingleMovieFile/SingleMovie";
import "./Trending.css";
import CustomPagination from "../../Components/pagination/CustomPagination";

function Trending() {
  const [Content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const Fetch_Trending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    );
    setContent(data.results);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    Fetch_Trending();
    // eslint-disable-next-line
  }, [page]);
  return (
    <div>
      <span className="pageTitle">CURRENTLY TRENDING</span>
      <div className="trending">
        {Content &&
          Content.map((Data) => (
            <SingleMovie
              key={Data.id}
              id={Data.id}
              poster={Data.poster_path}
              title={Data.title || Data.name}
              date={Data.first_air_date || Data.release_date}
              mediatype={Data.media_type}
              voteaverage={Data.vote_average}
            />
          ))}
      </div>
      <CustomPagination setPage={setPage} />
    </div>
  );
}

export default Trending;
