import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box sx={{ 
      height: '3vh',
      backgroundColor: 'primary.main',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Typography variant="body2">
        © {new Date().getFullYear()} Gitchen. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;
