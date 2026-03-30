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

const drawerWidth = 260;

const DrawerContent = ({ menuItems, navigate, location, handleLogout }) => (
  <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    {/* Workspace Header */}
    <Box
      sx={{
        p: '12px',
        mb: '4px',
        height: '44px',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        mx: '8px',
        mt: '4px',
        borderRadius: '8px',
        transition: '0.1s ease',
        '&:hover': { backgroundColor: '#EFEFEF' },
      }}
    >
      <Box
        sx={{
          width: 28,
          height: 28,
          backgroundColor: '#F7F6F3',
          border: '1px solid #E9E9E7',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
          mr: '10px',
        }}
      >
        📋
      </Box>
      <Typography sx={{ fontSize: '14px', fontWeight: 500, color: '#37352F', flexGrow: 1 }}>
        QPGS Workspace
      </Typography>
      <Box sx={{ fontSize: '12px', color: '#9B9A97' }}>▼</Box>
    </Box>

    <Box sx={{ height: '1px', backgroundColor: '#E9E9E7', mb: '4px' }} />

    {/* User Row */}
    <Box
      sx={{
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        px: '12px',
        mx: '6px',
        borderRadius: '6px',
        cursor: 'pointer',
        transition: '0.1s ease',
        '&:hover': { backgroundColor: '#EFEFEF' },
      }}
    >
      <Box
        sx={{
          width: 24,
          height: 24,
          backgroundColor: '#F7F6F3',
          border: '1px solid #E9E9E7',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '11px',
          fontWeight: 500,
          color: '#6B6860',
          mr: '8px',
        }}
      >
        FN
      </Box>
      <Typography sx={{ fontSize: '14px', color: '#37352F' }}>Faculty Name</Typography>
    </Box>

    <Box sx={{ height: '1px', backgroundColor: '#E9E9E7', mt: '4px', mb: '12px' }} />

    <Typography
      sx={{
        fontSize: '11px',
        fontWeight: 500,
        color: '#9B9A97',
        textTransform: 'uppercase',
        letterSpacing: '0.8px',
        px: '16px',
        mb: '4px',
      }}
    >
      MENU
    </Typography>

    <List sx={{ px: '6px', py: 0 }}>
      {menuItems.map((item) => {
        const isSelected = location.pathname === item.path;
        return (
          <ListItemButton
            key={item.text}
            onClick={() => navigate(item.path)}
            sx={{
              height: '30px',
              px: '12px',
              borderRadius: '6px',
              mb: '1px',
              transition: '0.1s ease',
              backgroundColor: isSelected ? '#EFEFEF' : 'transparent',
              '&:hover': { backgroundColor: '#EFEFEF' },
              '&.Mui-selected': { backgroundColor: '#EFEFEF', '&:hover': { backgroundColor: '#EFEFEF' } },
            }}
          >
            <ListItemIcon sx={{ minWidth: '24px', fontSize: '16px', mr: '4px' }}>
              {item.emoji}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                fontSize: '14px',
                fontWeight: isSelected ? 500 : 400,
                color: '#37352F',
              }}
            />
          </ListItemButton>
        );
      })}
    </List>

    <Box sx={{ flexGrow: 1 }} />

    <Box sx={{ p: '12px', borderTop: '1px solid #E9E9E7' }}>
      <ListItemButton
        onClick={handleLogout}
        sx={{
          height: '30px',
          px: '12px',
          borderRadius: '6px',
          transition: '0.1s ease',
          '&:hover': { backgroundColor: '#EFEFEF', '& span': { color: '#E16259' } },
        }}
      >
        <ListItemIcon sx={{ minWidth: '24px', fontSize: '16px', mr: '4px' }}>
          🚪
        </ListItemIcon>
        <ListItemText
          primary="Logout"
          primaryTypographyProps={{
            fontSize: '14px',
            fontWeight: 400,
            color: '#37352F',
            transition: '0.1s ease',
          }}
        />
      </ListItemButton>
    </Box>
  </Box>
);

export default function FacultyLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', emoji: '🏠', path: '/faculty-dashboard' },
    { text: 'Questions', emoji: '❓', path: '/faculty-dashboard/questions' },
    { text: 'Generate Paper', emoji: '📄', path: '/faculty-dashboard/generate' },
  ];

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const getBreadcrumb = () => {
    const path = location.pathname.split('/').filter(Boolean);
    return path.map(p => p.charAt(0).toUpperCase() + p.slice(1).replace(/-/g, ' ')).join(' / ');
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F7F6F3' }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          height: '44px',
          backgroundColor: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid #E9E9E7',
          color: '#37352F',
          justifyContent: 'center',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ minHeight: '44px !important', px: '20px !important' }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon size={20} />
          </IconButton>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
            <Typography sx={{ fontSize: '14px', color: '#9B9A97' }}>
              QPGS / {getBreadcrumb() || 'Dashboard'}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
             <Button 
               size="small" 
               sx={{ 
                 fontSize: '13px', 
                 color: '#6B6860', 
                 textTransform: 'none',
                 '&:hover': { backgroundColor: '#EFEFEF' }
               }}
             >
               Share
             </Button>
             <Box
               sx={{
                 width: 24,
                 height: 24,
                 backgroundColor: '#F7F6F3',
                 border: '1px solid #E9E9E7',
                 borderRadius: '50%',
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center',
                 fontSize: '11px',
                 fontWeight: 500,
                 color: '#6B6860',
               }}
             >
               FN
             </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: '1px solid #E9E9E7',
              boxShadow: 'none',
            },
          }}
        >
          <DrawerContent menuItems={menuItems} navigate={navigate} location={location} handleLogout={handleLogout} />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: '1px solid #E9E9E7',
              boxShadow: 'none',
            },
          }}
          open
        >
          <DrawerContent menuItems={menuItems} navigate={navigate} location={location} handleLogout={handleLogout} />
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: '40px 60px',
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: '44px',
          minHeight: 'calc(100vh - 44px)',
          overflow: 'auto',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}