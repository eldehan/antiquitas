import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Grid, Card, CardContent, CardMedia, CardActionArea, Container, CircularProgress } from '@mui/material';
import { getAllPersonas } from '../services/api';

interface Persona {
  _id: string;
  name: string;
  description: string;
  avatarUrl: string;
}

const PersonaDashboard: React.FC = () => {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPersonas();
  }, []);

  const fetchPersonas = async () => {
    try {
      const fetchedPersonas = await getAllPersonas();
      setPersonas(fetchedPersonas);
    } catch (error) {
      console.error('Error fetching personas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h2" gutterBottom sx={{ color: 'primary.main', mb: 4 }}>
        Choose a Historical Persona to Chat With
      </Typography>
      <Grid container spacing={4}>
        {personas.map((persona) => (
          <Grid item key={persona._id} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardActionArea component={Link} to={`/chat/${persona._id}`}>
                <CardMedia
                  component="img"
                  height="140"
                  image={persona.avatarUrl}
                  alt={persona.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {persona.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {persona.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PersonaDashboard;