import React, { useEffect, useState } from "react";
import {
    Box,
    Grid,
    TextField,
    Button,
    InputAdornment
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DataTable from "../DataTable";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { getData, postData } from "../api";
import CompanyDetail from "../CompanyDetail/CompanyDetail";

const Home = () => {
    const [data, setData] = useState([]);
    const [domain, setDomain] = useState()
    const [selectedRowId, setSelectedRowId] = useState(null);

    const fetchData = async () => {
        // setLoading(true);
        try {
            const result = await getData();
            setData(result.data);
        } catch (error) {
            console.log("Error fetching data");
        } finally {
            console.log("Error");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const addData = async () => {
        const payload = {
            url: domain
        }
        try {
            const result = await postData(payload);
            setDomain('')
            fetchData()
        } catch (error) {
            console.log("Error adding data");
        }
    };

    return (
        <Box sx={{ p: 3, margin: "0 auto" }}>
            <Grid container spacing={2} alignItems="center" marginBottom={3}>

                <Grid item xs={12} sm={8} md={4}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        name="domain"
                        placeholder="Enter Domain Name"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            borderRadius: '8px',
                            fontSize: { xs: '14px', md: '16px' }, // Adjust font size for mobile and desktop
                            '.MuiOutlinedInput-root': {
                                height: '42px', // Set height for the root element
                                borderRadius: '8px',
                            },
                        }}
                    />
                </Grid>


                <Grid item xs={12} sm={4} md={2}>
                    <Button
                        fullWidth
                        sx={{
                            textTransform: 'capitalize',
                            color: '#6C2BD9',
                            background: '#EDE5FF',
                            fontWeight: '500',
                            padding: { xs: '8px', md: '10px 15px' }, // Adjust padding for different devices
                            height: { xs: 'auto', md: '37px' }, // Auto height for mobile, fixed for desktop
                            fontSize: { xs: '14px', md: '16px' }, // Adjust font size
                            width: { xs: "100%", md: "max-content" }
                        }}
                        onClick={addData}
                    >
                        Fetch & Save Detail
                    </Button>
                </Grid>
            </Grid>
            {selectedRowId === null && (
                <Box>
                    <DataTable fetchData={fetchData} data={data} setSelectedRowId={setSelectedRowId} />
                </Box>
            )}
            {selectedRowId && (
                <CompanyDetail selectedRowId={selectedRowId} setSelectedRowId={setSelectedRowId} />
            )}
        </Box>
    );
};

export default Home;
