import React from 'react';
import { Typography, Button, Grid, Card, CardContent, CardMedia, Container } from '@mui/material';
import { Link } from 'react-router-dom';

interface HomePageProps {
  isAuthenticated: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ isAuthenticated }) => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h1" component="h1" gutterBottom align="center" sx={{ color: 'primary.main' }}>
        Welcome to Antiquitas Interactive
      </Typography>
      <Typography variant="h3" align="center" color="text.secondary" paragraph>
        Step into the past and converse with history's most fascinating figures!
      </Typography>
      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image="/path-to-image1.jpg"
              alt="Historical figure"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Chat with Historical Figures
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Engage in conversations with famous personalities from the past.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image="/path-to-image2.jpg"
              alt="AI technology"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Powered by AI
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Experience intelligent responses crafted by advanced AI technology.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image="/path-to-image3.jpg"
              alt="Learning"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Learn History Interactively
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Gain insights into historical events and perspectives through dialogue.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
        <Button
          component={Link}
          to={isAuthenticated ? "/dashboard" : "/login"}
          variant="contained"
          size="large"
          sx={{
            backgroundColor: 'primary.main',
            color: 'background.paper',
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
          }}
        >
          {isAuthenticated ? "Go to Dashboard" : "Get Started"}
        </Button>
      </div>
    </Container>
  );
};

export default HomePage;