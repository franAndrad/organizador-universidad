import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useAuth0 } from "@auth0/auth0-react";

const Parciales = () => {
  const [parciales, setParciales] = useState([]);
  const { user, isAuthenticated } = useAuth0();
  const apiUrl = process.env.REACT_APP_API_URL; 

  useEffect(() => {
    if (isAuthenticated) {
      obtenerParciales();
    }
  }, [isAuthenticated]);

  const obtenerParciales = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/parciales?email=${user.email}&userId=${user.sub}`
      );
      if (response.ok) {
        const data = await response.json();
        setParciales(data);
      } else {
        console.error("Error al obtener los parciales:", response.statusText);
      }
    } catch (error) {
      console.error("Error al obtener los parciales:", error.message);
    }
  };

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
          {parciales.length === 0 ? (
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
            parciales.map((parcial, index) => (
              <TableRow
                hover
                role="checkbox"
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" sx={{ background: "#80aa" }}>
                  {parcial.fecha}
                </TableCell>
                <TableCell align="center" sx={{ background: "#80aa" }}>
                  {parcial.materia}
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
