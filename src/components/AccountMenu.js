import React, { useEffect, useRef, useState } from "react";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Link } from "react-router-dom";
import Person2Icon from '@mui/icons-material/Person2';
import { auth, db } from '../firebaseSrc/firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getDoc, doc } from "firebase/firestore";
import isAdmin from '../Database/isAdmin';


export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleAdmin = () => {
    alert("FOCUS VISIBLE");
  };
  const [user, loading, error] = useAuthState(auth);
  let userMail = user?.email;
  
  const handleClick = (event) => {
    let admin = isAdmin(userMail);
    setAnchorEl(event.currentTarget);
    
    if (userMail != "undefined") {
      Promise.resolve(admin).then(value=>{
          if (String(value) == "true") {
            const admin = document.querySelector(".adminLink");
            admin.style.display = "block";
          }
        });
    } 

  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    //visible usericon
    //After box is closed, the dropdown-code starts
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>  
        <Tooltip title="Meny">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32,   backgroundColor: 'grey', backgroundopacity: 0.2}}></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,              
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Link to="/LoginPage" id = "link" style = {{textDecoration:"none", color:"black"}}>
        <MenuItem onClick={handleClose}>
        <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon> Logg inn
        </MenuItem>
        </Link>
        <Divider />
        <Link to="/AdminPage" id = "link" className="adminLink" style = {{display: "none", textDecoration:"none", color:"black"}}>
        <MenuItem onClick={handleClose}>
          <AdminPanelSettingsIcon/>
          Admin
        </MenuItem> 
        </Link>
        <Link to="/MyPage" id = "link" style = {{textDecoration:"none", color:"black"}}>
        <MenuItem onClick={handleClose}>
          <Person2Icon/>
          Min Side
        </MenuItem> 
        </Link>
      </Menu>
    </React.Fragment>
  );
}