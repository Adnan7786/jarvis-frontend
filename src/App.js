// src/App.js
import "./App.css"
import React from "react";
import ChatWindow from "./components/ChatWindow";
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";


function App() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" height="100vh">
      <Typography fontSize="28px" p={2} height="10%" width="60%" textAlign="center">J.A.R.V.I.S</Typography>
      <ChatWindow height="90%" width="60%" />
    </Box>
  );
}

export default App;