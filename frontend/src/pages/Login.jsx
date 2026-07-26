import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = () => {
        if (!email.trim()) {

    Swal.fire({
    icon: "warning",
    title: "Missing Information",
    text: "Please enter your email."
});

    return;

}

if (!password.trim()) {

Swal.fire({
    icon: "warning",
    title: "Missing Information",
    text: "Please enter your password."
});

    return;

}

        axios.post(
            "http://localhost:5000/api/auth/login",
            {
                email,
                password
            }
        )
        .then((res) => {

            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            );

            Swal.fire({
    icon: "success",
    title: "Login Successful",
    text: "Welcome back!",
    timer: 1500,
    showConfirmButton: false
});

setTimeout(() => {

    navigate("/");

}, 1500);

        })
        .catch((err) => {

            Swal.fire({
    icon: "error",
    title: "Login Failed",
    text: err.response?.data?.message || "Invalid email or password."
});

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
                    style={{
                        color: "#1877f2"
                    }}
                >
                    CellSense AI Portal
                </h2>

                <p className="text-center text-muted mb-4">
                    Sign in to continue
                </p>

                <input
                    className="form-control mb-3"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    className="btn btn-primary w-100"
                    onClick={handleLogin}
                >
                    Sign In
                </button>

                <hr />

                <div className="text-center">

                    Don't have an account?

                    <Link
                        to="/register"
                        className="ms-2 text-decoration-none"
                    >
                       Sign Up
                    </Link>

                </div>

            </div>

        </div>

    </div>

);

}

export default Login;