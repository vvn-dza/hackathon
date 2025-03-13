import { useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Button,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home,
  FileQuestion,
  FileSpreadsheet,
  FileOutput,
  BarChart3,
  LogOut,
} from 'lucide-react';

const drawerWidth = 240;

const DrawerContent = ({ menuItems, navigate, location }) => (
  <Box sx={{ mt: 2 }}>
    <List>
      {menuItems.map((item) => {
        const isSelected = location.pathname === item.path;
        return (
          <ListItemButton
            key={item.text}
            onClick={() => navigate(item.path)}
            selected={isSelected}
            sx={{
              mb: 1,
              mx: 1,
              borderRadius: 1,
              '&.Mui-selected': {
                backgroundColor: 'primary.main',
                color: 'white',
                '& .MuiListItemIcon-root': {
                  color: 'white',
                },
                '& .MuiListItemText-primary': {  // Ensures text turns white
                  color: 'white',
                },
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 40,
                color: isSelected ? 'white' : 'inherit',
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              primaryTypographyProps={{ color: isSelected ? 'white' : 'inherit' }} // Ensures text turns white
            />
          </ListItemButton>
        );
      })}
    </List>
  </Box>
);


export default function FacultyLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  console.log('FacultyLayout rendered');
  console.log('Current path:', location.pathname);

  const menuItems = [
    { text: 'Dashboard', icon: <Home />, path: '/faculty-dashboard' },
    { text: 'Questions', icon: <FileQuestion />, path: '/faculty-dashboard/questions' },
    // { text: 'Patterns', icon: <FileSpreadsheet />, path: '/faculty-dashboard/patterns' },
    { text: 'Generate Paper', icon: <FileOutput />, path: '/faculty-dashboard/generate' },
    // { text: 'Reports', icon: <BarChart3 />, path: '/faculty-dashboard/reports' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          height: 64, // Increased navbar height
          justifyContent: 'center',
        }}
      >
        <Toolbar sx={{ minHeight: 64, px: 2 }}> {/* Adjusted padding */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontSize: '1.2rem' }}> {/* Adjusted font size */}
            Question Paper Generation System
          </Typography>
          <Button
            color="inherit"
            startIcon={<LogOut />}
            onClick={handleLogout}
            aria-label="logout"
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="navigation drawer"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          <DrawerContent menuItems={menuItems} navigate={navigate} location={location} />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          <DrawerContent menuItems={menuItems} navigate={navigate} location={location} />
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8, // Adjusted to match new navbar size
          display: 'block',
          overflow: 'auto',
          zIndex: 1,
        }}
      >
        <Outlet /> {/* Render nested routes here */}
      </Box>
    </Box>
  );
}