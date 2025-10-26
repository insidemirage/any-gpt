import React from "react";
import { Box } from "@mui/material";

interface ScrollableContentProps {
  children: React.ReactNode;
}

const ScrollableContent: React.FC<ScrollableContentProps> = ({ children }) => (
  <Box
    sx={{
      display: "flex",
      flexFlow: "column",
      overflowY: "auto",
      height: "100%",
      flex: 1,
      minHeight: 0,
      padding: "10px",
      paddingBottom: "120px", // Space for fixed input
      gap: "10px",
    }}
  >
    {children}
  </Box>
);

export default ScrollableContent;
