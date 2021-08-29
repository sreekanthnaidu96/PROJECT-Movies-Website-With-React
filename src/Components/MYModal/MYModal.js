import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import axios from "axios";
import {
  img_500,
  img_unavailable,
  img_unavailable_landscape,
} from "../../config/config";
import { Button } from "@material-ui/core";
import YoutubeIcon from "@material-ui/icons/YouTube";
import "./MYModal.css";
import Carousel from "./Carousel/Carousel";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "90%",
    height: "80%",
    backgroundColor: "#39445a",
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
  },
}));

export default function MYModal({ children, mediatype, id }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${mediatype}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setContent(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${mediatype}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div onClick={handleOpen} className="media">
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {content && (
            <div className={classes.paper}>
              <div className="MYModal">
                <img
                  className="img-potrait"
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : img_unavailable
                  }
                  alt={content.title || content.name}
                />
                <img
                  className="img-landscape"
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : img_unavailable_landscape
                  }
                  alt={content.title || content.name}
                />
                <div className="modalAbout">
                  <span className="modal-title">
                    {content.title || content.name}(
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "....."
                    ).substring(0, 4)}
                    )
                  </span>
                  {content.tagline && (
                    <i className="my_tagline">{content.tagline}</i>
                  )}
                  <span className="modal-description">{content.overview}</span>
                  <div>
                    <Carousel mediatype={mediatype} id={id} />
                  </div>
                  <Button
                    variant="contained"
                    startIcon={<YoutubeIcon />}
                    color="secondary"
                    target="_blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    {" "}
                    Watch The Trailer
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Fade>
      </Modal>
    </>
  );
}
