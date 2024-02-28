import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
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

const buttonStyle = {
  width: 20,
  height: 20,
  minWidth: 20,
  minHeight: 20,
  fontSize: 10,
};

const DenseTable = () => {
  const [rows, setRows] = useState([]);
  const { isAuthenticated } = useAuth0();
  const [editingRow, setEditingRow] = useState(null);
  const [editedNote, setEditedNote] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL; // Aquí se utiliza la variable de entorno
  console.log(apiUrl)

  useEffect(() => {
    // Cargar los datos solo si el usuario está autenticado
    if (isAuthenticated) {
      fetch(`${apiUrl}/materias`)
        .then((response) => response.json())
        .then((data) => setRows(data))
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [isAuthenticated]);

  // Función para verificar si una materia se puede realizar
  const puedeRealizar = (materia, rows) => {
    // Verificar si la materia ya está aprobada o tiene una nota mayor o igual a 6
    if (materia.nota >= 6) return false;

    // Obtener los números de las materias aprobadas y regulares
    const materiasAprobadas = rows
      .filter((row) => row.nota >= 7)
      .map((row) => row.numero);

    const materiasRegulares = rows
      .filter((row) => row.nota === 6)
      .map((row) => row.numero);

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

  // Función para activar la edición de la nota
  const handleEditNote = (row) => {
    setEditingRow(row);
    setEditedNote(row.nota);
  };

  // Función para guardar los cambios de la nota editada
  const handleSaveNote = () => {
    // Realizar la petición PUT al servidor para actualizar la nota en la base de datos
    fetch(`${apiUrl}/${editingRow._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nota: editedNote }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Actualizar el estado rows con la nueva nota editada
        const updatedRows = rows.map((row) =>
          row === editingRow ? { ...row, nota: editedNote } : row
        );
        setRows(updatedRows);
        setEditingRow(null);
      })
      .catch((error) => console.error("Error updating note:", error));
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
                  <TableCell align="left">
                    {editingRow === row ? (
                      <input
                        type="number"
                        value={editedNote}
                        onChange={(e) => {
                          // Limitar el valor ingresado al rango de 0 a 10
                          const newValue = Math.min(
                            Math.max(e.target.value, 0),
                            10
                          );
                          setEditedNote(newValue);
                        }}
                        min={0}
                        max={10}
                      />
                    ) : (
                      row.nota
                    )}
                  </TableCell>
                  <TableCell>
                    {editingRow === row ? (
                      <Button
                        variant="outlined"
                        sx={buttonStyle}
                        onClick={handleSaveNote}
                      >
                        <SaveIcon />
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        sx={buttonStyle}
                        onClick={() => handleEditNote(row)}
                      >
                        <EditIcon />
                      </Button>
                    )}
                  </TableCell>
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