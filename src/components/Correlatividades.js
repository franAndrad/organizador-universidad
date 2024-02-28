import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useAuth0 } from "@auth0/auth0-react";
import materiasSistemas from "./data/materiasSistemas.json"; // Importar los datos locales

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
  const { user, isAuthenticated } = useAuth0();
  const apiUrl = process.env.REACT_APP_API_URL;
  const [firstLogin, setFirstLogin] = useState(true); // Estado para rastrear la primera sesión

  useEffect(() => {
    if (isAuthenticated) {
      if (firstLogin) {
        // Si es la primera sesión, enviar los datos al servidor
        fetch(`${apiUrl}/materias`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            userId: user.sub,
            materias: materiasSistemas,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to send data to server");
            }
            return response.json();
          })
          .then((data) => {
            console.log("Data sent to server:", data);
            setRows(materiasSistemas); // Establecer los datos locales como filas
            setFirstLogin(false); // Marcar que ya no es la primera sesión
          })
          .catch((error) =>
            console.error("Error sending data to server:", error)
          );
      } else {
        // Si no es la primera sesión, cargar los datos desde la API
        fetch(`${apiUrl}/materias?email=${user.email}&userId=${user.sub}`)
          .then((response) => response.json())
          .then((data) => setRows(data))
          .catch((error) => console.error("Error fetching data:", error));
      }
    }
  }, [isAuthenticated, user, apiUrl, firstLogin]);

  // Función para verificar si una materia se puede realizar
  const puedeRealizar = (materia, rows) => {
    // Lógica para verificar si la materia se puede realizar
  };

  return (
    <Container sx={{ overflow: "hidden" }}>
      <TableContainer sx={tablestyle}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={7}>
                INGENIERIA EN SISTEMAS
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">N</TableCell>
              <TableCell align="left">Asignatura</TableCell>
              <TableCell align="left">Abreviacion</TableCell>
              <TableCell align="left">Modalidad</TableCell>
              <TableCell align="left">Nota</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  align="center"
                  sx={{ background: "#80aa", height: 100 }}
                >
                  No hay materias
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
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
                        : puedeRealizar(row, rows)
                        ? "#806f"
                        : "inherit",
                  }}
                >
                  <TableCell align="left">{row.numero}</TableCell>
                  <TableCell align="left">{row.nombre}</TableCell>
                  <TableCell align="left">{row.abreviacion}</TableCell>
                  <TableCell align="left">{row.modalidad}</TableCell>
                  <TableCell align="left">{row.nota}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Container sx={style}>
        <Box sx={{ fontSize: "14px" }}>
          {/* Contar materias regulares */}
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
            <p>Regulares: {rows.filter((row) => row.nota === 6).length}</p>
          </Box>
          {/* Contar materias aprobadas */}
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
            <p>Aprobadas: {rows.filter((row) => row.nota >= 7).length}</p>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Box
              sx={{
                mr: 2,
                width: 17,
                height: 17,
                borderRadius: 1,
                bgcolor: "#806f",
              }}
            />
            <p className="mb-0">Habilitadas para cursar</p>
          </Box>
        </Box>
      </Container>
    </Container>
  );
};

export default DenseTable;
