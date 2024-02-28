import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import Reloj from "./Reloj";
import Parciales from "./ParcialesAdmin";
import { useAuth0 } from "@auth0/auth0-react";

const Horario = () => {
  const [diaFijo, setDiaFijo] = useState("");
  const [diaActual, setDiaActual] = useState(new Date().getDay());
  const [dia, setDia] = useState(new Date().getDay());
  const [contenidoDiario, setContenidoDiario] = useState({
    _id: "",
    dia: "",
    materias: [],
  });
  const apiUrl = process.env.REACT_APP_API_URL; 

  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({
    horario: "",
    abreviacion: "",
    curso: "",
  });

  const [adding, setAdding] = useState(false);

  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      consultarDatos();
    } else {
      setContenidoDiario({
        _id: "",
        dia: "Cargando...",
        materias: [],
      });
    }
  }, [isAuthenticated, dia]);

  useEffect(() => {
    setDia(diaActual);
  }, [diaActual]);

  const consultarDatos = async () => {
    try {
      const response = await fetch(`${apiUrl}/horarios`);
      const data = await response.json();
      setContenidoDiario(data[dia]);
      setDiaFijo(data[diaActual].dia);
    } catch (error) {
      console.error("Error al consultar los datos:", error);
    }
  };

  const handleAgregar = () => {
    // Establecer el modo de agregar en verdadero
    setAdding(true);
  };

  const handleCancelAdd = () => {
    // Cancelar la adición y restablecer los valores
    setAdding(false);
    setEditData({
      horario: "",
      abreviacion: "",
      curso: "",
    });
  };

  const handleAdd = async () => {
    try {
      // Crear una copia del contenido diario actual
      const updatedDay = { ...contenidoDiario };

      // Agregar la nueva materia al arreglo de materias
      updatedDay.materias.push(editData);

      // Realizar la solicitud PUT al servidor para actualizar el día completo
      await fetch(`${apiUrl}/horarios/${updatedDay._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDay),
      });

      // Restablecer los valores de edición
      setEditData({
        horario: "",
        abreviacion: "",
        curso: "",
      });

      // Establecer el modo de agregar en falso
      setAdding(false);

      // Actualizar el estado con el día modificado
      setContenidoDiario(updatedDay);
    } catch (error) {
      console.error("Error al agregar la materia:", error);
    }
  };

  const handleEditar = (materiaIndex) => {
    // Establecer el índice de edición y los datos de edición
    setEditIndex(materiaIndex);
    setEditData({
      ...contenidoDiario.materias[materiaIndex],
    });
  };

  const handleEliminar = async (materiaIndex) => {
    try {
      // Crear una copia del contenido diario actual
      const updatedDay = { ...contenidoDiario };

      // Eliminar la materia del arreglo de materias
      updatedDay.materias.splice(materiaIndex, 1);

      // Realizar la solicitud PUT al servidor para actualizar el día completo
      await fetch(`${apiUrl}/horarios/${updatedDay._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDay),
      });

      // Actualizar el estado con el día modificado
      setContenidoDiario(updatedDay);
      // Reiniciar el estado de edición después de eliminar
      setEditIndex(null);
      setEditData({
        horario: "",
        abreviacion: "",
        curso: "",
      });
    } catch (error) {
      console.error("Error al eliminar la materia:", error);
    }
  };

  const handleInputChange = (e) => {
    // Manejar cambios en los campos de edición
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleCancelEdit = () => {
    // Cancelar la edición y restablecer los valores
    setEditIndex(null);
    setEditData({
      horario: "",
      abreviacion: "",
      curso: "",
    });
  };

  const handleSubmitEdit = async () => {
    try {
      // Crear una copia del contenido diario actual
      const updatedDay = { ...contenidoDiario };

      // Modificar la materia correspondiente en el arreglo de materias
      updatedDay.materias[editIndex] = {
        ...updatedDay.materias[editIndex],
        ...editData,
      };

      // Realizar la solicitud PUT al servidor para actualizar el día completo
      await fetch(`${apiUrl}/horarios/${updatedDay._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDay),
      });

      // Restablecer los valores de edición
      setEditIndex(null);
      setEditData({
        horario: "",
        abreviacion: "",
        curso: "",
      });

      // Actualizar el estado con el día modificado
      setContenidoDiario(updatedDay);
    } catch (error) {
      console.error("Error al editar la materia:", error);
    }
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

  const incrementarDia = () => {
    setDia((prevDia) => (prevDia + 1) % 7);
  };

  const decrementarDia = () => {
    setDia((prevDia) => (prevDia - 1 + 7) % 7);
  };

  return (
    <Container sx={{ overflow: "hidden" }}>
      <TableContainer sx={tablestyle}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={4}>
                <Reloj data={diaFijo} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">
                <Button variant="text" onClick={decrementarDia}>
                  {"<"}
                </Button>
              </TableCell>
              <TableCell align="center" colSpan={2}>
                {contenidoDiario.dia}
              </TableCell>
              <TableCell align="center">
                <Button variant="text" onClick={incrementarDia}>
                  {">"}
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Hora</TableCell>
              <TableCell align="center">Materia</TableCell>
              <TableCell align="center">Curso</TableCell>
              <TableCell align="center">
                <Button
                  variant="contained"
                  onClick={handleAgregar}
                  sx={buttonStyle}
                >
                  <AddIcon />
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adding ? (
              <TableRow>
                <TableCell align="center" sx={{ background: "#80aa" }}>
                  <input
                    type="text"
                    name="horario"
                    value={editData.horario}
                    onChange={handleInputChange}
                    placeholder="Horario"
                  />
                </TableCell>
                <TableCell align="center" sx={{ background: "#80aa" }}>
                  <input
                    type="text"
                    name="abreviacion"
                    value={editData.abreviacion}
                    onChange={handleInputChange}
                    placeholder="Abreviación"
                  />
                </TableCell>
                <TableCell align="center" sx={{ background: "#80aa" }}>
                  <input
                    type="text"
                    name="curso"
                    value={editData.curso}
                    onChange={handleInputChange}
                    placeholder="Curso"
                  />
                </TableCell>
                <TableCell align="center" sx={{ background: "#80aa" }}>
                  <>
                    <Button
                      variant="outlined"
                      onClick={handleAdd}
                      sx={buttonStyle}
                    >
                      <SaveIcon />
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={handleCancelAdd}
                      sx={buttonStyle}
                    >
                      <CancelIcon />
                    </Button>
                  </>
                </TableCell>
              </TableRow>
            ) : contenidoDiario.materias.length > 0 ? (
              contenidoDiario.materias.map((materia, index) => (
                <TableRow
                  hover
                  role="checkbox"
                  key={`${dia}-${index}`}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" sx={{ background: "#80aa" }}>
                    {editIndex === index ? (
                      <input
                        type="text"
                        name="horario"
                        value={editData.horario}
                        onChange={handleInputChange}
                        placeholder="Horario"
                      />
                    ) : (
                      materia.horario
                    )}
                  </TableCell>
                  <TableCell align="center" sx={{ background: "#80aa" }}>
                    {editIndex === index ? (
                      <input
                        type="text"
                        name="abreviacion"
                        value={editData.abreviacion}
                        onChange={handleInputChange}
                        placeholder="Abreviación"
                      />
                    ) : (
                      materia.abreviacion
                    )}
                  </TableCell>
                  <TableCell align="center" sx={{ background: "#80aa" }}>
                    {editIndex === index ? (
                      <input
                        type="text"
                        name="curso"
                        value={editData.curso}
                        onChange={handleInputChange}
                        placeholder="Curso"
                      />
                    ) : (
                      materia.curso
                    )}
                  </TableCell>
                  <TableCell align="center" sx={{ background: "#80aa" }}>
                    {editIndex === index ? (
                      <>
                        <Button
                          variant="outlined"
                          onClick={handleSubmitEdit}
                          sx={buttonStyle}
                        >
                          <SaveIcon />
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={handleCancelEdit}
                          sx={buttonStyle}
                        >
                          <CancelIcon />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="outlined"
                          onClick={() => handleEditar(index)}
                          sx={buttonStyle}
                        >
                          <EditIcon />
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => handleEliminar(index)}
                          sx={buttonStyle}
                        >
                          <DeleteIcon />
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  align="center"
                  colSpan={4}
                  sx={{ background: "#80aa", height: 100 }}
                >
                  No hay materias
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Parciales />
    </Container>
  );
};

export default Horario;
