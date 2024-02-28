import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Reloj from "./Reloj";
import Parciales from "./Parciales";
import { useAuth0 } from "@auth0/auth0-react";

const Horario = () => {
  const [diaFijo, setDiaFijo] = useState("");
  const [diaActual, setDiaActual] = useState(new Date().getDay());
  const [dia, setDia] = useState(new Date().getDay());
  const getInitialData = () => [
    { dia: "DOMINGO", materias: [] },
    { dia: "LUNES", materias: [] },
    { dia: "MARTES", materias: [] },
    { dia: "MIERCOLES", materias: [] },
    { dia: "JUEVES", materias: [] },
    { dia: "VIERNES", materias: [] },
    { dia: "SABADO", materias: [] },
  ];

  const [contenidoDiario, setContenidoDiario] = useState(getInitialData());
  const apiUrl = process.env.REACT_APP_API_URL;

  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      consultarDatos();
    } else {
      setContenidoDiario(getInitialData());
    }
  }, [isAuthenticated, dia]);

  useEffect(() => {
    setDia(diaActual);
  }, [diaActual]);

  const consultarDatos = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/horarios?email=${user.email}&userId=${user.sub}`
      );
      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }
      const data = await response.json();
      const updatedData = getInitialData().map((defaultDay) => {
        const foundDay = data.find((item) => item.dia === defaultDay.dia);
        return foundDay ? foundDay : defaultDay;
      });
      setContenidoDiario(updatedData);
    } catch (error) {
      console.error("Error al consultar los datos:", error);
    }
    setDiaFijo(contenidoDiario[diaActual].dia);
  };

  const incrementarDia = () => {
    setDia((prevDia) => (prevDia + 1) % 7);
  };

  const decrementarDia = () => {
    setDia((prevDia) => (prevDia - 1 + 7) % 7);
  };

  const tablestyle = {
    mb: 2,
    maxHeight: 440,
    borderRadius: 2,
    border: "1px solid",
    borderColor: "divider",
    backgroundColor: "background.paper",
  };

  return (
    <Container sx={{ overflow: "hidden" }}>
      <TableContainer sx={tablestyle}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={4}>
                <Reloj data={diaFijo} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">
                <Button variant="text" onClick={decrementarDia}>
                  {"<"}
                </Button>
              </TableCell>
              <TableCell align="center">
                {contenidoDiario[dia].dia}
              </TableCell>
              <TableCell align="center">
                <Button variant="text" onClick={incrementarDia}>
                  {">"}
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Hora</TableCell>
              <TableCell align="center">Materia</TableCell>
              <TableCell align="center">Curso</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contenidoDiario[dia].materias.length > 0 ? (
              contenidoDiario[dia].materias.map((materia, index) => (
                <TableRow
                  hover
                  role="checkbox"
                  key={`${dia}-${index}`}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" sx={{ background: "#80aa" }}>
                    {materia.horario}
                  </TableCell>
                  <TableCell align="center" sx={{ background: "#80aa" }}>
                    {materia.abreviacion}
                  </TableCell>
                  <TableCell align="center" sx={{ background: "#80aa" }}>
                    {materia.curso}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  align="center"
                  colSpan={3}
                  sx={{ background: "#80aa", height: 100 }}
                >
                  No hay materias
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Parciales />
    </Container>
  );
};

export default Horario;
