import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Tareas from "./components/Horario";
import Correlatividades from "./components/Correlatividades";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container sx={{ my: 10 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <Tareas></Tareas>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Correlatividades></Correlatividades>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}