// src/components/Message.js

import React from "react";
import DOMPurify from "dompurify";
import { Box, Chip, Stack, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import ActionButton from "./ActionButton";

function Message({ text, sender, actions }) {
  return (
    <Box
      display="flex"
      overflow="hidden"
      justifyContent={sender === "user" ? "flex-end" : "flex-start"}
    >
      {sender === "user" ? (
        <Stack maxWidth="75%">
          <Chip
            sx={{
              paddingBlock: "10px",
              height: "auto",
              "& .MuiChip-label": {
                display: "block",
                whiteSpace: "normal",
                overflowWrap: "break-word",
              },
            }}
            label={text}
          />
        </Stack>
      ) : (
        <Box
          display="flex"
          flexDirection="row"
          marginTop="10px"
          maxWidth="90%"
          gap="7px"
        >
          <Avatar alt="logo" src="logo512.png" sx={{ width: 30, height: 30 }} />
          <Box display="flex" flexDirection="column" gap="7px">
            <Typography
              variant="body2"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(text) }}
            ></Typography>
            <Box marginTop="5px">
              {actions.map((action, index) => (
                <ActionButton key={index} label={action} />
              ))}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Message;
