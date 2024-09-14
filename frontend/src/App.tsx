import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import {
  ThemeProvider, CssBaseline, Button, Box, AppBar, Toolbar, Typography,
  Drawer, IconButton, Menu, MenuItem,
  useScrollTrigger
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomePage from './components/HomePage';
import About from './components/About';
import Contact from './components/Contact';
import Register from './components/Register';
import Login from './components/Login';
import Chat from './components/Chat';
import PersonaDashboard from './components/PersonaDashboard';
import Profile from './components/Profile';
import DrawerContent from './components/DrawerContent';
import { logout, setAuthToken } from './services/api';
import theme from './theme/theme';

const drawerWidth = 240;

// Scroll-aware AppBar
function ElevationScroll(props: { children: React.ReactElement }) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    style: {
      backgroundColor: trigger ? 'rgba(0, 0, 0, 0.7)' : 'transparent',
      transition: 'background-color 0.3s ease',
    },
  });
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex' }}>
          <ElevationScroll>
            <AppBar
              position="absolute"
              sx={{
                zIndex: (theme) => theme.zIndex.drawer - 1,
                backgroundColor: 'transparent',
                boxShadow: 'none',
              }}
            >
              <Toolbar>
                {/* Other AppBar content */}
              </Toolbar>
            </AppBar>
          </ElevationScroll>

          {/* Drawer setup */}
          <Box
            component="nav"
            sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
          >
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiDrawer-paper': {
                  boxSizing: 'border-box',
                  width: drawerWidth,
                  zIndex: (theme) => theme.zIndex.appBar + 1,
                },
              }}
            >
              <DrawerContent handleDrawerToggle={handleDrawerToggle} />
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: 'none', md: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              }}
              open
            >
              <DrawerContent handleDrawerToggle={handleDrawerToggle} />
            </Drawer>
          </Box>

          {/* Burger button */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              position: 'fixed',
              zIndex: (theme) => theme.zIndex.drawer + 1,
              top: '16px',
              left: '16px',
              display: { md: 'none' },
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* Title */}
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{
              position: 'fixed',
              zIndex: (theme) => theme.zIndex.drawer + 1,
              top: '12px',
              left: '48px',
              display: { xs: 'none', sm: 'block' },
              fontFamily: "'Tulpen One', sans-serif",
            }}
          >
            Antiquitas Interactive
          </Typography>

          {/* Profile Menu */}
          {isAuthenticated ? (
            <>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                sx={{
                  position: 'fixed',
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                  top: '8px',
                  right: '16px',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                }}
              >
                <AccountCircleIcon sx={{ fontSize: '2rem' }} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleProfileMenuClose}
              >
                <MenuItem component={Link} to="/profile" onClick={handleProfileMenuClose}>
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/login"
                sx={{
                  position: 'fixed',
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                  top: '16px',
                  right: '96px',
                }}
              >
                Login
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/register"
                sx={{
                  position: 'fixed',
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                  top: '16px',
                  right: '16px',
                }}
              >
                Register
              </Button>
            </>
          )}

          {/* Main content */}
          <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` } }}
          >
            <Toolbar />
            <Routes>
              <Route path="/" element={<HomePage isAuthenticated={isAuthenticated} />} />
              <Route path="/dashboard" element={<PersonaDashboard />} />
              <Route
                path="/chat/:personaId"
                element={isAuthenticated ? <Chat /> : <Navigate to="/login" />}
              />
              <Route
                path="/register"
                element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />}
              />
              <Route
                path="/login"
                element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />}
              />
              <Route
                path="/profile"
                element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
              />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/topics" element={<div>Topics Page</div>} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
