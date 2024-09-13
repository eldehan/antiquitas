import React, { useState } from 'react';
import {
  Typography,
  Container,
  Paper,
  TextField,
  Button,
  Grid,
  Snackbar,
  Alert,
  Box
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import FeedbackIcon from '@mui/icons-material/Feedback';
import BrushIcon from '@mui/icons-material/Brush';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', { name, email, message });
    setOpenSnackbar(true);
    // Reset form
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Contact Us
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <EmailIcon sx={{ mr: 1 }} /> Get in Touch
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                margin="normal"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                fullWidth
                label="Message"
                variant="outlined"
                margin="normal"
                required
                multiline
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 2 }}
              >
                Send Message
              </Button>
            </form>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <FeedbackIcon sx={{ mr: 1 }} /> Feedback
            </Typography>
            <Typography variant="body1" paragraph>
              I value your input! If you have any suggestions, comments, or ideas on how I can improve Antiquitas Interactive, please don't hesitate to share them. Your feedback is crucial in helping enhance the user experience and the historical accuracy of the platform.
            </Typography>

            <Typography variant="h4" gutterBottom sx={{ mt: 4, display: 'flex', alignItems: 'center' }}>
              <BrushIcon sx={{ mr: 1 }} /> Call for Artists
            </Typography>
            <Typography variant="body1" paragraph>
              Are you an artist passionate about history? I'm looking for talented individuals to help bring the ancient world to life through authentic, historically accurate artwork. If you're interested in contributing your skills to Antiquitas Interactive, please reach out with examples of your work.
            </Typography>
            <Typography variant="body1">
              I'm particularly interested in:
            </Typography>
            <Box component="ul" sx={{ pl: 4 }}>
              <Typography component="li" variant="body1">Portraits of historical figures</Typography>
              <Typography component="li" variant="body1">Scenes from ancient daily life</Typography>
              <Typography component="li" variant="body1">Depictions of historical events</Typography>
              <Typography component="li" variant="body1">Architectural reconstructions</Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          Thank you for your message. I'll get back to you soon!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Contact;