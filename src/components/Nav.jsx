import { Link } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { useState } from "react";

const Nav = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const routes = [
    { path: "/", text: "Home" },
    { path: "/categories", text: "Categories" },
    { path: "/reviews", text: "Reviews" },
    { path: "/userprofile", text: "Profile" },
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const renderButton = (text, path) => (
    <Button
      key={text}
      onClick={handleCloseNavMenu}
      sx={{ my: 2, color: "white", display: "block" }}
      component={Link}
      to={path}
    >
      {text}
    </Button>
  );

  const renderMenuItem = (text, path) => (
    <MenuItem key={text} component={Link} to={path} color="inherit">
      {text}
    </MenuItem>
  );

  const textStyle = {
    mr: 2,
    fontFamily: "monospace",
    fontWeight: 700,
    letterSpacing: ".3rem",
    color: "inherit",
    textDecoration: "none",
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <SmartToyIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{ ...textStyle, display: { xs: "none", md: "flex" } }}
          >
            Karlie Game
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              color="inherit"
              aria-label="mene-bar"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {routes.map(({ text, path }) => renderMenuItem(text, path))}
            </Menu>
          </Box>
          <SmartToyIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{ ...textStyle, display: { xs: "flex", md: "none" } }}
          >
            Karlie Game
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {routes.map(({ text, path }) => renderButton(text, path))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Nav;
