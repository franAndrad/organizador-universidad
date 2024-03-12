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
  const [correlatividades, setCorrelatividades] = useState([]);
  const { user, isAuthenticated } = useAuth0();
  const apiUrl = process.env.REACT_APP_API_URL; 

  useEffect(() => {
    // Cargar los datos solo si el usuario está autenticado
    if (isAuthenticated) {
      fetch(`${apiUrl}/materias?email=${user.email}&userId=${user.sub}`)
        .then((response) => response.json())
        .then((data) => {
          const sortedData = data.sort((a, b) => a.numero - b.numero);
          setCorrelatividades(sortedData);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [isAuthenticated]);

  // Función para verificar si una materia se puede realizar
  const puedeRealizar = (materia, correlatividades) => {
    // Verificar si la materia ya está aprobada o tiene una nota mayor o igual a 6
    if (materia.nota >= 6) return false;

    // Obtener los números de las materias aprobadas y regulares
    const materiasAprobadas = correlatividades
      .filter((materia) => materia.nota >= 7)
      .map((materia) => materia.numero);

    const materiasRegulares = correlatividades
      .filter((materia) => materia.nota === 6)
      .map((materia) => materia.numero);

    // Verificar si el estudiante ha aprobado todas las materias requeridas para regular y aprobada
    const todasRegularesAprobadas = materia.regular.every(
      (numero) =>
        materiasRegulares.includes(numero) || materiasAprobadas.includes(numero)
    );

    const todasAprobadas = materia.aprobada.every((numero) =>
      materiasAprobadas.includes(numero)
    );

    if (todasRegularesAprobadas && todasAprobadas) {
      return true;
    }

    return false;
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
            {correlatividades.length === 0 ? (
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
              correlatividades.map((materia) => (
                <TableRow
                  hover
                  role="checkbox"
                  key={materia.nombre}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    backgroundColor:
                      materia.nota >= 7
                        ? "#80af"
                        : materia.nota === 6
                        ? "#80a5"
                        : puedeRealizar(materia, correlatividades)
                        ? "#806f"
                        : "inherit",
                  }}
                >
                  <TableCell align="left">{materia.numero}</TableCell>
                  <TableCell align="left">{materia.nombre}</TableCell>
                  <TableCell align="left">{materia.abreviacion}</TableCell>
                  <TableCell align="left">{materia.modalidad}</TableCell>
                  <TableCell align="left">{materia.nota}</TableCell>
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
            <p>Regulares: {correlatividades.filter((materia) => materia.nota === 6).length}</p>
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
            <p>Aprobadas: {correlatividades.filter((materia) => materia.nota >= 7).length}</p>
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
