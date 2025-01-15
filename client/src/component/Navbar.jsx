import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import { Box } from '@mui/material';
import {AccountCircle, Email, Logout } from '@mui/icons-material';

export default function Navbar() {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const getSessionData = () => {
        const sessionData = localStorage.getItem('user');
        if (sessionData) {
            return JSON.parse(sessionData);
        }
        return null;
    };

    useEffect(() => {
        const currentUser = getSessionData();
        setUser(currentUser);
    }, []); 

    const handleLogout = () => {
        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
        localStorage.removeItem("user");
        console.log("User logged out successfully");
        window.location.href = "/";
    };

    const handleProfile = () => {
        navigate('/profile');
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar  sx={{ backgroundColor: 'white' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box 
                        sx={{ 
                            flexGrow: 1, 
                            display: 'flex', 
                            justifyContent: 'flex-end', 
                            alignItems: 'center',
                            position: 'relative' 
                        }}
                    >
                        {user ? (
                            <>
                               
                                <Avatar 
                                    onClick={handleOpenUserMenu} 
                                    sx={{ cursor: 'pointer' }} 
                                />
                                
                                <Box>
                                    <Menu
                                    anchorEl={anchorElUser}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                  
                                >
                                    <MenuItem sx={{ fontSize: '0.875rem' }} > 
                                        <AccountCircle sx={{ marginRight: 1 }} />
                                        {user.user.username}
                                    </MenuItem>
                                    <MenuItem sx={{ fontSize: '0.875rem' }} >
                                        <Email sx={{ marginRight: 1 }} />
                                        {user.user.email}
                                    </MenuItem>
                                    <MenuItem sx={{ fontSize: '0.875rem' }} onClick={handleLogout}>
                                        <Logout sx={{ marginRight: 1 }} />
                                        Logout
                                    </MenuItem>
                                </Menu>
                                </Box>
                            </>
                        ) : (
                            <LoginIcon 
                                sx={{ cursor: 'pointer' }} 
                                onClick={() => navigate('/signin')} 
                            />
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
