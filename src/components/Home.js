import React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useAuth0 } from "@auth0/auth0-react";
import Horario from "./Horario";
import Correlatividades from "./Correlatividades";

const FeatureCard = ({ title, description }) => (
  <Card variant="outlined" sx={{ minWidth: 275 }}>
    <CardContent>
      <Typography variant="h6" component="div" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
  </Card>
);

const Home = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <Container sx={{ my: 3 }}>
      {isAuthenticated ? (
        <Grid container spacing={2}>
          <Grid item xs={12} lg={5}>
            <Horario />
          </Grid>
          <Grid item xs={12} lg={7}>
            <Correlatividades />
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: "50vh" }}
        >
          <Grid>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h3" gutterBottom align="center">
                  Organizador de Universidad
                </Typography>
                <Typography variant="body1" paragraph align="center">
                  ¡Inicia sesión para empezar a organizar tus datos académicos!
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => loginWithRedirect()}
                  sx={{ display: "block", margin: "auto" }}
                >
                  Iniciar Sesión
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Home;
