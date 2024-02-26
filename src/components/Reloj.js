import React, { useState, useEffect } from "react";

const Reloj = (props) => {
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

  return (
      <div>
        {props.data} - {formatearFecha(fechaHora)} {formatearHora(fechaHora)}
      </div>
  );
};

export default Reloj;
