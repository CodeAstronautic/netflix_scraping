import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Checkbox,
    Paper,
    Button,
    Box,
    Typography,
} from "@mui/material";
import exportIcon from "../src/images/exportIcon.svg"
import { deleteData, exportCSVData, fetchById, getData } from "./api";
import axios from "axios";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

// Helper function to create data rows
const createData = (id, company, description, address, phoneno, email, logo, facebookUrl, twitterUrl, linkedinUrl) => ({
    id,
    company,
    description,
    address,
    phoneno,
    email,
    logo,
    facebookUrl,
    twitterUrl,
    linkedinUrl
});

// DataTable Component
const DataTable = ({ fetchData, data, setSelectedRowId }) => {
    const rows = data?.length > 0 ? data?.map((item) => {
        return createData(item?._id, item?.name, item?.description, item?.address, item?.phoneNumber, item?.email, item?.logoUrl, item?.facebookUrl, item?.twitterUrl, item?.linkedinUrl)
    }) : []

    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Handle row selection
    const handleSelectAllClick = (event) => {
        setSelected(event.target.checked ? rows.map((n) => n.id) : []);
    };

    const handleClick = (event, id) => {
        const newSelected = selected.includes(id)
            ? selected.filter((selectedId) => selectedId !== id)
            : [...selected, id];
        setSelected(newSelected);
    };

    const handleClickById = (event, id) => {
        setSelectedRowId(id); // Set the selected row ID
    };
    const handleFieldClickById = (event, id) => {
        event.stopPropagation();
        handleClickById(event, id);
    };

    // Handle delete action
    const handleDelete = async () => {
        const payload = {
            ids: selected
        }
        try {
            await deleteData(payload);
            fetchData()
            setSelected([])
        } catch (error) {
            console.log("Error adding data");
        }
    };

    // Pagination handlers
    const handleChangePage = (event, newPage) => setPage(newPage);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (id) => selected.includes(id);

    const downloadCSVFile = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/companies/export-csv', { responseType: 'blob' });

            // Create a temporary link element
            const link = document.createElement('a');
            const url = window.URL.createObjectURL(new Blob([response.data]));

            // Set the download attribute with the filename
            link.href = url;
            link.setAttribute('download', 'data.csv');

            // Append the link to the body and trigger the download
            document.body.appendChild(link);
            link.click();

            // Clean up by removing the temporary link element
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error('Error fetching CSV:', error);
        }
    }

    return (
        <>
            {/* <Button variant="contained" color="error" onClick={handleDelete} disabled={selected.length === 0}>
                Delete Selected
            </Button> */}
            <Box
                display="flex"
                alignItems="center"
                // justifyContent="space-between"
                gap={10}
                sx={{
                    padding: "8px 16px",
                    borderBottom: "1px solid #e0e0e0",
                }}
            >
                <Typography variant="body2" color="#334155" fontWeight={500} fontSize={12} >
                    {selected?.length} selected
                </Typography>

                <Box display="flex" gap={2}>
                    <Button
                        variant="outlined"
                        color="inherit"
                        size="small"

                        sx={{
                            textTransform: "none",
                            color: "#A2A2A2",
                            borderColor: "#ECECEC",
                            width: "58px",
                            height: "30px"
                        }}
                        onClick={handleDelete} disabled={selected.length === 0}
                    >
                        Delete
                    </Button>
                    <Button
                        variant="outlined"
                        color="inherit"
                        size="small"
                        sx={{
                            textTransform: "none",
                            color: "#A2A2A2",
                            borderColor: "#ECECEC",
                            width: "135px",
                            height: "30px"
                        }}
                        startIcon={
                            <Box
                                component="img"
                                src={exportIcon}
                                sx={{
                                    display: "inline-block",
                                    width: "16px",
                                    height: "16px",
                                }}
                            />
                        }
                        onClick={downloadCSVFile}
                    >
                        Export as CSV
                    </Button>
                </Box>
            </Box>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer>
                    <Table aria-labelledby="tableTitle" size="medium">
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        indeterminate={selected.length > 0 && selected.length < rows.length}
                                        checked={selected.length === rows.length}
                                        onChange={handleSelectAllClick}
                                        inputProps={{ "aria-label": "select all rows" }}
                                    />
                                </TableCell>
                                <TableCell></TableCell>
                                <TableCell>Company</TableCell>
                                <TableCell style={{ whiteSpace: "nowrap" }}>Social Profiles</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>Phone No.</TableCell>
                                <TableCell>Email</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                const isItemSelected = isSelected(row.id);
                                // console.log(row);

                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}

                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isItemSelected}
                                                onChange={(event) => {
                                                    event.stopPropagation();
                                                    handleClick(event, row.id)
                                                }}
                                                inputProps={{
                                                    "aria-labelledby": `enhanced-table-checkbox-${row.id}`,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell scope="row" onClick={(event) => handleClickById(event, row.id)}> <img src={row.logo} width={"40px"} /> </TableCell>
                                        <TableCell component="th" id={`enhanced-table-checkbox-${row.id}`} scope="row" onClick={(event) => handleClickById(event, row.id)}>{row.company}</TableCell>
                                        <TableCell>
                                            <div className="tableLogo">
                                                <a href={row.facebookUrl} rel="noreferrer" target="_blank"><FacebookOutlinedIcon /></a>
                                                <a href={row.twitterUrl} rel="noreferrer" target="_blank"><TwitterIcon /></a>
                                                <a href={row.linkedinUrl} rel="noreferrer" target="_blank"><LinkedInIcon /></a>
                                            </div>
                                        </TableCell>
                                        <TableCell onClick={(event) => handleClickById(event, row.id)}>{row.description}</TableCell>
                                        <TableCell onClick={(event) => handleClickById(event, row.id)}>{row.address}</TableCell>
                                        <TableCell onClick={(event) => handleClickById(event, row.id)}>{row.phoneno}</TableCell>
                                        <TableCell onClick={(event) => handleClickById(event, row.id)}>{row.email}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

        </>
    );
};

export default DataTable;