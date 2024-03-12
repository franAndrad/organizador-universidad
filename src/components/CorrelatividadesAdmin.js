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
  const [correlatividades, setCorrelatividades] = useState([]);
  const { user, isAuthenticated } = useAuth0();
  const [editingRow, setEditingRow] = useState(null);
  const [editedNote, setEditedNote] = useState("");
  const [selectedOption, setSelectedOption] = useState("ing.sistemas"); // Valor seleccionado en el select
  const [sendRequest, setSendRequest] = useState(false); // Estado para controlar si se debe enviar la solicitud
  const apiUrl = process.env.REACT_APP_API_URL; // Aquí se utiliza la variable de entorno
  console.log(apiUrl);

  // Función para cargar los datos
  const fetchData = () => {
    fetch(`${apiUrl}/materias?email=${user.email}&userId=${user.sub}`)
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.sort((a, b) => a.numero - b.numero);
        setCorrelatividades(sortedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    // Cargar los datos solo si el usuario está autenticado
    if (isAuthenticated) {
      fetchData();
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

  // Función para activar la edición de la nota
  const handleEditNote = (materia) => {
    setEditingRow(materia);
    setEditedNote(materia.nota);
  };

  // Función para guardar los cambios de la nota editada
  const handleSaveNote = () => {
    // Realizar la petición PUT al servidor para actualizar la nota en la base de datos
    fetch(`${apiUrl}/materia/${editingRow._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nota: editedNote }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Actualizar el estado correlatividades con la nueva nota editada
        const updatedRows = correlatividades.map((materia) =>
          materia === editingRow ? { ...materia, nota: editedNote } : materia
        );
        setCorrelatividades(updatedRows);
        setEditingRow(null);
      })
      .catch((error) => console.error("Error updating note:", error));
  };

  // Función para manejar el cambio en el select
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    setSendRequest(false); // Resetear el estado para enviar la solicitud
  };

  // Función para manejar el envío de la solicitud
  const handleSendRequest = () => {
    setSendRequest(true); // Establecer el estado para enviar la solicitud
  };

  // useEffect para enviar la solicitud cuando sendRequest cambie
  useEffect(() => {
    if (sendRequest) {
      // Si el contenido no existe, enviar la solicitud para agregarlo
      fetch(`${apiUrl}/materias`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          userId: user.sub,
          value: selectedOption,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Actualizar los datos si es necesario
          console.log(data.success)
          if (data.success) {
            // Volver a cargar los datos para reflejar los cambios
            fetchData();
          }
        })
        .catch((error) => console.error("Error adding data:", error))
        .finally(() => {
          // Después de enviar la solicitud, restablecer el estado
          setSendRequest(false);
        });
    }
  }, [sendRequest]);

  return (
    <Container sx={{ overflow: "hidden" }}>
      <TableContainer sx={tablestyle}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left" colSpan={7}>
                <select value={selectedOption} onChange={handleSelectChange}>
                  <option value="ing.sistemas">Ing. Sistemas</option>
                  {/* <option value="ing.electronica">Ing. Electronica</option> */}
                  {/* Agrega más opciones aquí si es necesario */}
                </select>
                <Button
                  variant="contained"
                  onClick={handleSendRequest}
                  sx={{ ml: 2 }}
                >
                  Cargar materias
                </Button>
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
                  <TableCell align="left">
                    {editingRow === materia ? (
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
                        style={{ height: 36, verticalAlign: "middle" }}
                      />
                    ) : (
                      materia.nota
                    )}
                  </TableCell>
                  <TableCell>
                    {editingRow === materia ? (
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
                        onClick={() => handleEditNote(materia)}
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
