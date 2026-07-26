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
import AIChat from "./pages/AIChat";


function Home() {
  const [phones, setPhones] = useState([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [ram, setRam] = useState([]);
const [storage, setStorage] = useState([]);
const [showRam, setShowRam] = useState(false);
const [showStorage, setShowStorage] = useState(false);
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const limit = 8;
  
  const user = JSON.parse(localStorage.getItem("user"));
  

  useEffect(() => {

    axios.get("http://localhost:5000/api/phones", {
        params: {

    search,

    brand: brand === "All" ? "" : brand,

    minPrice,

    maxPrice,

    ram: ram.join(","),

    storage: storage.join(","),
            sort,
            limit,

offset: (page - 1) * limit
        }
    })
.then(res=>{

    setPhones(res.data.phones);

    setTotal(res.data.total);

})

.catch(err=>console.log(err));

}, [
    search,
    brand,
    minPrice,
    maxPrice,
    ram,
    storage,
    sort,
    page
]);
useEffect(() => {

    setPage(1);

}, [

    search,

    brand,

    minPrice,

    maxPrice,

    ram,

    storage,

    sort

]);
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

const handleRam = (value) => {

    if (ram.includes(value)) {

        setRam(ram.filter(item => item !== value));

    } else {

        setRam([...ram, value]);

    }

};

const handleStorage = (value) => {

    if (storage.includes(value)) {

        setStorage(storage.filter(item => item !== value));

    } else {

        setStorage([...storage, value]);

    }

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

<div
    className="d-flex justify-content-center align-items-center gap-3 mt-5 flex-wrap"
>

    <a
        href="#phones"
        className="btn btn-warning btn-lg px-4"
    >
        📱 Explore Phones
    </a>

    <Link
        to="/ai"
        className="btn btn-light btn-lg px-4"
    >
        🤖 AI Chat
    </Link>

    

</div>

    </div>

</div>

      
      <div
    className="container"
    id="phones"
>

        <div className="mb-4">

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
</div>


        <div className="row g-3 mb-5">

    <div className="col-md-3">
        <select
            className="form-select"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
        >
            <option value="All">All Brands</option>
            <option value="Apple">Apple</option>
            <option value="Samsung">Samsung</option>
            <option value="Xiaomi">Xiaomi</option>
        </select>
    </div>
    <div className="col-md-2 position-relative">

<button
className="btn btn-outline-secondary w-100"
onClick={() => setShowRam(!showRam)}
>

RAM ▼

</button>

{
showRam && (

<div
className="position-absolute bg-white border rounded shadow p-3 mt-2"
style={{
width:"230px",
zIndex:1000
}}
>

<div className="d-flex flex-wrap gap-2">

<button
className={`btn ${ram.includes("8GB") ? "btn-primary" : "btn-outline-primary"}`}
onClick={()=>handleRam("8GB")}
>
8GB
</button>

<button
className={`btn ${ram.includes("12GB") ? "btn-primary" : "btn-outline-primary"}`}
onClick={()=>handleRam("12GB")}
>
12GB
</button>

<button
className={`btn ${ram.includes("16GB") ? "btn-primary" : "btn-outline-primary"}`}
onClick={()=>handleRam("16GB")}
>
16GB
</button>

</div>

</div>

)

}

</div>

    <div className="col-md-2">
        <input
            type="number"
            className="form-control"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
        />
    </div>

    <div className="col-md-2">
        <input
            type="number"
            className="form-control"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
        />
    </div>

    
<div className="col-md-2 position-relative">

<button
className="btn btn-outline-secondary w-100"
onClick={() => setShowStorage(!showStorage)}
>

Storage ▼

</button>

{
showStorage && (

<div
className="position-absolute bg-white border rounded shadow p-3 mt-2"
style={{
width:"230px",
zIndex:1000
}}
>

<div className="d-flex flex-wrap gap-2">

<button
className={`btn ${storage.includes("128GB") ? "btn-primary" : "btn-outline-primary"}`}
onClick={()=>handleStorage("128GB")}
>
128GB
</button>

<button
className={`btn ${storage.includes("256GB") ? "btn-primary" : "btn-outline-primary"}`}
onClick={()=>handleStorage("256GB")}
>
256GB
</button>

<button
className={`btn ${storage.includes("512GB") ? "btn-primary" : "btn-outline-primary"}`}
onClick={()=>handleStorage("512GB")}
>
512GB
</button>


</div>

</div>

)

}

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

          {phones.map((phone) => (
            <PhoneCard
            key={phone.id}
            phone={phone}
          />
          ))}

        </div>
        <div className="d-flex justify-content-center align-items-center mt-5">

    <button

        className="btn btn-outline-primary me-3"

        disabled={page === 1}

        onClick={() => setPage(page - 1)}

    >

        ← Previous

    </button>

    <span className="fw-bold">

        Page {page}

    </span>

    <button

        className="btn btn-outline-primary ms-3"

        disabled={phones.length < limit}

        onClick={() => setPage(page + 1)}

    >

        Next →

    </button>

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
<Route
    path="/ai"
    element={<AIChat />}
/>


    </Routes>
  );
}

export default App;