import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = () => {

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

            alert(res.data.message);

            navigate("/");

        })
        .catch((err) => {

            alert(err.response.data.message);

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
                    Đăng nhập để tiếp tục
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
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    className="btn btn-primary w-100"
                    onClick={handleLogin}
                >
                    Đăng nhập
                </button>

                <hr />

                <div className="text-center">

                    Chưa có tài khoản?

                    <Link
                        to="/register"
                        className="ms-2 text-decoration-none"
                    >
                        Đăng ký
                    </Link>

                </div>

            </div>

        </div>

    </div>

);

}

export default Login;