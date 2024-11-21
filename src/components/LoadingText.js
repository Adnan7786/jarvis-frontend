// src/components/Message.js

import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";

export default function LoadingText({ text, variant }) {
  if (!variant) variant = "h5";
  const dot = " ●";
  const [state, setState] = useState(dot);

  useEffect(() => {
    let index = 1;
    setInterval(() => {
      if (index > text.length) return clearInterval();
      index === text.length
        ? setState(text.substring(0, index))
        : setState(text.substring(0, index) + dot);
      index += 1;
    }, 50);
  }, [text]);

  return <Typography variant={variant}>{state}</Typography>;
}
