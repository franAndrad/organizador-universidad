import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useAuth0 } from "@auth0/auth0-react";

export default function MenuAppBar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0();
  const { isLoading } = useAuth0();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            FA
          </Typography>
          {isLoading ? (
            <Typography>Loading...</Typography>
          ) : (
            <>
              {isAuthenticated ? (
                <div style={{ display: "flex" }}>
                  <div style={{ flexGrow: 1 }} />
                  <div>
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
