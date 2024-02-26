import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

function createData(nombre, numero, modalidad, regular, aprobada, nota) {
  return { nombre, numero, modalidad, regular, aprobada, nota };
}

const rows = [
  createData("Análisis Matemático 1", 1, "A", "", "", 9),
  createData("Álgebra y Geometría Analítica", 2, "A", "", "", 8),
  createData("Física 1", 3, "A", "", "", 9),
  createData("Inglés 1", 4, "A", "", "", 8),
  createData("Lógica y Estructuras Discretas", 5, "1C-CC", "", "", 9),
  createData("Algoritmos y Estructuras de Datos", 6, "A", "", "", 10),
  createData("Arquitectura de Computadoras", 7, "2C-CC", "", "", 10),
  createData("Sistemas y Procesos de Negocio", 8, "1C-CC", "", "", 8),
  createData("Ingeniería y Sociedad", 9, "2C-CC", "", "", 9),
  createData("Análisis Matemático 2", 10, "A", "1-2", "", 8),
  createData("Física 2", 11, "A", "1-3", "", 8),
  createData("Inglés 2", 12, "A", "4", "", 0),
  createData("Sintaxis y Semántica de los Lenguajes", 13, "1C-CC", "5-6", "", 0),
  createData("Paradigmas de Programación", 14, "2C-CC", "5-6", "", 0),
  createData("Sistemas Operativos", 15, "A", "7", "", 0),
  createData("Análisis de Sistemas de Información (Integradora)", 16, "A", "6-8", "", 0),
  createData("Probabilidad y Estadísticas", 17, "1C-CC", "1-2", "", 10),
  createData("Economía", 18, "2C-CC", "", "1-2", 0),
  createData("Bases de Datos", 19, "1C-CC", "13-16", "5-6", 0),
  createData("Desarrollo de Software", 20, "1C-CC", "14-16", "5-6", 0),
  createData("Comunicación de Datos", 21, "A", "", "3-7", 0),
  createData("Análisis Numérico", 22, "2C-CC", "9", "1-2", 9),
  createData("Diseño de Sistemas de Información (Integradora)", 99, "A", "14-16", "4-6-8", 0),
  createData("Seminario Integrador (Analista)", 23, "2C", "16", "6-8-13-14", 0),
  createData("Legislación", 24, "2C-CC", "11", "", 0),
  createData("Ingeniería y Calidad de Software", 25, "2C-CC", "19-20-23", "13-14", 0),
  createData("Redes de Datos", 26, "A", "15-21", "", 0),
  createData("Investigación Operativa", 27, "A", "17-22", "", 0),
  createData("Simulación", 28, "1C-CC", "17", "", 0),
  createData("Tecnologías para la Automatización", 29, "2C-CC", "10-22", "9", 0),
  createData("Administración de Sistemas de Información (Integradora)", 30, "A", "18-23", "16", 0),
  createData("Inteligencia Artificial", 31, "A", "28", "17-22", 0),
  createData("Ciencia de Datos", 32, "2C-CC", "28", "17-19", 0),
  createData("Sistemas de Gestión", 33, "A", "18-27", "23", 0),
  createData("Gestión Gerencial", 34, "1C-CC", "24-30", "18", 0),
  createData("Seguridad en los Sistemas de Información", 35, "1C-CC", "26-30", "20-21", 0),
  createData("Proyecto Final (Integradora)**", 36, "A", "25-26-30", "12-20-23", 0),
];

  const style = {
    py: 2,
    mb: 2 ,
    width: "100%",
    borderRadius: 2,
    border: "1px solid",
    borderColor: "divider",
    backgroundColor: "background.paper",
  };

  const tablestyle = {
    mb: 2,
    maxHeight: 440,
    borderRadius: 2,
    border: "1px solid",
    borderColor: "divider",
    backgroundColor: "background.paper",
  };
export default function DenseTable() {

  const materiasAprobadas = rows.filter((row) => row.nota >= 7).length;
  const materiasRegulares = rows.filter((row) => row.nota === 7).length;

  return (
    <Container sx={{ overflow: "hidden" }}>
      <Container sx={style}>
        <h2>Materias</h2>
      <TableContainer sx={tablestyle}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left">N</TableCell>
              <TableCell align="left">Asignatura</TableCell>
              <TableCell align="left">Modalidad</TableCell>
              <TableCell align="left">Regular</TableCell>
              <TableCell align="left">Aprobada</TableCell>
              <TableCell align="left">Nota</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
              hover
              role="checkbox"
              key={row.nombre}
              sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  backgroundColor:
                  row.nota >= 7
                  ? "#80af"
                  : row.nota === 6
                  ? "#80a5"
                  : "inherit",
                }}
                >
                <TableCell align="left">{row.numero}</TableCell>
                <TableCell align="left">{row.nombre}</TableCell>
                <TableCell align="left">{row.modalidad}</TableCell>
                <TableCell align="left">{row.regular}</TableCell>
                <TableCell align="left">{row.aprobada}</TableCell>
                <TableCell align="left">{row.nota}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>

      <Container sx={style}>
        <Box sx={{ fontSize: "14px" }}>
          <Box sx={{ display: "flex" }}>
            <Box
              sx={{
                mr: 2,
                width: 17,
                height: 17,
                borderRadius: 1,
                bgcolor: "#80a5",
              }}
            />
            <p>Regulares: {materiasRegulares}</p>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Box
              sx={{
                mr: 2,
                width: 17,
                height: 17,
                borderRadius: 1,
                bgcolor: "#80af",
              }}
            />
            <p className="mb-0">Aprobadas: {materiasAprobadas}</p>
          </Box>
        </Box>
      </Container>
    </Container>
  );
}
