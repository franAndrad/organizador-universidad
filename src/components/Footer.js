import Container from "@mui/material/Container";
import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <Container
      style={{ textAlign: "center", paddingTop: "20px", paddingBottom: "20px" }}
    >
      <Typography variant="body2">
        <IconButton
          component="a"
          href="https://www.instagram.com/fran.andrade.e/"
          target="_blank"
          aria-label="Instagram"
          edge="start"
          color="inherit"
        >
          <InstagramIcon />
        </IconButton>
        <Button
          component="a"
          href="https://www.instagram.com/fran.andrade.e/"
          target="_blank"
        >
          Francisco Andrade
        </Button>
        <p>
          <small>&copy; Todos los derechos reservados</small>
        </p>
      </Typography>
    </Container>
  );
};

export default Footer;
