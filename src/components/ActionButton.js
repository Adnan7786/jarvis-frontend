// src/components/ActionButton.js

import React from "react";
import { Button } from "@mui/material";

function ActionButton({ label }) {
  const handleActionClick = () => {
    console.log(`Action clicked: ${label}`);
    // Additional logic for button actions can go here
  };

  return (
    <Button
      variant="outlined"
      color="primary"
      size="small"
      onClick={handleActionClick}
      style={{ margin: "2px" }}
    >
      {label}
    </Button>
  );
}

export default ActionButton;
