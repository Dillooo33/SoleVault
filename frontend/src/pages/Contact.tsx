import React from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ContactPage: React.FC = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Kontakt
      </Typography>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { mb: 2 },
          display: 'flex',
          flexDirection: 'column',
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          required
          id="name"
          label="Namn"
          variant="outlined"
          fullWidth
          sx={{ borderRadius: '8px' }}
        />
        <TextField
          required
          id="email"
          label="E-postadress"
          variant="outlined"
          type="email"
          fullWidth
          sx={{ borderRadius: '8px' }}
        />
        <TextField
          required
          id="subject"
          label="Ämne"
          variant="outlined"
          fullWidth
          sx={{ borderRadius: '8px' }}
        />
        <TextField
          required
          id="message"
          label="Meddelande"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          sx={{ borderRadius: '8px' }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            borderRadius: '50px',
            paddingX: 4,
            paddingY: 1.5,
            backgroundColor: '#57C7E5',
            fontSize: '1rem',
            color: 'black',
            textTransform: 'none',
            mt: 2,
          }}
          endIcon={<SendIcon />}
        >
          Skicka
        </Button>
      </Box>
      <Box marginTop={6} textAlign={'center'}>
        <Typography>✔ 30 dagars öppet köp</Typography>
        <Typography>✔ Fri frakt på order över 899:-</Typography>
      </Box>
    </Container>
  );
};

export default ContactPage;
