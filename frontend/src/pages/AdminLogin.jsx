import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = () => {

        axios.post("http://localhost:5000/api/admin/login", {

            username,
            password

        })
        .then((res) => {

            alert(res.data.message);

            localStorage.setItem(
                "admin",
                JSON.stringify(res.data.admin)
            );

            navigate("/admin");

        })
        .catch((err) => {

            alert(err.response.data.message);

        });

    };

    return (

        <div className="container mt-5" style={{maxWidth:"400px"}}>

            <h2 className="text-center mb-4">
                Admin Login
            </h2>

            <input
                className="form-control mb-3"
                placeholder="Username"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
            />

            <input
                type="password"
                className="form-control mb-3"
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
            />

            <button
                className="btn btn-primary w-100"
                onClick={handleLogin}
            >
                Login
            </button>

        </div>

    );

}

export default AdminLogin;