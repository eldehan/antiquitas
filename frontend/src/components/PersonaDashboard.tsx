import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Grid, Card, CardActionArea, Container, CircularProgress, Box, useMediaQuery, useTheme } from '@mui/material';
import { getAllPersonas } from '../services/api';

interface Persona {
  _id: string;
  name: string;
  description: string;
  avatarUrl: string;
  birthDate: string;
  deathDate: string;
}

const PersonaDashboard: React.FC = () => {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();
  const isWideScreen = useMediaQuery(theme.breakpoints.up('lg'));

  useEffect(() => {
    fetchPersonas();
  }, []);

  const fetchPersonas = async () => {
    try {
      const fetchedPersonas = await getAllPersonas();
      const sortedPersonas = fetchedPersonas.sort((a: Persona, b: Persona) =>
        a.name.localeCompare(b.name)
      );
      setPersonas(sortedPersonas);
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
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Typography variant="h1" component="h1" color="primary" gutterBottom sx={{
        mb: 3,
        textAlign: 'center',
      }}>
        Historical Personas
      </Typography>
      <Grid container spacing={4}>
        {personas.map((persona) => (
          <Grid item key={persona._id} xs={12} lg={6}>
            <Card sx={{ bgcolor: 'transparent', boxShadow: 'none', height: '100%' }}>
              <CardActionArea component={Link} to={`/chat/${persona._id}`} sx={{ height: '100%' }}>
                <Box sx={{ position: 'relative', paddingTop: isWideScreen ? '75%' : '56.25%', overflow: 'hidden' }}>
                  <Box
                    component="img"
                    src={persona.avatarUrl}
                    alt={persona.name}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)',
                      color: 'white',
                      padding: { xs: '16px', sm: '20px', md: '24px' },
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Typography variant="h4" component="div" sx={{
                      fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem', lg: '5rem' },
                      lineHeight: 1.2,
                      borderBottom: '2px solid white',
                      pb: 0.5,
                      mb: 1,
                      textShadow: '2px 2px 4px rgba(0,0,0,0.7)'
                    }}>
                      {persona.name}
                    </Typography>
                    <Typography variant="body2" sx={{
                      mb: 2,
                      fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
                      lineHeight: 1.6,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: { xs: 2, sm: 3 },
                      WebkitBoxOrient: 'vertical',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                    }}>
                      {persona.description}
                    </Typography>
                  </Box>
                </Box>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PersonaDashboard;