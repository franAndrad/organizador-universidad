import React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Horario from "./HorarioAdmin";
import Correlatividades from "./CorrelatividadesAdmin";

const Administrador = () => {
  return (
    <Container sx={{ my: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={5}>
          <Horario></Horario>
        </Grid>
        <Grid item xs={12} lg={7}>
          <Correlatividades></Correlatividades>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Administrador;
