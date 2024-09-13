import { Box, IconButton, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';

const menuItems = [
  { number: '01', text: 'home', path: '/' },
  { number: '02', text: 'personas', path: '/dashboard' },
  { number: '03', text: 'about', path: '/about' },
  { number: '04', text: 'contact', path: '/contact' },
  { number: '05', text: 'topics', path: '/topics', isNew: true },
];

function DrawerContent({ handleDrawerToggle }: { handleDrawerToggle: () => void }) {
  const location = useLocation();

  return (
    <Box sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: 'rgba(0, 0, 0, 0.9)',
      color: 'white',
    }}>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItemButton
              key={index}
              component={Link}
              to={item.path}
              sx={{
                py: 2,
                position: 'relative',
                '&::before': isActive ? {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '4px',
                  height: '50%',
                  backgroundColor: 'primary.main',
                } : {},
              }}
            >
              <ListItemText
                primary={
                  <Typography variant="h2" sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: isActive ? 'primary.main' : 'inherit',
                  }}>
                    <span style={{ fontSize: '0.8rem', marginRight: '1rem', color: '#bf9f45' }}>{item.number}</span>
                    {item.text}
                    {item.isNew && (
                      <span style={{
                        marginLeft: '0.5rem',
                        fontSize: '0.6rem',
                        backgroundColor: '#ff4444',
                        color: 'white',
                        padding: '2px 4px',
                        borderRadius: '2px'
                      }}>
                        NEW
                      </span>
                    )}
                  </Typography>
                }
              />
            </ListItemButton>
          );
        })}
      </List>
      <Box sx={{ p: 2, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>FOLLOW HISTORY</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FacebookIcon />
          <InstagramIcon />
          <YouTubeIcon />
          <TwitterIcon />
        </Box>
      </Box>
    </Box>
  );
}

export default DrawerContent;
