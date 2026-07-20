
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


function Register() {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const handleRegister = () => {
        if(password !== confirmPassword){

    alert("Mật khẩu không khớp");

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

            alert(res.data.message);

            navigate("/login");

        })
        .catch((err) => {

            if (err.response) {

                alert(err.response.data.message);

            } else {

                alert("Đăng ký thất bại");

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
                    Tạo tài khoản mới
                </p>

                <input
                    className="form-control mb-3"
                    placeholder="Họ và tên"
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
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />

                <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Xác nhận mật khẩu"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button
                    className="btn btn-primary w-100"
                    onClick={handleRegister}
                >
                    Đăng ký
                </button>

                <hr/>

                <div className="text-center">

                    Đã có tài khoản?

                    <Link
                        to="/login"
                        className="ms-2 text-decoration-none"
                    >
                        Đăng nhập
                    </Link>

                </div>

            </div>

        </div>

    </div>

);

}

export default Register;