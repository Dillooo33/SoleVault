import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// Importera bilden
import Logo from '../assets/bilder/Logo.png';

interface Shoe {
    id: number;
    name: string;
    price: number;
    rating: number;
    image: string;
    featured: boolean;
  }

// Styled komponent för search
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.05),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.1)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: '100%',
        height: '30px'
    }
}));

// Wrapper för search
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));

// Style för i input fältet
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: '#000000',
    '& .MuiInputBase-input': {
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '20ch'
        }
    }
}));

// React.FC funktions komponent så att det blir typssäkert för typescript
const Header: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    // Hanterar sökfältet
    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    };

    // Kör en fetch baserat på vad som finns i sökfältet
    useEffect(() => {
        if (searchInput.trim() !== '') {
            fetch(`http://localhost:8080/api/shoes?name=${searchInput}`)
                .then(response => response.json())
                .then(data => setSearchResults(data))
                .catch(error => console.error('Error fetching search results:', error));
        } else {
            setSearchResults([]);
        }
    }, [searchInput]);

    return (
        <>
            <AppBar
                position="static"
                color="default"
                sx={{
                    boxShadow: 'none',
                    borderBottom: '1px solid #e0e0e0',
                    zIndex: (theme) => theme.zIndex.drawer + 1
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box display="flex" alignItems="center">
                        <img
                            src={Logo}
                            alt="SoleVault"
                            style={{ height: '50px' }}
                        />
                    </Box>
                    <Box display="flex">
                        <IconButton
                            color="inherit"
                            sx={{
                                width: '44px',
                                height: '44px',
                                marginTop: '1rem'
                            }}
                        >
                            <ShoppingCartIcon sx={{ fontSize: '30px' }} />
                        </IconButton>
                        <IconButton
                            sx={{
                                width: '44px',
                                height: '44px',
                                marginTop: '1rem'
                            }}
                            color="inherit"
                            onClick={
                                drawerOpen
                                    ? handleDrawerClose
                                    : handleDrawerOpen
                            }
                        >
                            {drawerOpen ? (
                                <CloseIcon sx={{ fontSize: '30px' }} />
                            ) : (
                                <MenuIcon sx={{ fontSize: '30px' }} />
                            )}
                        </IconButton>
                    </Box>
                </Toolbar>
                <Toolbar>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Sök…"
                            inputProps={{ 'aria-label': 'search' }}
                            value={searchInput}
                            onChange={handleSearchInputChange}
                        />
                        {searchResults.length > 0 && (
                            <Paper
                                sx={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: 0,
                                    right: 0,
                                    zIndex: 10,
                                    maxHeight: '300px',
                                    overflowY: 'auto'
                                }}
                            >
                                {/* Mapar ut alla skorna som matchar det som finns i sökfältet */}
                                {searchResults.map((shoe: Shoe) => (
                                      <Link key={shoe.id} to={`/shoe/${shoe.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                      <MenuItem>
                                          <Box display="flex" alignItems="center" width="100%">
                                              <img src={shoe.image} width={40} alt={shoe.name} />
                                              <Box ml={2} flexGrow={1}>{shoe.name}</Box>
                                              <Box >{<ArrowForwardIosIcon></ArrowForwardIosIcon>}</Box>
                                          </Box>
                                      </MenuItem>
                                      <Divider />
                                  </Link>
                                ))}
                            </Paper>
                        )}
                    </Search>
                </Toolbar>
            </AppBar>

            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={handleDrawerClose}
                ModalProps={{
                    keepMounted: true
                }}
                PaperProps={{
                    // Så att drawer inte täcker navbaren
                    sx: {
                        width: '100%',
                        height: 'calc(100vh - 64px)',
                        top: '64px'
                    }
                }}
            >
                <Box
                    sx={{ width: '100%', padding: 2, paddingTop: 8 }}
                    role="presentation"
                    onClick={handleDrawerClose}
                    onKeyDown={handleDrawerClose}
                >
                    <List>
                        <ListItem button>
                            <ListItemText primary="Home" />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemText primary="About Us" />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="Shop" />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemText primary="Contact Us" />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemText primary="Login" />
                        </ListItem>
                        <Divider />
                    </List>
                </Box>
            </Drawer>
        </>
    );
};

export default Header;
