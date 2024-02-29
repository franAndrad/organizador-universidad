import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import EditIcon from "@mui/icons-material/Edit";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useLocation } from "react-router-dom";

export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const { isLoading } = useAuth0();
  const location = useLocation();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              component={Link}
              to="/"
            >
              <HomeIcon />
            </IconButton>
          </Typography>
          {isLoading ? (
            <Typography>Loading...</Typography>
          ) : (
            <>
              {isAuthenticated ? (
                <div style={{ display: "flex", alignItems: "center" }}>
                  {location.pathname === "/admin" ? (
                    <IconButton
                      size="large"
                      aria-label="edit"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      color="inherit"
                      component={Link}
                      to="/"
                    >
                      <HomeIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      size="large"
                      aria-label="edit"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      color="inherit"
                      component={Link}
                      to="/admin"
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                  <div style={{ flexGrow: 1 }} />
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    {user && user.picture ? (
                      <img
                        src={user.picture}
                        alt="User Avatar"
                        style={{ borderRadius: "50%", width: 30, height: 30 }}
                      />
                    ) : (
                      <AccountCircle />
                    )}
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem>{user.name}</MenuItem>
                    <MenuItem
                      onClick={() =>
                        logout({
                          returnTo: window.location.origin,
                        })
                      }
                    >
                      Cerrar Sesión
                    </MenuItem>
                  </Menu>
                </div>
              ) : (
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={loginWithRedirect}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
