import { Outlet, useLocation, Link } from "react-router-dom";
import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import AddTask from "./components/AddTask";
import { useColorMode } from "./theme/useColorMode";

export default function App() {
  const [showAddModal, setShowAddModal] = useState(false);
  const handleOpen = () => setShowAddModal(true);
  const handleClose = () => setShowAddModal(false);
  const location = useLocation();
  const { mode, toggleColorMode } = useColorMode();

  const navItems = [
    { label: "ADD", onClick: handleOpen },
    { label: "DONE", path: "/done" },
    { label: "TODO", path: "/to-do" },
    { label: "STATS", path: "/stats" },
  ];

  return (
    <Box component="main" sx={{ mx: 2, pb: 10 }}>
      <Outlet />

      <Paper
        elevation={3}
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
        }}
      >
        <Container sx={{ py: 2 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography
              component={Link}
              to="/"
              variant="h6"
              sx={{
                textDecoration: "none",
                color: "text.primary",
                mr: "auto",
              }}
            >
              MODO
            </Typography>
            {navItems.map((item) =>
              item.path ? (
                <Button
                  key={item.label}
                  component={Link}
                  to={item.path}
                  variant="text"
                  color="inherit"
                  sx={{
                    color: "text.secondary",
                    fontWeight:
                      location.pathname === item.path ? "bold" : "normal",
                  }}
                >
                  {item.label}
                </Button>
              ) : (
                <Button
                  key={item.label}
                  variant="text"
                  color="inherit"
                  onClick={item.onClick}
                  sx={{ color: "text.secondary" }}
                >
                  {item.label}
                </Button>
              ),
            )}
            <IconButton onClick={toggleColorMode} color="inherit" size="small">
              {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Stack>
        </Container>
      </Paper>
      <AddTask showModal={showAddModal} handleClose={handleClose} />
    </Box>
  );
}
