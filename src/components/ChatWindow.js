// src/components/ChatWindow.js

import React, { useState } from "react";
import axios from "axios";
import { Stack, TextField, Chip, Box } from "@mui/material";
import Message from "./Message";
import SendIcon from "@mui/icons-material/Send";
import LoadingText from "./LoadingText";

function ChatWindow({ height, width }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const newSession = messages.length === 0 ? true : false;
  const recommendedPrompts = [
    "What can you do?",
    "Tell me a joke",
    "Summarize recent news",
  ];

  const handleSend = async (prompt) => {
    if (!prompt.trim()) return;
    setInput("");
    const userMessage = { text: prompt, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post(
        "http://localhost:8000/generate_response",
        {
          text: prompt,
        }
      );

      const botMessage = {
        text: response.data.response,
        actions: response.data.actions,
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handlePromptClick = async (prompt) => {
    setInput(prompt);
    handleSend(prompt);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent={newSession ? "center" : "space-between"}
      gap="10px"
      height={height}
      width={width}
    >
      {/* Message List */}
      <Box
        display={newSession ? "none" : "flex"}
        flexDirection="column"
        gap="10px"
        sx={{ overflowY: "auto", padding: "10px", flexGrow: 1 }}
      >
        <Stack spacing={1}>
          {messages.map((message, index) => (
            <Message
              key={index}
              text={message.text}
              sender={message.sender}
              actions={message.actions}
            />
          ))}
        </Stack>
      </Box>

      {/* Centered Input and Prompts at the Start */}
      <Box
        display="flex"
        flexDirection="column"
        gap="10px"
        paddingBottom="10px"
        width="100%"
      >
        <Box display={newSession ? "flex" : "none"} justifyContent="center">
          <LoadingText text="What can I help you with?" />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Type a prompt"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend(input)}
            autoComplete="off"
            InputProps={{
              endAdornment: (
                <SendIcon
                  variant="contained"
                  onClick={() => handleSend(input)}
                  color={input.trim() ? "primary" : "disabled"}
                  sx={{ marginLeft: "10px" }}
                />
              ),
            }}
          />
        </Box>

        <Box
          display={newSession ? "flex" : "none"}
          justifyContent="center"
          gap="8px"
          flexWrap="wrap"
        >
          {recommendedPrompts.map((prompt, index) => (
            <Chip
              key={index}
              label={prompt}
              onClick={() => handlePromptClick(prompt)}
              sx={{ cursor: "pointer" }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default ChatWindow;
