import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import { createTheme, ThemeProvider } from "@material-ui/core";

const Dark_Theam = createTheme({
  palette: {
    type: "dark",
  },
});

function CustomPagination({ setPage, number_of_pages = 10 }) {
  function HandleChange(page) {
    setPage(page);
    window.scrollTo(0, 0);
  }
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
      }}
    >
      <ThemeProvider theme={Dark_Theam}>
        <Pagination
          hideNextButton
          hidePrevButton
          color="primary"
          count={number_of_pages}
          onChange={(event) => {
            HandleChange(event.target.textContent);
          }}
        />
      </ThemeProvider>
    </div>
  );
}

export default CustomPagination;
