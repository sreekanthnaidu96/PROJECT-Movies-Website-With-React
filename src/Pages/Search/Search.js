import {
  Button,
  createTheme,
  Tab,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { Tabs } from "@material-ui/core";
import axios from "axios";
import { useEffect } from "react";
import SingleMovie from "../../Components/SingleMovieFile/SingleMovie";
import CustomPagination from "../../Components/pagination/CustomPagination";

function Search() {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [SearchText, setSearchText] = useState("");
  const [content, setContent] = useState();
  const [numofpages, setnumofPages] = useState();
  const showresults = SearchText.length > 0;
  const DarkTheme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const fetchSearchedItem = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
        process.env.REACT_APP_API_KEY
      }&language=en-US&query=${SearchText}&page=${page}&include_adult=true`
    );
    setContent(data.results);
    setnumofPages(data.total_pages);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    showresults && fetchSearchedItem();
    // eslint-disable-next-line
  }, [type, page]);
  return (
    <div>
      <ThemeProvider theme={DarkTheme}>
        <div style={{ display: "flex", margin: "15px 0" }}>
          <TextField
            style={{ flex: 1 }}
            className="searchbox"
            label="Search"
            variant="filled"
            value={SearchText}
            onChange={(event) => {
              setSearchText(event.target.value);
            }}
          />
          <Button
            variant="contained"
            style={{ marginLeft: 10 }}
            onClick={fetchSearchedItem}
          >
            <SearchIcon />
          </Button>
        </div>
        <Tabs
          style={{ paddingBottom: 5 }}
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, newvalue) => {
            setType(newvalue);
            setPage(1);
          }}
        >
          <Tab style={{ width: "50%" }} label="Search Movies" />
          <Tab style={{ width: "50%" }} label=" Search TV Series" />
        </Tabs>
      </ThemeProvider>
      <div className="trending">
        {content &&
          content.map((Data) => (
            <SingleMovie
              key={Data.id}
              id={Data.id}
              poster={Data.poster_path}
              title={Data.title || Data.name}
              date={Data.first_air_date || Data.release_date}
              mediatype={type ? "tv" : "movie"}
              voteaverage={Data.vote_average}
            />
          ))}
        {SearchText &&
          !content &&
          (type ? <h2>NO SERIES FOUND</h2> : <h2>NO MOVIES FOUND</h2>)}
      </div>
      {numofpages > 1 && (
        <CustomPagination setPage={setPage} number_of_pages={numofpages} />
      )}
    </div>
  );
}

export default Search;
