import React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Tareas from "./Horario";
import Correlatividades from "./Correlatividades";

const Administrador = () => {
  return (
    <Container sx={{ my: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={5}>
          <Tareas></Tareas>
        </Grid>
        <Grid item xs={12} lg={7}>
          <Correlatividades></Correlatividades>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Administrador;
