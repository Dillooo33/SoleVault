import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import SneakerIcon from '@mui/icons-material/Category'; // Assuming this as a sneaker icon for illustration

const AboutPage: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Box textAlign="center" mb={4}>
        <SneakerIcon sx={{ fontSize: 40, color: '#57C7E5' }} />
        <Typography variant="h4" gutterBottom>
          Om Oss
        </Typography>
      </Box>

      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="body1" gutterBottom sx={{ mb: 4, fontSize: '1.1rem' }}>
          Välkommen till SoleVault! Vi är två sneaker-fantaster som älskar allt som har med skor att göra. Vår passion för sneakers drev oss att skapa SoleVault, en plats där vi kan dela vår kärlek för skönhet och stil med världen.
        </Typography>

        <Typography variant="body1" gutterBottom sx={{ mb: 4, fontSize: '1.1rem' }}>
          Hos oss hittar du de senaste trenderna, klassiska modeller och unika fynd som inte finns någon annanstans. Vi brinner för kvalitet och autenticitet, och vi strävar alltid efter att ge dig den bästa upplevelsen när du handlar hos oss.
        </Typography>

        <Typography variant="body1" sx={{ mb: 4, fontSize: '1.1rem' }}>
          Tack för att du besöker SoleVault. Hoppas du hittar något som du älskar lika mycket som vi gör!
        </Typography>
      </Box>

      <Box marginTop={6} textAlign={'center'}>
        <Typography>✔ 30 dagars öppet köp</Typography>
        <Typography>✔ Fri frakt på order över 899:-</Typography>
      </Box>
    </Container>
  );
};

export default AboutPage;
