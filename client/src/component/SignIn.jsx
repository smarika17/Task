import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";  

import { Link } from 'react-router-dom';

export default function SignIn() {
    const [formData, setFormData] = React.useState({
        email: "",
        password: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAddEmployee = () => {
        alert("Add Employee functionality to be implemented.");
    };

    const handleclicksignin = async () => {
        console.log("Login form submitted:", formData);
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_HOST}/api/login`, {
                email: formData.email,
                password: formData.password,
            });            
            console.log("Login successful:", response.data);
            const data = response.data;
            if (response.status === 200) {
                
                document.cookie = `username=${JSON.stringify(data)}; SameSite=Strict; Secure`;
                localStorage.setItem("user", JSON.stringify(data));
            }
            setFormData({ username: "", email: "" });
            window.location.href = "/dashboard";
        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred during login. Please try again.");
        }
    };

    const handleLogout = () => {
        
        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
        localStorage.removeItem("user");
        console.log("User logged out successfully");
        window.location.href = "/login";
    };

    return (
        <Box sx={{ width: "100vw" }}>
           

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100vw",
                    height: "100vh",
                    padding: "20px",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                        padding: "30px",
                        backgroundColor: "white",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        width: { xs: "100%", sm: "400px" },
                    }}
                >
                    <Typography variant="h5" textAlign="center" gutterBottom>
                        Sign In
                    </Typography>
                    <TextField
                        name="email"
                        label="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        name="password"
                        label="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleclicksignin()}
                        fullWidth
                    >
                        Sign In
                    </Button>

                    <p
                    style={{
                        textAlign: "center",
                        margin: "10px 0",
                        color: "#333",
                    }}
                    >Create an Account <Link to="/signup"> sign Up</Link></p>
                </Box>
            </Box>
        </Box>
    );
}
