import React, { useEffect, useState } from 'react'
import { Box, Grid, Typography, Card } from "@mui/material";
import mail from '../../assets/images/mail.svg';
import info from '../../assets/images/info.svg';
import camera from '../../assets/images/camera.svg';
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import { fetchById } from "../../service/api";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { companyDetailsData } from '../../constants/companyDetailsData';

const CompanyDetail = ({ selectedRowId, setSelectedRowId }) => {
    const [companyDetail, setCompanyDetail] = useState({})

    const fetchDataById = async () => {
        try {
            const result = await fetchById(selectedRowId);
            setCompanyDetail(result.data);
        } catch (error) {
            console.log("Error fetching data");
        } finally {
            console.log("Error");
        }
    };

    useEffect(() => {
        fetchDataById()
    }, [selectedRowId])
    return (
        <>
            <Box variant="body2" color="text.secondary" sx={{ cursor: "pointer", my: 2, display: 'flex', gap: '16px', color: '#374151', fontWeight: '500' }} onClick={() => setSelectedRowId(null)}> Home <KeyboardArrowRightIcon color="#9CA3AF" /> {companyDetail.name}</Box>

            <Card sx={{ p: { xs: '16px', sm: '24px', md: '30px' }, m: 'auto', boxShadow: 2, borderRadius: '6px', mt: { xs: 1, md: 2 }, display: { xs: 'block', md: 'flex' }, gap: { xs: '16px', md: '30px' }, flexDirection: { xs: 'column', md: 'row' }, }}>
                {/* Logo */}
                <Box component="img" src={companyDetail?.logoUrl} alt="Netflix Logo" sx={{ width: { xs: '100%', md: '150px' }, height: 'auto', marginBottom: { xs: '16px', md: '0' }, }} />

                <Grid container alignItems="flex-end" spacing={2}>

                    {/* Description */}
                    <Grid item xs={12} md={5}>
                        <Typography variant="h5" fontWeight="bold" color="#374151" marginBottom={1} sx={{ fontSize: { xs: '18px', md: '24px' } }}>
                            {companyDetail?.name}
                        </Typography>
                        <Box>
                            <Box display="flex" alignItems="center" gap={1} marginBottom={1}>
                                <Box component="img" src={info} alt="Info Icon" />
                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '14px', md: '16px' }, }}>Description</Typography>
                            </Box>
                            <Typography variant="body2" sx={{ fontSize: { xs: '14px', md: '16px' }, lineHeight: '24px', }}>{companyDetail?.description}</Typography>
                        </Box>
                    </Grid>

                    {/* Divider */}
                    <Box borderRight={1} borderColor="#ECECEC" height="100px" mx={5} sx={{ display: { xs: 'none', md: 'flex' }, }} />

                    {/* Contact Information */}
                    <Grid item xs={12} md={5}>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" color="#64748B" display="flex" alignItems="center" gap={1} fontWeight={600} sx={{ fontSize: { xs: '14px', md: '16px' }, }}> <PhoneInTalkOutlinedIcon />
                                <span style={{ lineHeight: '24px' }}>Phone</span>
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: { xs: '14px', md: '16px' }, }}>{companyDetail?.phoneNumber}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="body2" color="#64748B" display="flex" alignItems="center" gap={1} fontWeight={600} sx={{ fontSize: { xs: '14px', md: '16px' }, }}><Box component="img" src={mail} alt="Mail Icon" />
                                <span style={{ lineHeight: '24px' }}>Email</span>
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: { xs: '14px', md: '16px' }, }}> {companyDetail?.email}</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Card>

            <Grid container spacing={2} justifyContent="center" sx={{ padding: { xs: "10px 0", md: "19px 0" } }}>
                {/* Left Section: Company Details */}
                <Grid item xs={12} md={4}>
                    <Card sx={{ padding: '20px', borderRadius: "12px", boxShadow: 4 }}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom> Company Details</Typography>

                        {/* Dynamic Content */}
                        {companyDetailsData(companyDetail).map((item, index) => (
                            <Box key={index} sx={{ marginBottom: '20px' }}>
                                <Box sx={{ display: 'flex' }}>
                                    <Typography variant="body2" color="#64748B" display="flex" alignItems="center" gap={1} fontWeight={600}>
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
                    <Card sx={{ padding: '20px', borderRadius: "12px", boxShadow: 4, display: "flex", alignItems: "center", flexDirection: 'column' }}>
                        {/* Screenshot Label */}
                        <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'start', width: '100%', marginBottom: '10px' }}>
                            <Typography variant="body2" color="#64748B" display="flex" alignItems="center" gap={1} fontWeight={600}>
                                <Box component='img' src={camera} />
                                <span style={{ lineHeight: '24px' }}>Screenshot of Webpage</span>
                            </Typography>
                        </Box>

                        {/* Screenshot Image */}
                        <Box component="img" src={companyDetail?.backgroundUrl} alt="Screenshot" sx={{ width: "100%", height: "auto", borderRadius: "8px", boxShadow: 1 }} />
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}

export default CompanyDetail
