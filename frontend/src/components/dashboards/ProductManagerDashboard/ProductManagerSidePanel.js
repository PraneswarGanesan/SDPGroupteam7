// src/components/dashboards/ProductManagerDashboard/ProductManagerSidePanel.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Home, Assignment, Schedule, Create } from '@mui/icons-material';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';

const ProductManagerSidePanel = () => {
  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
        <ListItem button component={Link} to="/home">
          <ListItemIcon><Home /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/product-manager-dashboard">
          <ListItemIcon><AutoAwesomeMosaicIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/product-manager-dashboard/assign-employees">
          <ListItemIcon><Assignment /></ListItemIcon>
          <ListItemText primary="Assign Employees" />
        </ListItem>
        <ListItem button component={Link} to="/product-manager-dashboard/view-team-lead-schedule">
          <ListItemIcon><Schedule /></ListItemIcon>
          <ListItemText primary="View Team Lead Schedule" />
        </ListItem>
        <ListItem button component={Link} to="/product-manager-dashboard/create-projects">
          <ListItemIcon><Create /></ListItemIcon>
          <ListItemText primary="Create Projects" />
        </ListItem>
      </List>
      <Divider />
    </Drawer>
  );
};

export default ProductManagerSidePanel;
