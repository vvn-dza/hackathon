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
      {menuItems.map((item) => (
        <ListItemButton
          key={item.text}
          onClick={() => navigate(item.path)}
          selected={location.pathname === item.path}
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
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 40,
              color: location.pathname === item.path ? 'white' : 'inherit',
            }}
          >
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItemButton>
      ))}
    </List>
  </Box>
);

export default function Layoutm() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

console.log('Layoutm rendered');
console.log('Current path:', location.pathname);

  const menuItems = [
    { text: 'Dashboard', icon: <Home />, path: '/faculty-dashboard' }, // Matches the parent route
    { text: 'Questions', icon: <FileQuestion />, path: '/faculty-dashboard/questions' },
    { text: 'Patterns', icon: <FileSpreadsheet />, path: '/faculty-dashboard/patterns' },
    { text: 'Generate Paper', icon: <FileOutput />, path: '/faculty-dashboard/generate' },
    { text: 'Reports', icon: <BarChart3 />, path: '/faculty-dashboard/reports' },
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
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
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
          mt: 8,
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