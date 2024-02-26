import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import datos from "./data/materiasSistemas.json";

const style = {
  py: 2,
  mb: 2,
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

const DenseTable = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // Cargar los datos al montar el componente
    setRows(datos);
  }, []);

  const materiasAprobadas = rows.filter((row) => row.nota >= 7).length;
  const materiasRegulares = rows.filter((row) => row.nota === 7).length;

  return (
    <Container sx={{ overflow: "hidden" }}>
      <TableContainer sx={tablestyle}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={6}>
                INGENIERIA EN SISTEMAS
              </TableCell>
            </TableRow>
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
};

export default DenseTable;
