import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Ensure it's properly imported

export default function AddEmployee() {
    const [employeeData, setEmployeeData] = React.useState([]);
    const [formData, setFormData] = React.useState({
        employeeId: "",
        name: "",
        city: "",
        phone: "",
        designation: "",
        salary: "",
    });

    const navigate = useNavigate(); 

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const getSessionData = () => {
        const sessionData = localStorage.getItem("user");
        if (sessionData) {
            const data = JSON.parse(sessionData);
            return data;
        }
        return null;
    };

    const validateForm = () => {
        if (
            !formData.employeeId ||
            !formData.name ||
            !formData.city ||
            !formData.phone ||
            !formData.designation ||
            !formData.salary
        ) {
            alert("Please fill all fields");
            return false;
        }
        return true;
    };

    const handleAddEmployee = async () => {
        if (!validateForm()) return;
       
        setEmployeeData((prevData) => [...prevData, formData]);
        setFormData({
            employeeId: "",
            name: "",
            city: "",
            phone: "",
            designation: "",
            salary: "",
        });

        const userid = getSessionData() ? getSessionData().user.id : null;
        if (!userid) {
            alert("User ID is missing");
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_HOST}/api/addemployeedata`, {
                id: userid,
                empid: formData.employeeId,
                name: formData.name,
                city: formData.city,
                phone: formData.phone,
                designation: formData.designation,
                salary: formData.salary,
            });
            console.log("Employee added successfully:", response.data);
            navigate('/dashboard'); 
        } catch (error) {
            console.error("Error in adding employee data:", error);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100vw",
                height: "100vh",
                backgroundColor: "white",
                padding: "30px",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: "20px",
                    alignItems: "center",
                    width: { xs: "100%", sm: "100%", md: "50%" },
                }}
            >
                <TextField
                    name="employeeId"
                    label="Employee ID *"
                    value={formData.employeeId}
                    onChange={handleInputChange}
                    fullWidth
                />
                <TextField
                    name="name"
                    label="Name *"
                    value={formData.name}
                    onChange={handleInputChange}
                    fullWidth
                />
                <TextField
                    name="city"
                    label="City *"
                    value={formData.city}
                    onChange={handleInputChange}
                    fullWidth
                />
                <TextField
                    name="phone"
                    label="Phone *"
                    value={formData.phone}
                    onChange={handleInputChange}
                    fullWidth
                />
                <TextField
                    name="designation"
                    label="Designation *"
                    value={formData.designation}
                    onChange={handleInputChange}
                    fullWidth
                />
                <TextField
                    name="salary"
                    label="Salary *"
                    value={formData.salary}
                    onChange={handleInputChange}
                    fullWidth
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddEmployee}
                >
                    Add Employee
                </Button>
            </Box>
        </Box>
    );
}
