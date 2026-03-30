import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CssBaseline,
} from "@mui/material";
import { Menu as MenuIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UserManagement from "./adminModule/components/userManagement";
import SubjectManagement from "./adminModule/components/SubjectManagement";
import ModuleManagement from "./adminModule/components/ModuleManagement";
import SyllabusUpload from "./adminModule/components/SyllabusUpload";
import AddSubject from "./adminModule/components/AddSubject";
import AddModule from "./adminModule/components/AddModule";
import { addSubject, addModule } from "./adminModule/services/api";

const drawerWidth = 260;

const Adminpanel = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const tabs = [
    { label: "User Management", emoji: "⚙️" },
    { label: "Academic Setup", emoji: "📚" },
    { label: "Initial Data", emoji: "📋" },
  ];

  const handleAddSubject = async (subjectData) => {
    try {
      await addSubject(subjectData);
      alert("Subject added successfully!");
    } catch (error) {
      alert("Failed to add subject: " + error.message);
    }
  };

  const handleAddModule = async (moduleData) => {
    try {
      await addModule(moduleData);
      alert("Module added successfully!");
    } catch (error) {
      alert("Failed to add module: " + error.message);
    }
  };

  const SidebarContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: '12px', mb: '4px', height: '44px', display: 'flex', alignItems: 'center', mx: '8px', mt: '4px', borderRadius: '8px', '&:hover': { backgroundColor: '#EFEFEF' }, cursor: 'pointer' }}>
        <Box sx={{ width: 28, height: 28, backgroundColor: '#F7F6F3', border: '1px solid #E9E9E7', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', mr: '10px' }}>
          ⚙️
        </Box>
        <Typography sx={{ fontSize: '14px', fontWeight: 500, color: '#37352F' }}>
          Admin Workspace
        </Typography>
      </Box>

      <Box sx={{ height: '1px', backgroundColor: '#E9E9E7', mb: '4px' }} />

      <Typography sx={{ fontSize: '11px', fontWeight: 500, color: '#9B9A97', textTransform: 'uppercase', letterSpacing: '0.8px', px: '16px', mb: '4px', mt: 2 }}>
        SYSTEM CONTROLS
      </Typography>

      <List sx={{ px: '6px' }}>
        {tabs.map((tab, index) => (
          <ListItemButton
            key={tab.label}
            onClick={() => setActiveTab(index)}
            sx={{
              height: '30px',
              px: '12px',
              borderRadius: '6px',
              mb: '1px',
              transition: '0.1s ease',
              backgroundColor: activeTab === index ? '#EFEFEF' : 'transparent',
              '&:hover': { backgroundColor: '#EFEFEF' },
            }}
          >
            <ListItemIcon sx={{ minWidth: '24px', fontSize: '16px', mr: '4px' }}>
              {tab.emoji}
            </ListItemIcon>
            <ListItemText
              primary={tab.label}
              primaryTypographyProps={{
                fontSize: '14px',
                fontWeight: activeTab === index ? 500 : 400,
                color: '#37352F',
              }}
            />
          </ListItemButton>
        ))}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ p: '12px', borderTop: '1px solid #E9E9E7' }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{ height: '30px', px: '12px', borderRadius: '6px', '&:hover': { backgroundColor: '#EFEFEF' } }}
        >
          <ListItemIcon sx={{ minWidth: '24px', fontSize: '16px', mr: '4px' }}>
            🚪
          </ListItemIcon>
          <ListItemText primary="Logout" primaryTypographyProps={{ fontSize: '14px', color: '#37352F' }} />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F7F6F3' }}>
      <CssBaseline />
      
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
          <Typography sx={{ fontSize: '14px', color: '#9B9A97' }}>
            QPGS / Admin Panel / {tabs[activeTab].label}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: '1px solid #E9E9E7', boxShadow: 'none' },
          }}
        >
          {SidebarContent}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: '1px solid #E9E9E7', boxShadow: 'none' },
          }}
          open
        >
          {SidebarContent}
        </Drawer>
      </Box>

      {/* Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: '40px 60px',
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: '44px',
          minHeight: 'calc(100vh - 44px)',
        }}
      >
        {/* Page title area */}
        <Box sx={{ mb: 4 }}>
          <Typography sx={{ fontSize: '48px', mb: 1 }}>⚙️</Typography>
          <Typography variant="h1" sx={{ mb: 1 }}>Admin Control Panel</Typography>
          <Typography variant="body1" sx={{ color: '#9B9A97' }}>Configure users, subjects, and manage college-wide settings.</Typography>
        </Box>

        {/* Custom Tabs */}
        <Box sx={{ display: 'flex', gap: '4px', borderBottom: '1px solid #E9E9E7', mb: 3 }}>
          {tabs.map((tab, index) => (
            <Box
              key={tab.label}
              onClick={() => setActiveTab(index)}
              sx={{
                padding: '6px 12px',
                cursor: 'pointer',
                fontSize: '14px',
                color: activeTab === index ? '#37352F' : '#9B9A97',
                fontWeight: activeTab === index ? 500 : 400,
                borderBottom: activeTab === index ? '2px solid #37352F' : '2px solid transparent',
                borderRadius: '6px 6px 0 0',
                transition: '0.15s ease',
                '&:hover': { color: '#37352F', backgroundColor: '#EFEFEF' },
              }}
            >
              {tab.label}
            </Box>
          ))}
        </Box>

        {/* View Areas */}
        <Box>
          {activeTab === 0 && <UserManagement />}
          {activeTab === 1 && (
            <Box>
               <Typography variant="h6" sx={{ mb: 2 }}>Resource Management</Typography>
               <AddSubject onAddSubject={handleAddSubject} />
               <Box sx={{ height: '32px' }} />
               <SubjectManagement />
               <Box sx={{ height: '32px' }} />
               <AddModule onAddModule={handleAddModule} />
               <Box sx={{ height: '12px' }} />
               <ModuleManagement />
            </Box>
          )}
          {activeTab === 2 && <SyllabusUpload />}
        </Box>
      </Box>
    </Box>
  );
};

export default Adminpanel;