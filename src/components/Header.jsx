import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Switch,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Header = () => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { mode, toggleTheme, currency, setCurrency } = useAppContext();

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Exchange Rate (live)", path: "/exchange" },
    { label: "About", path: "/about" },
  ];

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar className="flex justify-between px-4">
          <Typography variant="h6" className="font-bold">
            Loan Calculator
          </Typography>

          {isMobile ? (
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <div className="flex items-center gap-6 ml-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-white hover:underline ${
                    location.pathname === link.path ? "font-bold underline" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <Typography variant="body2" color="inherit">
                {mode === "dark" ? "Dark" : "Light"} Mode
              </Typography>
              <Switch checked={mode === "dark"} onChange={toggleTheme} color="default" />
            </div>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
        <List className="w-60">
          {navLinks.map((link) => (
            <ListItem button key={link.path} onClick={handleDrawerToggle} component={Link} to={link.path}>
              <ListItemText primary={link.label} />
            </ListItem>
          ))}
          <ListItem>
            <Typography variant="body2">
              {mode === "dark" ? "Dark" : "Light"} Mode
            </Typography>
            <Switch checked={mode === "dark"} onChange={toggleTheme} color="default" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Header;
