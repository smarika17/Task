import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Grid, Box, Button, IconButton, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [employeeData, setEmployeeData] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [editedEmployee, setEditedEmployee] = useState({});
    const navigate = useNavigate();

    const getSessionData = () => {
        const sessionData = localStorage.getItem("user");
        if (sessionData) {
            const data = JSON.parse(sessionData);
            return data;
        }
        return null;
    };

    const fetchData = async () => {
        const userid = getSessionData() ? getSessionData().user.id : null;
        if (!userid) {
            alert("User ID is missing");
            return;
        }

        try {
            const response = await axios.get(`${import.meta.env.VITE_API_HOST}/api/getemployeedata`, {
                params: { id: userid },
            });
            setEmployeeData(response.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleAddEmployee = () => {
        navigate('/addemployee');
    };

    const handleDelete = async (empid) => {
        const userid = getSessionData() ? getSessionData().user.id : null;
        if (!userid) {
            alert("User ID is missing");
            return;
        }
    
        try {
            const response = await axios.delete(`${import.meta.env.VITE_API_HOST}/api/deleteemployeedata`, {
                data: {
                    id: userid,
                    empid: empid,
                },
            });
            setEmployeeData((prevData) =>
                prevData.filter((employee) => employee.empid !== empid)
            );
            // alert("Employee deleted successfully!");
        } catch (error) {
            console.error("Error deleting employee:", error);
            // alert("Error deleting employee");
        }
    };

    const handleEdit = (employee) => {
        setEditedEmployee(employee);
        setOpenDialog(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedEmployee((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        const userid = getSessionData() ? getSessionData().user.id : null;
        if (!userid) {
            alert("User ID is missing");
            return;
        }

        try {
            const response = await axios.put(`${import.meta.env.VITE_API_HOST}/api/updateemployeedata`, {
                id: userid,
                empid: editedEmployee.empid,
                name: editedEmployee.name,
                city: editedEmployee.city,
                phone: editedEmployee.phone,
                designation: editedEmployee.designation,
                salary: editedEmployee.salary,
            });

            setEmployeeData((prevData) =>
                prevData.map((emp) =>
                    emp.empid === editedEmployee.empid ? { ...emp, ...editedEmployee } : emp
                )
            );
            setOpenDialog(false);
            // alert("Employee updated successfully!");
        } catch (error) {
            console.error("Error updating employee:", error);
            // alert("Error updating employee");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Box
            sx={{
                padding: "80px 0px",
                backgroundColor: "#f5f5f5",
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddEmployee}
                >
                    Add Employee
                </Button>
            </Box>

            <Grid container spacing={4} justifyContent="center">
                {employeeData.length > 0 ? (
                    employeeData.map((employee) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={employee.empid}>
                            <Card
                                sx={{
                                    backgroundColor: "#ffffff",
                                    boxShadow: 3,
                                    borderRadius: "10px",
                                    padding: "10px",
                                    height: "100%",
                                }}
                            >
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                            {employee.name}
                                        </Typography>
                                        <Box>
                                            <IconButton
                                                onClick={() => handleEdit(employee)}
                                                color="primary"
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                onClick={() => handleDelete(employee.empid)}
                                                color="error"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                    <Typography variant="body2" color="textSecondary">
                                        Designation: {employee.designation}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        City: {employee.city}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Phone: {employee.phone}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Salary: ₹{employee.salary}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="h6" color="textSecondary" align="center" width="100%"
                    sx={{marginTop:20, color:"black"}}
                    >
                        No employee data available.
                    </Typography>
                )}
            </Grid>

            {/* Edit Employee Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Edit Employee</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name"
                        name="name"
                        value={editedEmployee.name || ""}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="City"
                        name="city"
                        value={editedEmployee.city || ""}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Phone"
                        name="phone"
                        value={editedEmployee.phone || ""}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Designation"
                        name="designation"
                        value={editedEmployee.designation || ""}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Salary"
                        name="salary"
                        value={editedEmployee.salary || ""}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
