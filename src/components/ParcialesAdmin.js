import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Parciales = () => {
  const [parciales, setParciales] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [nuevoParcial, setNuevoParcial] = useState({ fecha: "", materia: "" });
  const apiUrl = process.env.REACT_APP_API_URL; 

  useEffect(() => {
    obtenerParciales();
  }, []);

  const obtenerParciales = async () => {
    try {
      const response = await fetch(`${apiUrl}/parciales`);
      if (response.ok) {
        const data = await response.json();
        setParciales(data);
        setEditData(data.map((parcial) => ({ ...parcial })));
      } else {
        console.error("Error al obtener los parciales:", response.statusText);
      }
    } catch (error) {
      console.error("Error al obtener los parciales:", error.message);
    }
  };

  const handleEditarParcial = (id) => {
    const index = parciales.findIndex((parcial) => parcial._id === id);
    if (index !== -1) {
      setEditIndex(index);
      const newData = [...editData];
      newData[index] = { ...parciales[index] };
      setEditData(newData);
    } else {
      console.error("Parcial no encontrado");
    }
  };

  const handleEliminarParcial = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/parcial/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const updatedParciales = parciales.filter(
          (parcial) => parcial._id !== id
        );
        setParciales(updatedParciales);
        const newData = [...editData];
        newData.splice(editIndex, 1);
        setEditData(newData);
        setEditIndex(null);
      } else {
        console.error("Error al eliminar el parcial:", response.statusText);
      }
    } catch (error) {
      console.error("Error al eliminar el parcial:", error.message);
    }
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const newData = [...editData];
    newData[index] = { ...newData[index], [name]: value };
    setEditData(newData);
  };

  const handleGuardarCambios = async (id, index) => {
    try {
      const response = await fetch(`${apiUrl}/parcial/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editData[index]),
      });
      if (response.ok) {
        const updatedParciales = [...parciales];
        updatedParciales[index] = editData[index];
        setParciales(updatedParciales);
        setEditIndex(null);
      } else {
        console.error(
          "Error al guardar los cambios del parcial:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error al guardar los cambios del parcial:", error.message);
    }
  };

  const handleCancelarEdicion = (index) => {
    setEditIndex(null);
    const newData = [...editData];
    newData[index] = { fecha: "", materia: "" };
    setEditData(newData);
  };

  const handleAgregarParcial = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("${apiUrl}/parciales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoParcial),
      });
      if (response.ok) {
        const data = await response.json();
        setParciales([...parciales, data]);
        setEditData([...editData, { fecha: "", materia: "" }]);
        setShowAddForm(false); // Ocultar el formulario después de agregar el parcial
        setNuevoParcial({ fecha: "", materia: "" }); // Restablecer el estado del nuevo parcial
        obtenerParciales(); // Actualizar la lista de parciales
      } else {
        console.error("Error al agregar el parcial:", response.statusText);
      }
    } catch (error) {
      console.error("Error al agregar el parcial:", error.message);
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

  const buttonStyle = {
    width: 20,
    height: 20,
    minWidth: 20,
    minHeight: 20,
    fontSize: 10,
  };

  return (
    <TableContainer sx={tablestyle}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              PARCIALES
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">Fecha</TableCell>
            <TableCell align="center">Materia</TableCell>
            <TableCell align="center">
              <Button
                onClick={() => setShowAddForm(!showAddForm)}
                variant="contained"
                sx={buttonStyle}
              >
                <AddIcon />
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!showAddForm && parciales.length === 0 && (
            <TableRow>
              <TableCell
                align="center"
                colSpan={3}
                sx={{ background: "#80aa", height: 100 }}
              >
                No hay parciales
              </TableCell>
            </TableRow>
          )}
          {showAddForm && (
            <TableRow>
              <TableCell align="center" sx={{ background: "#80aa" }}>
                <input
                  type="text"
                  placeholder="Fecha"
                  value={nuevoParcial.fecha}
                  onChange={(e) =>
                    setNuevoParcial({
                      ...nuevoParcial,
                      fecha: e.target.value,
                    })
                  }
                />
              </TableCell>
              <TableCell align="center" sx={{ background: "#80aa" }}>
                <input
                  type="text"
                  placeholder="Materia"
                  value={nuevoParcial.materia}
                  onChange={(e) =>
                    setNuevoParcial({
                      ...nuevoParcial,
                      materia: e.target.value,
                    })
                  }
                />
              </TableCell>
              <TableCell align="center" sx={{ background: "#80aa" }}>
                <Button
                  onClick={handleAgregarParcial}
                  variant="outlined"
                  sx={buttonStyle}
                >
                  <SaveIcon />
                </Button>
                <Button
                  onClick={() => setShowAddForm(false)}
                  variant="outlined"
                  sx={buttonStyle}
                >
                  <CancelIcon />
                </Button>
              </TableCell>
            </TableRow>
          )}
          {parciales.length > 0 && !showAddForm && (
            <>
              {parciales.map((parcial, index) => (
                <TableRow key={index}>
                  <TableCell align="center" sx={{ background: "#80aa" }}>
                    {editIndex === index ? (
                      <input
                        type="text"
                        name="fecha"
                        value={editData[index].fecha}
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    ) : (
                      parcial.fecha
                    )}
                  </TableCell>
                  <TableCell align="center" sx={{ background: "#80aa" }}>
                    {editIndex === index ? (
                      <input
                        type="text"
                        name="materia"
                        value={editData[index].materia}
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    ) : (
                      parcial.materia
                    )}
                  </TableCell>
                  <TableCell align="center" sx={{ background: "#80aa" }}>
                    {editIndex === index ? (
                      <>
                        <Button
                          onClick={() =>
                            handleGuardarCambios(parcial._id, index)
                          }
                          variant="outlined"
                          sx={buttonStyle}
                        >
                          <SaveIcon />
                        </Button>
                        <Button
                          onClick={() => handleCancelarEdicion(index)}
                          variant="outlined"
                          sx={buttonStyle}
                        >
                          <CancelIcon />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          onClick={() => handleEditarParcial(parcial._id)}
                          variant="outlined"
                          sx={buttonStyle}
                        >
                          <EditIcon />
                        </Button>
                        <Button
                          onClick={() => handleEliminarParcial(parcial._id)}
                          variant="outlined"
                          sx={buttonStyle}
                        >
                          <DeleteIcon />
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Parciales;
