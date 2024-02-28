import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Menu from "./components/Menu";
import Home from "./components/Home";
import HomeAdmin from "./components/HomeAdmin";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <BrowserRouter>
        <Menu />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/admin" element={<HomeAdmin />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}