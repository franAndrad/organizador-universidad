import { Container } from "@mui/material";
import React, { useState, useEffect } from "react";

const Reloj = () => {
  const [fechaHora, setFechaHora] = useState(new Date());

  useEffect(() => {
    const intervalo = setInterval(() => {
      setFechaHora(new Date());
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  const formatearFecha = (fecha) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return fecha.toLocaleDateString(undefined, options);
  };

  const formatearHora = (hora) => {
    return hora.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

    const style = {
      mb: 2,
      pt: 2,
      width: "100%",
      maxWidth: 650,
      borderRadius: 2,
      border: "1px solid",
      borderColor: "divider",
      backgroundColor: "background.paper",
    };

  return (
    <Container sx={style}>
      <h2>Hora y Fecha</h2>
      <p>{formatearFecha(fechaHora)}</p>
      <p>{formatearHora(fechaHora)}</p>
    </Container>
  );
};

export default Reloj;
