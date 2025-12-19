import { Box, Stack, TextField, Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type FormData = {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
};

const CreateAccount = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const baseURL = import.meta.env.VITE_BACKEND_URL as string;

    //React Hook Form setup
    const { register, handleSubmit } = useForm<FormData>({
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: "Admin",
        },
    });

    // Handle form submission
    const handleFormSubmit = async (data: FormData) => {
        setIsSubmitting(true);

        // Validate password matching
        if (data.password !== data.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        // Validate password length
        if (data.password.length < 6) {
            toast.error("Password must be at least 6 characters long!");
            return;
        }

        // Remove confirmPassword from data before sending
        const payload = {
            name: data.fullName,
            email: data.email,
            password: data.password,
            role: data.role,
        };
        console.log("Account created with data:", payload);

        const createPromise = axios.post(`${baseURL}/api/v1/auth/register`, payload);
        try {
            const response = await toast.promise(createPromise, {
                pending: "Creating account...",
                success: "Account created successfully!",
                error: "Something went wrong!",
            });
            console.log(response);
            navigate("/admin");
        } catch (err) {
            console.error("Error adding book:", err);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="h-screen w-full flex justify-center items-center bg-gray-100">
            <div className="w-[450px] max-w-[95%] bg-white rounded-xl flex flex-col items-center shadow-lg overflow-hidden p-8">
                <h1 className="text-2xl font-semibold text-[#FF4169]">
                    Create New Account
                </h1>

                {/* Form */}
                <Box component="form" sx={{ width: 500, maxWidth: "100%", mt: 3 }} onSubmit={handleSubmit(handleFormSubmit)}>
                    <Stack spacing={2}>
                        <TextField
                            fullWidth label="Full Name"
                            {...register("fullName", { required: "Full name is required" })} />
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            {...register("email", { required: "Email is required" })} />

                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            {...register("password", { required: "Password is required" })}
                            autoComplete="new-password"
                        />

                        <TextField
                            fullWidth
                            label="Confirm Password"
                            type="password"
                            {...register("confirmPassword", { required: "Confirm password is required" })}
                            autoComplete="new-password"
                        />

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={isSubmitting}
                            sx={{
                                mt: 1,
                                backgroundColor: "#FF4169",
                                "&:hover": { backgroundColor: "#e93b60" },
                            }}
                            fullWidth
                        >
                            Create Account
                        </Button>
                    </Stack>
                </Box>

                {/* Link to Login */}
                <Link to="/" className="mt-4 text-sm text-[#FF4169] hover:underline">
                    Already have an account? Log in
                </Link>
            </div>
        </div>
    );
};

export default CreateAccount;
