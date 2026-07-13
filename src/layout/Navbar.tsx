import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Box,
} from "@mui/material";

const Navbar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: 1201,
      }}
    >
      <Toolbar>

        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
          }}
        >
          Student Management System
        </Typography>

        <Box>

          <Avatar>
            P
          </Avatar>

        </Box>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;