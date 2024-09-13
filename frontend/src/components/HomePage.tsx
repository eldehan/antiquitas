import React, { useEffect, useState } from 'react';
import { Typography, Button, IconButton, Grid, Card, Box, Container, useTheme, useMediaQuery, Fade } from '@mui/material';
import { Link } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';

interface HomePageProps {
  isAuthenticated: boolean;
}

const featureSections = [
  {
    title: "Chat with Historical Figures",
    description: "Engage in conversations with famous personalities from antiquity.",
    longDescription: "Our AI-powered historical figures offer unique insights and perspectives on their lives and times. Dive deep into history through interactive dialogues with notable individuals from various of the ancient world.",
    image: "https://storage.googleapis.com/antiquitas-interactive-images/conversation 2.jpg",
  },
  {
    title: "Powered by AI",
    description: "Experience intelligent responses crafted by advanced AI technology.",
    longDescription: "Our system combines historical accuracy with cutting-edge natural language processing for an immersive experience. The AI adapts to your queries, providing contextually relevant and engaging responses.",
    image: "https://storage.googleapis.com/antiquitas-interactive-images/AI.jpg",
  },
  {
    title: "Learn History Interactively",
    description: "Gain insights into historical events and perspectives through dialogue.",
    longDescription: "Explore different eras, cultures, and significant moments in history through engaging conversations. Our platform turns passive learning into an active, personalized journey through time.",
    image: "https://storage.googleapis.com/antiquitas-interactive-images/battle 2.jpg",
  },
];

const HomePage: React.FC<HomePageProps> = ({ isAuthenticated }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [scrolled, setScrolled] = useState(false);
  const [activeModal, setActiveModal] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const handleLearnMore = (index: number) => {
    setActiveModal(index);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      <Container maxWidth={false} disableGutters>
        {/* Hero Section */}
        <Box sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundImage: 'url(https://storage.googleapis.com/antiquitas-interactive-images/The%20School%20of%20Athens.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}>
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          }} />
          <Box sx={{ zIndex: 1, textAlign: 'center', p: 2 }}>
            <Typography variant="h1" component="h1" gutterBottom color="primary" sx={{
              mb: 1,
              textShadow: '2px 2px 4px rgba(0,0,0,0.4)',
            }}>
              Welcome to Antiquitas Interactive
            </Typography>
            <Typography variant="h4" color="common.white" paragraph sx={{
              mb: 4,
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            }}>
              Step into the past and converse with history's most fascinating figures!
            </Typography>
            <Button
              component={Link}
              to={isAuthenticated ? "/dashboard" : "/login"}
              variant="contained"
              size="large"
              sx={{
                fontSize: '1.2rem',
                py: 1.5,
                px: 4,
                borderRadius: 2,
                boxShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              {isAuthenticated ? "Go to Dashboard" : "Get Started"}
            </Button>
          </Box>
          <Fade in={!scrolled} timeout={300}>
            <Box
              sx={{
                position: 'absolute',
                bottom: 100,
                left: '50%',
                transform: 'translateX(-50%)',
                textAlign: 'center',
                color: 'common.white',
                zIndex: 1,
              }}
            >
              <Typography variant="body2" sx={{ mb: 1, textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>Scroll to explore</Typography>
              <KeyboardArrowDownIcon sx={{ fontSize: 40, animation: 'bounce 2s infinite' }} />
            </Box>
          </Fade>
        </Box>

        {/* Feature Sections */}
        {featureSections.map((section, index) => (
          <React.Fragment key={index}>
            {/* Main Feature Section */}
            <Box sx={{
              minHeight: '100vh',
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <Box
                component="img"
                src={section.image}
                alt={section.title}
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
                  width: '100%',
                  height: '100%',
                  bgcolor: 'rgba(0, 0, 0, 0.25)',
                  transition: 'background-color 0.3s ease',
                  ...(activeModal === index && {
                    bgcolor: 'rgba(0, 0, 0, 0.8)',
                  }),
                }}
              />
              <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <Box sx={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : (index % 2 === 0 ? 'row' : 'row-reverse'),
                  alignItems: 'center',
                  gap: 4,
                }}>
                  <Box sx={{ flex: 1, textAlign: isMobile ? 'center' : 'left' }}>
                    <Typography variant="h2" component="h2" gutterBottom color="white" sx={{
                      mb: 0,
                      textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                    }}>
                      {section.title}
                    </Typography>
                    <Typography variant="body1" color="common.white" sx={{
                      fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' },
                      mb: 4,
                      textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                    }}>
                      {activeModal === index ? section.longDescription : section.description}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={() => handleLearnMore(index)}
                      sx={{
                        boxShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                        ...(activeModal === index && { display: 'none' }),
                      }}
                    >
                      Learn More
                    </Button>
                    {activeModal === index && (
                      <IconButton
                        onClick={handleCloseModal}
                        sx={{ color: 'common.white', position: 'absolute', top: 16, right: 16 }}
                      >
                        <CloseIcon />
                      </IconButton>
                    )}
                  </Box>
                  <Box sx={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    {/* add an illustrative element here, like an icon or a small image */}
                  </Box>
                </Box>
              </Container>
            </Box>
          </React.Fragment>
        ))}

        {/* Final CTA Section */}
        <Box sx={{
          minHeight: '50vh',
          display: 'flex',
          alignItems: 'center',
          bgcolor: theme.palette.background.paper,
          position: 'relative',
        }}>
          <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
            <Typography variant="h2" component="h2" gutterBottom color="primary" sx={{
              mb: 4,
              fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
            }}>
              Ready to Start Your Historical Journey?
            </Typography>
            <Button
              component={Link}
              to={isAuthenticated ? "/dashboard" : "/login"}
              variant="contained"
              size="large"
              sx={{
                fontSize: '1.2rem',
                py: 1.5,
                px: 4,
                borderRadius: 2,
              }}
            >
              {isAuthenticated ? "Go to Dashboard" : "Get Started Now"}
            </Button>
          </Container>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;