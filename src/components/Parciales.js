import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import parcialesData from "./data/parciales.json";

const Parciales = () => {
  const tablestyle = {
    width: "100%",
    mb: 2,
    borderRadius: 2,
    border: "1px solid",
    borderColor: "divider",
    backgroundColor: "background.paper",
  };

  return (
    <TableContainer sx={tablestyle}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={2}>
              PARCIALES
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">Fecha</TableCell>
            <TableCell align="center">Materia</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {parcialesData.length === 0 ? (
            <TableRow>
              <TableCell
                align="center"
                colSpan={2}
                sx={{ background: "#80aa", height: 100 }}
              >
                No hay parciales
              </TableCell>
            </TableRow>
          ) : (
            parcialesData.map((materia) => (
              <TableRow
                hover
                role="checkbox"
                key={materia.nombre}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" sx={{ background: "#80aa" }}>
                  {materia.fecha}
                </TableCell>
                <TableCell align="center" sx={{ background: "#80aa" }}>
                  {materia.nombre}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Parciales;
