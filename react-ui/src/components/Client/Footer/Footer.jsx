import React from "react";
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export default function Footer(props) {
  function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://TennoGen.ca/">
          TennoGen Web Design
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  return (
    <div>
        <Copyright sx={{ mt: 8, mb: 4 }} />
    </div>
  );
}