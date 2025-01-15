import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { Link , useNavigate} from 'react-router-dom';

export default function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({
        username: "",
        email: "",
        password: "",
    });

    const [error, setError] = React.useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSignup = async () => {
        setError("");
        if (!formData.username || !formData.email || formData.password.length < 6) {
            setError("All fields are required and password must be at least 6 characters.");
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_HOST}/api/registeruser`, {
                username: formData.username,
                email: formData.email,
                password: formData.password,
            });

            console.log("Signup successful:", response.data);
            navigate("/signin");
            setFormData({ username: "", email: "", password: "" });
        } catch (error) {
            console.error("Error during signup:", error);
            setError("An error occurred during signup. Please try again.");
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
                backgroundColor: "#f5f5f5",
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
                    Signup
                </Typography>

                {error && (
                    <Typography color="error" textAlign="center">
                        {error}
                    </Typography>
                )}

                <TextField
                    name="username"
                    label="Username"
                    value={formData.username}
                    onChange={handleInputChange}
                    fullWidth
                />
                <TextField
                    name="email"
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    fullWidth
                />
                <TextField
                    name="password"
                    label="Password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    fullWidth
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSignup}
                    fullWidth
                >
                    Signup
                </Button>

                <p
                    style={{
                        textAlign: "center",
                        margin: "10px 0",
                        color: "#333",
                    }}
                    >Already have an account <Link to="/signin"> sign In</Link></p>
            </Box>
        </Box>
    );
}
