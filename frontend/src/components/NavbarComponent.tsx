import React, { useState, useEffect } from 'react'
import {
    AppBar,
    Toolbar,
    IconButton,
    InputBase,
    styled,
    alpha,
    Box,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Divider,
    Paper,
    MenuItem,
    Badge,
    Button // Import Button
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Link, useNavigate } from 'react-router-dom' // Import useNavigate
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import axios from 'axios'
import Logo from '../assets/bilder/Logo.png'

interface Shoe {
    id: number
    name: string
    price: number
    rating: number
    image: string
    featured: boolean
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
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}))

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
}))

const StyledLink = styled(Link)({
    textDecoration: 'none',
    color: 'inherit',
    display: 'block'
})

const Header: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [searchInput, setSearchInput] = useState('')
    const [searchResults, setSearchResults] = useState<Shoe[]>([])
    const [cartCount, setCartCount] = useState(0)
    const navigate = useNavigate() 

    useEffect(() => {
        const fetchCartCount = async () => {
            try {
                const response = await axios.get('http://localhost:8080/cart/count')
                setCartCount(response.data.count)
            } catch (error) {
                console.error('Error fetching cart count:', error)
            }
        }
        fetchCartCount()
    }, [cartCount])

    const handleDrawerOpen = () => {
        setDrawerOpen(true)
    }

    const handleDrawerClose = () => {
        setDrawerOpen(false)
    }

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value)
    }

    useEffect(() => {
        if (searchInput.trim() !== '') {
            axios
                .get(`http://localhost:8080/api/shoes?name=${searchInput}&order=name`)
                .then((response) => setSearchResults(response.data))
                .catch((error) => console.error('Error fetching search results:', error))
        } else {
            setSearchResults([])
        }
    }, [searchInput])

    const handleShowAllResults = () => {
        navigate(`/search?query=${searchInput}`)
        setSearchInput('')
    }

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
                    <Link to={'/'}>
                        <Box display="flex" alignItems="center">
                            <img src={Logo} alt="SoleVault" style={{ height: '50px' }} />
                        </Box>
                    </Link>
                    <Box display="flex">
                        <IconButton
                            color="inherit"
                            sx={{
                                width: '44px',
                                height: '44px',
                                lineHeight: '1rem'
                            }}
                        >
                            <Link to={'/cart'}>
                                <Badge badgeContent={cartCount} color="error">
                                    <ShoppingCartIcon sx={{ fontSize: '25px', color: 'black' }} />
                                </Badge>
                            </Link>
                        </IconButton>
                        <IconButton
                            sx={{
                                width: '44px',
                                height: '44px',
                                lineHeight: '1rem'
                            }}
                            color="inherit"
                            onClick={drawerOpen ? handleDrawerClose : handleDrawerOpen}
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
                                {searchResults.map((shoe) => (
                                    <Link
                                        key={shoe.id}
                                        to={`/shoe/${shoe.id}`}
                                        onClick={() => setSearchInput('')}
                                        style={{
                                            textDecoration: 'none',
                                            color: 'inherit'
                                        }}
                                    >
                                        <MenuItem>
                                            <Box display="flex" alignItems="center" width="100%">
                                                <img src={shoe.image} width={40} alt={shoe.name} />
                                                <Box ml={2} flexGrow={1}>
                                                    {shoe.name}
                                                </Box>
                                                <Box>
                                                    <ArrowForwardIosIcon />
                                                </Box>
                                            </Box>
                                        </MenuItem>
                                        <Divider />
                                    </Link>
                                ))}
                                <Button fullWidth onClick={handleShowAllResults}>
                                    Visa alla resultat ({searchResults.length})
                                </Button>
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
                        <StyledLink to={'/'}>
                            <ListItem button>
                                <ListItemText primary="Hem" />
                            </ListItem>
                        </StyledLink>
                        <Divider />
                        <StyledLink to={'/shoes'}>
                            <ListItem button>
                                <ListItemText primary="Butik" />
                            </ListItem>
                        </StyledLink>
                        <Divider />
                        <StyledLink to={'/about'}>
                            <ListItem button>
                                <ListItemText primary="Om Oss" />
                            </ListItem>
                        </StyledLink>
                        <Divider />
                        <StyledLink to={'/contact'}>
                            <ListItem button>
                                <ListItemText primary="Kontakta Oss" />
                            </ListItem>
                        </StyledLink>
                        <Divider />
                        <StyledLink to={'/login'}>
                            <ListItem button>
                                <ListItemText primary="Logga in" />
                            </ListItem>
                        </StyledLink>
                        <Divider />
                    </List>
                </Box>
            </Drawer>
        </>
    )
}

export default Header
