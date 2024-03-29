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
  const getInitialData = () => [
    { dia: "DOMINGO", materias: [] },
    { dia: "LUNES", materias: [] },
    { dia: "MARTES", materias: [] },
    { dia: "MIERCOLES", materias: [] },
    { dia: "JUEVES", materias: [] },
    { dia: "VIERNES", materias: [] },
    { dia: "SABADO", materias: [] },
  ];

  const [contenidoDiario, setContenidoDiario] = useState(getInitialData());
  const apiUrl = process.env.REACT_APP_API_URL;

  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({
    horario: "",
    abreviacion: "",
    curso: "",
  });

  const [adding, setAdding] = useState(false);

  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      consultarDatos();
    } else {
      setContenidoDiario(getInitialData());
    }
  }, [isAuthenticated, dia]);

  useEffect(() => {
    setDia(diaActual);
  }, [diaActual]);

  const consultarDatos = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/horarios?email=${user.email}&userId=${user.sub}`
      );
      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }
      const data = await response.json();
      const updatedData = getInitialData().map((defaultDay) => {
        const foundDay = data.find((item) => item.dia === defaultDay.dia);
        return foundDay ? foundDay : defaultDay;
      });
      setContenidoDiario(updatedData);
    } catch (error) {
      console.error("Error al consultar los datos:", error);
    }
    setDiaFijo(contenidoDiario[diaActual].dia);
  };

  const handleAgregar = () => {
    setAdding(true);
  };

  const handleCancelAdd = () => {
    setAdding(false);
    setEditData({
      horario: "",
      abreviacion: "",
      curso: "",
    });
  };


  const handleAdd = async () => {
    try {
      // Realizar una petición GET para obtener los datos existentes
      const response = await fetch(
        `${apiUrl}/horarios?email=${user.email}&userId=${user.sub}`
      );
      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }
      const existingData = await response.json();

      // Verificar si la longitud de los datos es menor que 7
      if (existingData.length < 7) {
        // Realizar una serie de peticiones POST para agregar los datos faltantes
        const missingData = [
          { email: user.email, userId: user.sub, dia: "DOMINGO", materias: [] },
          { email: user.email, userId: user.sub, dia: "LUNES", materias: [] },
          { email: user.email, userId: user.sub, dia: "MARTES", materias: [] },
          { email: user.email, userId: user.sub, dia: "MIERCOLES", materias: []},
          { email: user.email, userId: user.sub, dia: "JUEVES", materias: [] },
          { email: user.email, userId: user.sub, dia: "VIERNES", materias: [] },
          { email: user.email, userId: user.sub, dia: "SABADO", materias: [] },
        ];

        const postRequests = missingData.map(async (data) => {
          const postResponse = await fetch(`${apiUrl}/horarios`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          if (!postResponse.ok) {
            throw new Error(
              `Error al agregar los datos para el día ${data.dia}`
            );
          }
          return postResponse.json();
        });

        // Esperar a que todas las peticiones POST se completen
        await Promise.all(postRequests);

        // Después de completar las solicitudes POST, hacer una petición GET para obtener el ID del horario actualizado
        const updatedResponse = await fetch(
          `${apiUrl}/horarios?email=${user.email}&userId=${user.sub}`
        );
        if (!updatedResponse.ok) {
          throw new Error("Error al obtener los datos actualizados");
        }
        const updatedData = await updatedResponse.json();

        const dias = [
          "DOMINGO",
          "LUNES",
          "MARTES",
          "MIERCOLES",
          "JUEVES",
          "VIERNES",
          "SABADO",
        ];
        const diaElegido = dias[dia];
        const diaSeleccionado = updatedData.find(
          (item) => item.dia === diaElegido
        );

        // Agregar la nueva materia
        diaSeleccionado.materias.push(editData);

        // Realizar la petición PUT
        const putResponse = await fetch(
          `${apiUrl}/horario/${diaSeleccionado._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(diaSeleccionado),
          }
        );

        if (!putResponse.ok) {
          throw new Error("Error al actualizar el día");
        }

        // Limpiar los datos de edición y actualizar el estado
        setEditData({
          horario: "",
          abreviacion: "",
          curso: "",
        });
        setAdding(false);
        const updatedContenidoDiario = [...contenidoDiario];
        updatedContenidoDiario[dia] = diaSeleccionado;
        setContenidoDiario(updatedContenidoDiario);
      } else {
        // Si la longitud es igual a 7, solo hacer la petición PUT para actualizar el día actual
        const updatedDay = { ...contenidoDiario[dia] };

        // Agregar la nueva materia
        updatedDay.materias.push(editData);

        // Realizar la petición PUT
        const putResponse = await fetch(`${apiUrl}/horario/${updatedDay._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedDay),
        });

        if (!putResponse.ok) {
          throw new Error("Error al actualizar el día");
        }

        // Limpiar los datos de edición y actualizar el estado
        setEditData({
          horario: "",
          abreviacion: "",
          curso: "",
        });
        setAdding(false);
        const updatedContenidoDiario = [...contenidoDiario];
        updatedContenidoDiario[dia] = updatedDay;
        setContenidoDiario(updatedContenidoDiario);
      }
    } catch (error) {
      console.error("Error al agregar la materia:", error);
    }
  };

  const handleEditar = (materiaIndex) => {
    setEditIndex(materiaIndex);
    setEditData({
      ...contenidoDiario[dia].materias[materiaIndex],
    });
  };

  const handleEliminar = async (materiaIndex) => {
    try {
      const updatedDay = { ...contenidoDiario[dia] };
      updatedDay.materias.splice(materiaIndex, 1);

      await fetch(`${apiUrl}/horario/${updatedDay._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDay),
      });

      const updatedContenidoDiario = [...contenidoDiario];
      updatedContenidoDiario[dia] = updatedDay;
      setContenidoDiario(updatedContenidoDiario);
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
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setEditData({
      horario: "",
      abreviacion: "",
      curso: "",
    });
  };

  const handleSubmitEdit = async () => {
    try {
      const dataToEdit = { ...editData, email: user.email, userId: user.sub };

      const updatedDay = { ...contenidoDiario[dia] };
      updatedDay.materias[editIndex] = {
        ...updatedDay.materias[editIndex],
        ...dataToEdit,
      };

      await fetch(`${apiUrl}/horario/${updatedDay._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDay),
      });

      setEditIndex(null);
      setEditData({
        horario: "",
        abreviacion: "",
        curso: "",
      });

      const updatedContenidoDiario = [...contenidoDiario];
      updatedContenidoDiario[dia] = updatedDay;
      setContenidoDiario(updatedContenidoDiario);
    } catch (error) {
      console.error("Error al editar la materia:", error);
    }
  };

  const incrementarDia = () => {
    setDia((prevDia) => (prevDia + 1) % 7);
  };

  const decrementarDia = () => {
    setDia((prevDia) => (prevDia - 1 + 7) % 7);
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
                {contenidoDiario[dia].dia}
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
            ) : contenidoDiario[dia].materias.length > 0 ? (
              contenidoDiario[dia].materias.map((materia, index) => (
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
