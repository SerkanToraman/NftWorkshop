import { ConnectButton } from "@mysten/dapp-kit";
import { Link, BrowserRouter as Router } from "react-router-dom";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Toolbar, AppBar, Typography, Box } from "@mui/material";

//Components
import { AdminPage } from "./pages/AdminPage";
import { UserPage } from "./pages/UserPage";

function App() {
  return (
    <Router>
      <>
        <AppBar position="sticky">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Box>
              <Typography variant="h6">dApp Starter Template</Typography>
              <Link
                to="/"
                style={{
                  marginRight: "1rem",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Mint NFT
              </Link>
              <Link
                to="/admin"
                style={{
                  marginRight: "1rem",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Admin
              </Link>
            </Box>
            <Box>
              <ConnectButton />
            </Box>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<UserPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
