import React, { useEffect, useState } from 'react'
import {
    Box,
    Grid,
    Typography,
    Card,
    CardContent,
    CardMedia,
    TextField,
    Button,
    Divider,
    ListItem,
    ListItemIcon,
    Link,
    List,
    ListItemText,
    Paper,
    InputAdornment
} from "@mui/material";
import netflix from '../../src/images/netflix.png';
import mail from '../../src/images/mail.svg';
import Vector from '../../src/images/Vector.svg';
import info from '../../src/images/info.svg';
import webImage from '../../src/images/webImage.svg';
import facebookIcon from '../../src/images/facebookIcon.svg';
import instagram from '../../src/images/instagram.svg';
import linkedin from '../../src/images/linkedin.svg';
import locationmarker from '../../src/images/locationmarker.svg';
import twitter from '../../src/images/twitter.svg';
import camera from '../../src/images/camera.svg';
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import { fetchById, getData, postData } from "../api";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';



const CompanyDetail = ({ selectedRowId, setSelectedRowId }) => {
    const [companyDetail, setCompanyDetail] = useState({})

    const fetchDataById = async () => {
        // setLoading(true);
        try {
            const result = await fetchById(selectedRowId);
            setCompanyDetail(result.data);
        } catch (error) {
            console.log("Error fetching data");
        } finally {
            console.log("Error");
        }
    };
    // console.log(companyDetail);


    useEffect(() => {
        fetchDataById()
    }, [selectedRowId])
    return (
        <>
            <Box variant="body2" color="text.secondary" sx={{ cursor: "pointer", my: 2, display: 'flex', gap: '16px', color: '#374151', fontWeight: '500' }} onClick={() => setSelectedRowId(null)}>
                Home <KeyboardArrowRightIcon color="#9CA3AF" /> {companyDetail.name}
            </Box>

            <Card
                sx={{
                    p: { xs: '16px', sm: '24px', md: '30px' }, // Adjust padding for mobile, tablet, and desktop
                    m: 'auto',
                    boxShadow: 2,
                    borderRadius: '6px',
                    mt: { xs: 1, md: 2 }, // Smaller margin-top for mobile, larger for desktop
                    display: { xs: 'block', md: 'flex' }, // Vertical for mobile, horizontal for desktop
                    gap: { xs: '16px', md: '30px' }, // Smaller gap for mobile
                    flexDirection: { xs: 'column', md: 'row' }, // Stacks content vertically on mobile
                }}
            >
                {/* Logo */}
                <Box
                    component="img"
                    src={companyDetail?.logoUrl}
                    alt="Netflix Logo"
                    sx={{
                        width: { xs: '100%', md: '150px' }, // Full width for mobile, fixed size for desktop
                        height: 'auto',
                        marginBottom: { xs: '16px', md: '0' }, // Adds spacing below logo on mobile
                    }}
                />

                <Grid container alignItems="flex-end" spacing={2}>
                    {/* Description */}
                    <Grid item xs={12} md={5}>
                        <Typography
                            variant="h5"
                            fontWeight="bold"
                            color="#374151"
                            marginBottom={1}
                            sx={{
                                fontSize: { xs: '18px', md: '24px' }, // Smaller font size for mobile
                            }}
                        >
                            {companyDetail?.name}
                        </Typography>
                        <Box>
                            <Box display="flex" alignItems="center" gap={1} marginBottom={1}>
                                <Box component="img" src={info} alt="Info Icon" />
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        fontSize: { xs: '14px', md: '16px' }, // Smaller text for mobile
                                    }}
                                >
                                    Description
                                </Typography>
                            </Box>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontSize: { xs: '14px', md: '16px' }, // Smaller text for mobile
                                    lineHeight: '24px',
                                }}
                            >
                                {companyDetail?.description}
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Divider */}
                    <Box
                        borderRight={1}
                        borderColor="#ECECEC"
                        height="100px"
                        mx={5}
                        sx={{
                            display: { xs: 'none', md: 'flex' }, // Hide divider on mobile
                        }}
                    />

                    {/* Contact Information */}
                    <Grid item xs={12} md={5}>
                        <Box sx={{ mb: 2 }}>
                            <Typography
                                variant="body2"
                                color="#64748B"
                                display="flex"
                                alignItems="center"
                                gap={1}
                                fontWeight={600}
                                sx={{
                                    fontSize: { xs: '14px', md: '16px' }, // Smaller font size for mobile
                                }}
                            >
                                <PhoneInTalkOutlinedIcon />
                                <span style={{ lineHeight: '24px' }}>Phone</span>
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontSize: { xs: '14px', md: '16px' }, // Smaller text for mobile
                                }}
                            >
                                {companyDetail?.phoneNumber}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography
                                variant="body2"
                                color="#64748B"
                                display="flex"
                                alignItems="center"
                                gap={1}
                                fontWeight={600}
                                sx={{
                                    fontSize: { xs: '14px', md: '16px' }, // Smaller font size for mobile
                                }}
                            >
                                <Box component="img" src={mail} alt="Mail Icon" />
                                <span style={{ lineHeight: '24px' }}>Email</span>
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontSize: { xs: '14px', md: '16px' }, // Smaller text for mobile
                                }}
                            >
                                {companyDetail?.email}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Card>

            <Grid
                container
                spacing={2}
                justifyContent="center"
                sx={{ padding: { xs: "10px 0", md: "19px 0" } }} // Adjust padding for mobile and desktop
            >
                {/* Left Section: Company Details */}
                <Grid item xs={12} md={4}>
                    <Card sx={{ padding: '20px', borderRadius: "12px", boxShadow: 4 }}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Company Details
                        </Typography>

                        {/* Dynamic Content */}
                        {[
                            {
                                label: "Website",
                                value: companyDetail?.webUrl,
                                icon: Vector
                            },
                            {
                                label: "Description",
                                value: companyDetail?.description,
                                icon: info
                            },
                            {
                                label: "Email",
                                value: companyDetail?.email,
                                icon: locationmarker
                            },
                            {
                                label: "Facebook",
                                value: companyDetail?.facebookUrl,
                                icon: facebookIcon,
                                isLink: true
                            },
                            {
                                label: "Instagram",
                                value: companyDetail?.instagramUrl,
                                icon: instagram,
                                isLink: true
                            },
                            {
                                label: "Twitter",
                                value: companyDetail?.twitterUrl,
                                icon: twitter,
                                isLink: true
                            },
                            {
                                label: "LinkedIn",
                                value: companyDetail?.linkedinUrl,
                                icon: linkedin,
                                isLink: true
                            },
                            {
                                label: "Address",
                                value: companyDetail?.address,
                                icon: locationmarker
                            },
                        ].map((item, index) => (
                            <Box key={index} sx={{ marginBottom: '20px' }}>
                                <Box sx={{ display: 'flex' }}>
                                    <Typography
                                        variant="body2"
                                        color="#64748B"
                                        display="flex"
                                        alignItems="center"
                                        gap={1}
                                        fontWeight={600}
                                    >
                                        <Box component='img' src={item.icon} />
                                        <span style={{ lineHeight: '24px' }}>{item.label}</span>
                                    </Typography>
                                </Box>
                                {item.isLink ? (
                                    <a href={item.value} style={{ color: '#6C2BD9' }}>{item.value}</a>
                                ) : (
                                    <Typography>{item.value}</Typography>
                                )}
                            </Box>
                        ))}
                    </Card>
                </Grid>

                {/* Right Section: Webpage Screenshot */}
                <Grid item xs={12} md={8}>
                    <Card
                        sx={{
                            padding: '20px',
                            borderRadius: "12px",
                            boxShadow: 4,
                            display: "flex",
                            alignItems: "center",
                            flexDirection: 'column',
                        }}
                    >
                        {/* Screenshot Label */}
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'start',
                                alignItems: 'start',
                                width: '100%',
                                marginBottom: '10px'
                            }}
                        >
                            <Typography
                                variant="body2"
                                color="#64748B"
                                display="flex"
                                alignItems="center"
                                gap={1}
                                fontWeight={600}
                            >
                                <Box component='img' src={camera} />
                                <span style={{ lineHeight: '24px' }}>Screenshot of Webpage</span>
                            </Typography>
                        </Box>

                        {/* Screenshot Image */}
                        <Box
                            component="img"
                            src={companyDetail?.backgroundUrl}
                            alt="Screenshot"
                            sx={{
                                width: "100%",
                                height: "auto",
                                borderRadius: "8px",
                                boxShadow: 1,
                            }}
                        />
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}

export default CompanyDetail
