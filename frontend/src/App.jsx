import PhoneCard from "./components/PhoneCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route, Link } from "react-router-dom";
import PhoneDetail from "./pages/PhoneDetail";
import Compare from "./pages/Compare";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";
import AddPhone from "./pages/AddPhone";
import EditPhone from "./pages/EditPhone";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Favorite from "./pages/Favorite";

function Home() {
  const [phones, setPhones] = useState([]);
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("All");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/phones")
      .then((res) => {
        setPhones(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const filteredPhones = phones.filter((phone) => {
    
    const matchSearch = phone.model
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchBrand =
      brand === "All" || phone.brand === brand;
        

    return matchSearch && matchBrand;
  });
  const handleLogout = () => {

    localStorage.removeItem("user");

    window.location.reload();

};
  


  return (
    <div>
      <nav
    className="navbar navbar-expand-lg shadow-sm"
    style={{
        background: "#2563EB",
        padding: "15px 0"
    }}
>

    <div className="container">

        <Link
            to="/"
            className="navbar-brand fw-bold text-white"
            style={{
                fontSize: "28px"
            }}
        >
            📱 CellSense AI
        </Link>

        <div className="ms-auto d-flex align-items-center gap-2">

            <Link
                to="/compare"
                className="btn btn-light"
            >
                ⚖ Compare
            </Link>

            {

                user ?

                <>

                    <Link
                        to="/favorite"
                        className="btn btn-outline-light"
                    >
                        ❤️ Favorite
                    </Link>

                    <span
                        className="text-white fw-semibold"
                    >
                        Xin chào, {user.full_name}
                    </span>

                    <button
                        className="btn btn-danger"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </>

                :

                <>

                    <Link
                        to="/login"
                        className="btn btn-light"
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="btn btn-warning"
                    >
                        Register
                    </Link>

                </>

            }

        </div>

    </div>

</nav>
<div
    style={{
        background:
            "linear-gradient(135deg,#2563EB,#60A5FA)",
        color: "white",
        padding: "70px 0",
        marginBottom: "40px"
    }}
>

    <div className="container text-center">

        <h1
            className="fw-bold display-4"
        >
            Find Your Next Smartphone with AI
        </h1>

        <p
            className="mt-3"
            style={{
                fontSize: "22px"
            }}
        >
            AI-powered smartphone recommendation,
            comparison and reviews.
        </p>

        <div className="mt-4">

            <a
                href="#phones"
                className="btn btn-warning btn-lg me-3"
            >
                Explore Phones
            </a>

            <button
    className="btn btn-light btn-lg"
    onClick={() => alert("AI Assistant sẽ được cập nhật ở phiên bản tiếp theo.")}
>
    🤖 AI Assistant
</button>

        </div>

    </div>

</div>

      
      <div
    className="container"
    id="phones"
>

        <div className="mb-4">
</div>
          <input
    type="text"
    className="form-control shadow-sm"
    placeholder="🔍 Search smartphone..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    style={{
        borderRadius: "15px",
        height: "55px",
        fontSize: "18px"
    }}
/>

        <div className="row mb-5">

    <div className="col-md-4">

        <select
            className="form-select"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            style={{
                height: "55px",
                borderRadius: "15px",
                border: "none",
                boxShadow: "0 8px 25px rgba(0,0,0,.08)"
            }}
        >
            <option value="All">All Brands</option>
            <option value="Apple">Apple</option>
            <option value="Samsung">Samsung</option>
            <option value="Xiaomi">Xiaomi</option>
        </select>

    </div>

</div>
<div className="mb-4">

    <h2
        className="fw-bold"
        style={{
            fontSize: "38px"
        }}
    >
        Latest Smartphones
    </h2>

    <p
        style={{
            color: "#666",
            fontSize: "18px"
        }}
    >
        Explore the latest smartphones with AI-powered recommendations.
    </p>

</div>
        <div className="row g-4">

          {filteredPhones.map((phone) => (
            <PhoneCard
            key={phone.id}
            phone={phone}
          />
          ))}

        </div>

      </div>
    </div>
  );
}

function App() {
  return (
    
    <Routes>
      <Route
    path="/admin/add-phone"
    element={<AddPhone />}
/>
<Route
    path="/admin/edit-phone/:id"
    element={<EditPhone />}
/>
      <Route
    path="/admin-login"
    element={<AdminLogin />}
/>

<Route
    path="/admin"
    element={<Admin />}
/>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/phone/:id"
        element={<PhoneDetail />}
      />

      <Route
        path="/compare"
        element={<Compare />}
      />
      <Route
    path="/login"
    element={<Login />}
/>

<Route
    path="/register"
    element={<Register />}
/>
<Route
    path="/favorite"
    element={<Favorite />}
/>

    </Routes>
  );
}

export default App;