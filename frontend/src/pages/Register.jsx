
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


function Register() {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const handleRegister = () => {

    if (!fullName.trim()) {

        Swal.fire({
    icon: "warning",
    title: "missing information",
    text: "Please enter your full name"
});

        return;

    }

    if (!email.trim()) {

        Swal.fire({
    icon: "warning",
    title: "missing information",
    text: "Please enter your email"
});

        return;

    }

    if (!password.trim()) {

        Swal.fire({
    icon: "warning",
    title: "missing information",
    text: "Please enter your password"
});

        return;

    }

    if (!confirmPassword.trim()) {

        Swal.fire({
    icon: "warning",
    title: "missing information",
    text: "Please confirm your password"
});

        return;

    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {

        Swal.fire({
    icon: "error",
    title: "Email invalid",
    text: "Invalid email address"
});

        return;

    }

    if (password.length < 6) {

        Swal.fire({
    icon: "warning",
    title: "Password invalid",
    text: "Password must be at least 6 characters"
});

        return;

    }

    if (password !== confirmPassword) {

       Swal.fire({
    icon: "error",
    title: "Wrong password",
    text: "Passwords do not match"
});
        return;

}

        axios.post(
            "http://localhost:5000/api/auth/register",
            {
                full_name: fullName,
                email,
                password
            }
        )
        .then((res) => {

           Swal.fire({
    icon: "success",
    title: "Successful",
    text: "Registration Successful",
    confirmButtonColor: "#2563EB"
}).then(() => {

    navigate("/login");

});

        })
        .catch((err) => {

            if (err.response) {

                Swal.fire({
    icon: "error",
    title: "Registration Failed",
    text: "This email is already registered."
});

            } else {

                Swal.fire({
    icon: "error",
    title: "Server Error",
    text: "Something went wrong. Please try again later"
});

            }

        });

    };
   

    return (

    <div
        className="d-flex justify-content-center align-items-center"
        style={{
            minHeight: "100vh",
            background: "#f0f2f5"
        }}
    >

        <div
            className="card shadow"
            style={{
                width: "430px",
                borderRadius: "15px"
            }}
        >

            <div className="card-body p-4">

                <h2
                    className="text-center fw-bold"
                    style={{ color: "#1877f2" }}
                >
                    CellSense AI Portal
                </h2>

                <p className="text-center text-muted mb-4">
                    Create a New Account
                </p>

                <input
                    className="form-control mb-3"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e)=>setFullName(e.target.value)}
                />

                <input
                    className="form-control mb-3"
                    placeholder="Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />

                <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />

                <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button
                    className="btn btn-primary w-100"
                    onClick={handleRegister}
                >
                    Sign Up
                </button>

                <hr/>

                <div className="text-center">

                   Already have an account?

                    <Link
                        to="/login"
                        className="ms-2 text-decoration-none"
                    >
                        Sign In
                    </Link>

                </div>

            </div>

        </div>

    </div>

);

}

export default Register;