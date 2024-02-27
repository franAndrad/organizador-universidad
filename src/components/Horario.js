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
import horarioData from "./data/horario.json";
import { useAuth0 } from "@auth0/auth0-react";

const Horario = () => {
  const [diaFijo, setDiaFijo] = useState("");
  const [diaActual, setDiaActual] = useState(new Date().getDay());
  const [dia, setDia] = useState(new Date().getDay());
  const [contenidoDiario, setContenidoDiario] = useState({
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

 useEffect(() => {
  setDiaFijo(horarioData[diaActual].dia);
   if (isAuthenticated) {
     // Aquí puedes cargar el horario una vez que el usuario esté autenticado
     setContenidoDiario(horarioData[dia]);
   } else {
     // Muestra un indicador de carga u otro contenido mientras no esté autenticado
     setContenidoDiario({
       dia: "Cargando...",
       materias: [],
     });
   }
 }, [isAuthenticated, dia]);

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
              <TableCell align="center">{contenidoDiario.dia}</TableCell>
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
            {contenidoDiario.materias.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  align="center"
                  sx={{ background: "#80aa", height: 100 }}
                >
                  No hay eventos
                </TableCell>
              </TableRow>
            ) : (
              contenidoDiario.materias.map((materia) => (
                <TableRow
                  hover
                  role="checkbox"
                  key={materia.nombre}
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
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Parciales />
    </Container>
  );
};

export default Horario;
