import * as React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {
  Divider,
  Container,
  CardContent,
  Card,
  CardMedia,
  IconButton,
} from "@mui/material/";
import ShareIcon from '@mui/icons-material/Share';

import Markdown from "./Markdown";

export default function Main(props) {
  console.log(props.posts);
  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        "& .markdown": {
          py: 3,
        },
      }}
    >
      <Typography variant="h6" gutterBottom>
        {props.title}
      </Typography>
      <Divider />
      {props.posts.map((post) => (
        <Card sx={{ display: "flex" }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {post.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {post.date}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {post.author}
            </Typography>
            <Card sx={{ display: "flex" }}>
              <CardMedia
                component="img"
                sx={{
                  justifyContent: "center",
                  maxHeight: "auto",
                  maxWidth: "auto",
                  display: { xs: "none", sm: "block" },
                }}
                image={post.image}
                alt={post.imageText}
              />
            </Card>
            <Typography variant="subtitle1" paragraph>
              {post.content}
            </Typography>
            <IconButton aria-label="share">
              <ShareIcon/>
            </IconButton>
          </CardContent>
        </Card>
      ))}
    </Grid>
  );
}

Main.propTypes = {
  // posts: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
};
