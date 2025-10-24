import React from "react";
import { Box } from "@mui/material";

interface ScrollableContentProps {
  children: React.ReactNode;
}

const ScrollableContent: React.FC<ScrollableContentProps> = ({ children }) => (
  <Box
    sx={{
      overflowY: "scroll",
      height: "100%",
      flex: 1,
      minHeight: 0,
    }}
  >
    {children}
  </Box>
);

export default ScrollableContent;
