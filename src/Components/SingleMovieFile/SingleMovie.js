import { Badge } from "@material-ui/core";
import React from "react";
import { img_300, img_unavailable } from "../../config/config";
import MYModal from "../MYModal/MYModal";
import "./SingleMovie.css";

function SingleMovie({ id, poster, title, date, mediatype, voteaverage }) {
  return (
    <MYModal mediatype={mediatype} id={id}>
      <Badge
        badgeContent={voteaverage}
        color={voteaverage > 6 ? "primary" : "secondary"}
      />
      <img
        className="poster"
        src={poster ? `${img_300}/${poster}` : img_unavailable}
        alt={title}
      />
      <b className="title">{title}</b>
      <span className="subtitle">
        {mediatype === "tv" ? "TV Series" : "movie"}
        <span className="subtitle">{date}</span>
      </span>
    </MYModal>
  );
}

export default SingleMovie;
