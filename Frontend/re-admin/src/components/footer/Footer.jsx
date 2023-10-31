import React from "react";
import Container from "@mui/material/Container";
import Box from '@mui/material/Box';
const Footer = () => {
  return (
    <div style={{padding: '20px', backgroundColor: 'lightgray', marginTop: '30px'}}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>@2023 TuNT.All rights served.</span>
          <span>
            <i style={{marginRight: '10px'}} className="fa-brands fa-youtube"></i>
            <i style={{marginRight: '10px'}} className="fa-brands fa-facebook"></i>
            <i style={{marginRight: '10px'}} className="fa-brands fa-instagram"></i>
          </span>
        </Box>
      </Container>
    </div>
  );
};

export default Footer;
