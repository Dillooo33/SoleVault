import { Box, Container, Typography, Link, Grid } from '@mui/material'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import MailIcon from '@mui/icons-material/Mail'
import PhoneIcon from '@mui/icons-material/Phone'
import Logo from '../assets/bilder/LogoWhite.png'

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: '#000',
                color: '#f3f3f3',
                py: 4,
                marginTop: 10
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Box
                            display="flex"
                            alignItems="center"
                            marginTop={4}
                        >
                            <img
                                src={Logo}
                                alt="Sole Vault Logo"
                                style={{ width: 200, height: 81 }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="body1" marginTop={4}>
                            <strong>Butik adress:</strong>
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ paddingLeft: 2, maxWidth: 220 }}
                        >
                            9 OG Max-Holthausen-Platz 36c, Markhagen, BE 55472
                        </Typography>
                        <Typography variant="body1" marginTop={4}>
                            <strong>Öppettider:</strong>
                        </Typography>
                        <Typography variant="body1" sx={{ paddingLeft: 2 }}>
                            mån-fre: 10-20
                            <br />
                            lör-sön: 10-18
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="body1" marginTop={4}>
                            <strong>Gå med våra sociala medier</strong>
                        </Typography>
                        <Box
                            display="flex"
                            marginTop={1}
                            sx={{ paddingLeft: 2 }}
                        >
                            <Link href="#" color="inherit" marginRight={2}>
                                <InstagramIcon fontSize="large" />
                            </Link>
                            <Link href="#" color="inherit" marginRight={2}>
                                <FacebookIcon fontSize="large" />
                            </Link>
                            <Link href="#" color="inherit">
                                <TwitterIcon fontSize="large" />
                            </Link>
                        </Box>
                        <Typography variant="body1" marginTop={4}>
                            <strong>Contact us:</strong>
                        </Typography>
                        <Box
                            display="flex"
                            alignItems="center"
                            marginTop={1}
                            sx={{ paddingLeft: 2 }}
                        >
                            <MailIcon />
                            <Typography variant="body1" marginLeft={1}>
                                Solevault123@gmail.com
                            </Typography>
                        </Box>
                        <Box
                            display="flex"
                            alignItems="center"
                            marginTop={1}
                            sx={{ paddingLeft: 2 }}
                        >
                            <PhoneIcon />
                            <Typography variant="body1" marginLeft={1}>
                                +46123456789
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default Footer
