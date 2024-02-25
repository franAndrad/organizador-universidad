import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
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
          nombre: "Paradigmas de Programación (PPR)",
          abreviacion: "PPR",
          curso: "",
          horario: "08:00 - 08:45",
        },
        {
          nombre: "Análisis Matemático 2 (AM2)",
          abreviacion: "AM2",
          curso: "",
          horario: "08:45 - 09:30",
        },
        {
          nombre: "Análisis Matemático 2 (AM2)",
          abreviacion: "AM2",
          curso: "",
          horario: "09:30 - 09:40",
        },
        {
          nombre: "Sistemas Operativos (SOP)",
          abreviacion: "SOP",
          curso: "",
          horario: "09:40 - 10:25",
        },
        {
          nombre: "Sistemas Operativos (SOP)",
          abreviacion: "SOP",
          curso: "",
          horario: "10:25 - 11:10",
        },
        {
          nombre: "Física II (FISII)",
          abreviacion: "FISII",
          curso: "",
          horario: "11:10 - 11:20",
        },
        {
          nombre: "Física II (FISII)",
          abreviacion: "FISII",
          curso: "",
          horario: "11:20 - 12:05",
        },
        {
          nombre: "Física II (FISII)",
          abreviacion: "FISII",
          curso: "",
          horario: "13:15 - 14:00",
        },
      ],
    },
    {
      dia: "Martes",
      materias: [
        {
          nombre: "Paradigmas de Programación (PPR)",
          abreviacion: "PPR",
          curso: "",
          horario: "08:00 - 08:45",
        },
        {
          nombre: "Análisis Matemático 2 (AM2)",
          abreviacion: "AM2",
          curso: "",
          horario: "08:45 - 09:30",
        },
        {
          nombre: "Análisis Matemático 2 (AM2)",
          abreviacion: "AM2",
          curso: "",
          horario: "09:30 - 09:40",
        },
        {
          nombre: "Sistemas Operativos (SOP)",
          abreviacion: "SOP",
          curso: "",
          horario: "09:40 - 10:25",
        },
        {
          nombre: "Sistemas Operativos (SOP)",
          abreviacion: "SOP",
          curso: "",
          horario: "10:25 - 11:10",
        },
        {
          nombre: "Física II (FISII)",
          abreviacion: "FISII",
          curso: "",
          horario: "11:10 - 11:20",
        },
        {
          nombre: "Física II (FISII)",
          abreviacion: "FISII",
          curso: "",
          horario: "11:20 - 12:05",
        },
      ],
    },
    {
      dia: "Miércoles",
      materias: [
        {
          nombre: "Paradigmas de Programación (PPR)",
          abreviacion: "PPR",
          curso: "",
          horario: "08:00 - 08:45",
        },
        {
          nombre: "Análisis Matemático 2 (AM2)",
          abreviacion: "AM2",
          curso: "",
          horario: "08:45 - 09:30",
        },
        {
          nombre: "Análisis Matemático 2 (AM2)",
          abreviacion: "AM2",
          curso: "",
          horario: "09:30 - 09:40",
        },
        {
          nombre: "Física II (FISII)",
          abreviacion: "FISII",
          curso: "",
          horario: "09:40 - 10:25",
        },
        {
          nombre: "Física II (FISII)",
          abreviacion: "FISII",
          curso: "",
          horario: "10:25 - 11:10",
        },
        {
          nombre: "Física II (FISII)",
          abreviacion: "FISII",
          curso: "",
          horario: "11:10 - 11:20",
        },
        {
          nombre: "Física II (FISII)",
          abreviacion: "FISII",
          curso: "",
          horario: "11:20 - 12:05",
        },
      ],
    },
    {
      dia: "Jueves",
      materias: [
        {
          nombre: "Paradigmas de Programación (PPR)",
          abreviacion: "PPR",
          curso: "",
          horario: "08:00 - 08:45",
        },
        {
          nombre: "Análisis Matemático 2 (AM2)",
          abreviacion: "AM2",
          curso: "",
          horario: "08:45 - 09:30",
        },
        {
          nombre: "Análisis Matemático 2 (AM2)",
          abreviacion: "AM2",
          curso: "",
          horario: "09:30 - 09:40",
        },
        {
          nombre: "Sistemas Operativos (SOP)",
          abreviacion: "SOP",
          curso: "",
          horario: "09:40 - 10:25",
        },
        {
          nombre: "Sistemas Operativos (SOP)",
          abreviacion: "SOP",
          curso: "",
          horario: "10:25 - 11:10",
        },
        {
          nombre: "Física II (FISII)",
          abreviacion: "FISII",
          curso: "",
          horario: "11:10 - 11:20",
        },
        {
          nombre: "Física II (FISII)",
          abreviacion: "FISII",
          curso: "",
          horario: "11:20 - 12:05",
        },
        {
          nombre: "Física II (FISII)",
          abreviacion: "FISII",
          curso: "",
          horario: "13:15 - 14:00",
        },
      ],
    },
    {
      dia: "Viernes",
      materias: [
        {
          nombre: "Paradigmas de Programación (PPR)",
          abreviacion: "PPR",
          curso: "",
          horario: "08:00 - 08:45",
        },
        {
          nombre: "Análisis Matemático 2 (AM2)",
          abreviacion: "AM2",
          curso: "",
          horario: "08:45 - 09:30",
        },
        {
          nombre: "Análisis Matemático 2 (AM2)",
          abreviacion: "AM2",
          curso: "",
          horario: "09:30 - 09:40",
        },
        {
          nombre: "Análisis de Sistemas de Información (ASI)",
          abreviacion: "ASI",
          curso: "",
          horario: "09:40 - 10:25",
        },
        {
          nombre: "Análisis de Sistemas de Información (ASI)",
          abreviacion: "ASI",
          curso: "",
          horario: "10:25 - 11:10",
        },
        {
          nombre: "Análisis de Sistemas de Información (ASI)",
          abreviacion: "ASI",
          curso: "",
          horario: "11:10 - 11:20",
        },
        {
          nombre: "Paradigmas de Programación (PPR)",
          abreviacion: "PPR",
          curso: "",
          horario: "11:20 - 12:05",
        },
        {
          nombre: "Paradigmas de Programación (PPR)",
          abreviacion: "PPR",
          curso: "",
          horario: "12:05 - 12:50",
        },
        {
          nombre: "Paradigmas de Programación (PPR)",
          abreviacion: "PPR",
          curso: "",
          horario: "13:15 - 14:00",
        },
      ],
    },
    {
      dia: "Sabado",
      materias: [],
    },
  ];

  //eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const diaActual = new Date().getDay();
    //const diaActual = 3;
    if (diaActual >= 1 && diaActual <= 5) {
      setContenidoDiario(horario[diaActual]);
    }
  }, []);

  return (
    <Paper sx={{ overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Reloj />
        <Table size="small" aria-label="a dense table">
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
                  <TableCell align="left" sx={{ background: "#80aa" }}>
                    {materia.horario}
                  </TableCell>
                  <TableCell align="left" sx={{ background: "#80aa" }}>
                    {materia.nombre}
                  </TableCell>
                  <TableCell align="left" sx={{ background: "#80aa" }}>
                    {materia.curso}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default Horario;
