import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Container from "@mui/material/Container";
import Reloj from "./Reloj";
import { useEffect, useState } from "react";


const Horario = () => {
  const [contenidoDiario, setContenidoDiario] = useState({
    dia: "",
    materias: [],
  });

  const horario = [
    {
      dia: "Domingo",
      materias: [],
    },
    {
      dia: "Lunes",
      materias: [
        {
          nombre: "Sistemas Operativos",
          abreviacion: "SOP",
          curso: "2K11 - 232",
          horario: "08:00 - 09:30",
        },
        {
          nombre: "Comunicacion de Datos",
          abreviacion: "COM",
          curso: "3k1 - 415",
          horario: "10:25 - 14:00",
        },
        {
          nombre: "Economia",
          abreviacion: "ECO",
          curso: "3k7 - 524",
          horario: "14:55 - 17:20",
        },
      ],
    },
    {
      dia: "Martes",
      materias: [
        {
          nombre: "Sintaxis y Semántica de los Lenguajes",
          abreviacion: "SSL",
          curso: "2K11 - 609",
          horario: "10:25 - 14:00",
        },
        {
          nombre: "Legislación",
          abreviacion: "LEG",
          curso: "3R2 - 512",
          horario: "18:15 - 19:45",
        },
      ],
    },
    {
      dia: "Miércoles",
      materias: [
        {
          nombre: "Análisis de Sistemas de Información",
          abreviacion: "ASI",
          curso: "2K11 - 232",
          horario: "10:25 - 12:50",
        },
        {
          nombre: "Inglés 2",
          abreviacion: "IN2",
          curso: "3k3 - 223",
          horario: "16:35 - 18:05",
        },
      ],
    },
    {
      dia: "Jueves",
      materias: [
        {
          nombre: "Sintaxis y Semántica de los Lenguajes",
          abreviacion: "SSL",
          curso: "2K11 - 609",
          horario: "08:00 - 11:10",
        },
      ],
    },
    {
      dia: "Viernes",
      materias: [
        {
          nombre: "Análisis de Sistemas de Información",
          abreviacion: "ASI",
          curso: "2K11 - 410",
          horario: "08:00 - 10:25",
        },
        {
          nombre: "Sistemas Operativos",
          abreviacion: "SOP",
          curso: "2K11 - 232",
          horario: "08:00 - 09:30",
        },
      ],
    },
    {
      dia: "Sabado",
      materias: [],
    },
  ];

    const style = {
      py: 2,
      width: "100%",
      borderRadius: 2,
      border: "1px solid",
      borderColor: "divider",
      backgroundColor: "background.paper",
    };

  //eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const diaActual = new Date().getDay();
    //const diaActual = 2;
    setContenidoDiario(horario[diaActual]);
  }, []);

  return (
    <Container sx={{ overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Reloj />
        <Container sx={style}>

        <Table sx={style} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Hora</TableCell>
              <TableCell align="center">{contenidoDiario.dia}</TableCell>
              <TableCell align="center">Curso</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contenidoDiario.materias.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  align="center"
                  sx={{ background: "#80aa", height:100 }}
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
              </Container>
      </TableContainer>
    </Container>
  );
};

export default Horario;
