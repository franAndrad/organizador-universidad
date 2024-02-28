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
  const [contenidoDiario, setContenidoDiario] = useState({
    _id: "",
    dia: "",
    materias: [],
  });

  const { isAuthenticated } = useAuth0();

  const tablestyle = {
    mb: 2,
    maxHeight: 440,
    borderRadius: 2,
    border: "1px solid",
    borderColor: "divider",
    backgroundColor: "background.paper",
  };

  const incrementarDia = () => {
    setDia((prevDia) => (prevDia + 1) % 7);
  };

  const decrementarDia = () => {
    setDia((prevDia) => (prevDia - 1 + 7) % 7);
  };

  const consultarDatos = async () => {
    try {
      const response = await fetch("http://localhost:4000/horarios");
      const data = await response.json();
      setContenidoDiario(data[dia]);
      setDiaFijo(data[diaActual].dia);
    } catch (error) {
      console.error("Error al consultar los datos:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      consultarDatos();
    } else {
      setContenidoDiario({
        _id: "",
        dia: "Cargando...",
        materias: [],
      });
    }
  }, [isAuthenticated, dia]);

  useEffect(() => {
    setDia(diaActual);
  }, [diaActual]);

  return (
    <Container sx={{ overflow: "hidden" }}>
      <TableContainer sx={tablestyle}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={3}>
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
                {contenidoDiario.dia}
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
            {contenidoDiario.materias && contenidoDiario.materias.length > 0 ? (
              contenidoDiario.materias.map((materia, index) => (
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
                  colSpan={3}
                  align="center"
                  sx={{ background: "#80aa", height: 100 }}
                >
                  No hay eventos
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
