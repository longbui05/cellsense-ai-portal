import PhoneCard from "./components/PhoneCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import PhoneDetail from "./pages/PhoneDetail";

function Home() {
  const [phones, setPhones] = useState([]);
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("All");

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

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand">
            CellSense AI Portal
          </span>
        </div>
      </nav>

      <div className="container mt-4">

        <div className="mb-4">

          <input
            type="text"
            className="form-control"
            placeholder="Tìm điện thoại..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <div className="mb-4">

          <button
            className="btn btn-secondary me-2"
            onClick={() => setBrand("All")}
          >
            Tất cả
          </button>

          <button
            className="btn btn-primary me-2"
            onClick={() => setBrand("Apple")}
          >
            Apple
          </button>

          <button
            className="btn btn-success me-2"
            onClick={() => setBrand("Samsung")}
          >
            Samsung
          </button>

          <button
            className="btn btn-warning"
            onClick={() => setBrand("Xiaomi")}
          >
            Xiaomi
          </button>

        </div>

        <div className="row">

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
        path="/"
        element={<Home />}
      />

      <Route
        path="/phone/:id"
        element={<PhoneDetail />}
      />

    </Routes>
  );
}

export default App;