import React, { useState } from 'react';
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import DashboardIcon from '@mui/icons-material/Dashboard';
import QuizIcon from '@mui/icons-material/Quiz';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PeopleIcon from '@mui/icons-material/People';
import GroupsIcon from '@mui/icons-material/Groups';

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon /> },
  { text: 'Institutes', icon: <AccountBalanceIcon /> },
  { text: 'Teachers', icon: <PeopleIcon /> },
  { text: 'Students', icon: <GroupsIcon /> },
  { text: 'Quizzes', icon: <QuizIcon /> },
];

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(prev => !prev);
  };

  return (
    <>
      {/* Fixed menu button */}
      <IconButton
        onClick={toggleDrawer}
        sx={{
          position: 'fixed',
          top: 16,
          left: 16,
          zIndex: 1301, // higher than Drawer (default is 1200)
          backgroundColor: 'white',
          borderRadius: 1,
          boxShadow: 3,
        }}
      >
        <MenuOutlinedIcon />
      </IconButton>

      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        sx={{
          '& .MuiDrawer-paper': {
           
            width: 240,
            backgroundColor: 'black',
            color: '#fff',
            borderTopLeftRadius: 2,
            borderBottomLeftRadius: 2,
          },
        }}
      >
        <List sx ={{
            mt:8,
        }}>
          {menuItems.map((item, index) => (
            <ListItem button key={index}>
              <ListItemIcon sx={{ color: '#fff' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
