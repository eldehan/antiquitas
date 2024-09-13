import React from 'react';
import { Typography, Container, Box, Paper } from '@mui/material';

const About: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          About Antiquitas Interactive
        </Typography>

        <Typography variant="body1" paragraph>
          Antiquitas Interactive emerged from a lifelong fascination with ancient history, particularly the rich tapestry of the ancient Mediterranean world. This project aims to bridge the gap between academic historical study and interactive digital experiences, offering a unique platform for engaging with historical figures and events.
        </Typography>

        <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
          Our Origins
        </Typography>
        <Typography variant="body1" paragraph>
          The seed of this project was planted in childhood, with early exposure to historical strategy games like Age of Empires. These games sparked a passion that led to formal study of ancient Greek history at the university level. Antiquitas Interactive is the culmination of years of academic pursuit and a desire to make historical engagement more accessible and interactive.
        </Typography>

        <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
          Academic Value and Limitations
        </Typography>
        <Typography variant="body1" paragraph>
          While Antiquitas Interactive is not intended as a primary source for academic research, it serves several valuable functions in the realm of historical study:
        </Typography>
        <Box component="ul" sx={{ pl: 4 }}>
          <Typography component="li" variant="body1">
            Engagement: It provides an immersive way to interact with historical concepts, potentially sparking deeper interest in formal historical study.
          </Typography>
          <Typography component="li" variant="body1">
            Perspective: By simulating conversations with historical figures, users can gain new perspectives on historical events and cultural contexts.
          </Typography>
          <Typography component="li" variant="body1">
            Critical Thinking: Users are encouraged to question the responses and compare them with established historical facts, promoting critical analysis of historical information.
          </Typography>
        </Box>

        <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
          Technological Fascination
        </Typography>
        <Typography variant="body1" paragraph>
          The concept of Antiquitas Interactive draws inspiration from science fiction, notably Star Trek's Holodeck. While we're not yet able to create fully immersive physical environments, this project represents a step towards interactive historical simulations. It demonstrates how technology can be leveraged to create engaging educational experiences that blur the lines between learning and entertainment.
        </Typography>

        <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
          Looking Forward
        </Typography>
        <Typography variant="body1" paragraph>
          As I continue to develop Antiquitas Interactive, I remain committed to historical accuracy while exploring the possibilities of interactive technology. My goal is to create a tool that complements traditional historical study, offering a unique way to engage with the past and inspire future historians.
        </Typography>

        <Typography variant="body1" sx={{ mt: 4, fontStyle: 'italic' }}>
          "The past is a foreign country; they do things differently there." - L.P. Hartley
        </Typography>
      </Paper>
    </Container>
  );
};

export default About;