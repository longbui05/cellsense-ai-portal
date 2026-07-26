import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function PhoneCard({ phone }) {
   const [liked, setLiked] = useState(false);  
    const handleCompare = () => {

  let comparePhones =
    JSON.parse(localStorage.getItem("comparePhones")) || [];

  if (comparePhones.find((item) => item.id === phone.id)) {

    Swal.fire({
    icon: "info",
    title: "Already Added",
    text: "This phone is already in Compare.",
    confirmButtonColor: "#2563EB"
});

    return;

  }

  if (comparePhones.length >= 2) {

    Swal.fire({
    icon: "warning",
    title: "Compare Full",
    text: "You can only compare 2 phones.",
    confirmButtonColor: "#2563EB"
});

    return;

  }

  comparePhones.push(phone);

  localStorage.setItem(
    "comparePhones",
    JSON.stringify(comparePhones)
  );

  Swal.fire({
    icon: "success",
    title: "Success!",
    text: "Phone added to Compare.",
    timer: 1500,
    showConfirmButton: false
});

};
const handleFavorite = () => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {

        Swal.fire({
    icon: "warning",
    title: "Login Required",
    text: "Please login first.",
    confirmButtonColor: "#2563EB"
});

        return;

    }

    axios.post(

        "http://localhost:5000/api/favorites",

        {

            user_id: user.id,

            phone_id: phone.id

        }

    )
    .then((res) => {

        Swal.fire({
    icon: "success",
    title: "Added!",
    text: res.data.message,
    timer: 1500,
    showConfirmButton: false
});

        setLiked(true);

    })
    .catch((err) => {

        console.log(err);

    });

};
  return (
    <div className="col-lg-4 col-md-6 mb-5">
      <div className="phone-card">

<div
    style={{
        position:"relative"
    }}
>

<img

    src={`http://localhost:5000/uploads/${phone.image}`}

    className="phone-img w-100"

    alt={phone.model}

/>

<button

    onClick={handleFavorite}

    style={{

        position:"absolute",

        top:15,

        right:15,

        width:45,

        height:45,

        borderRadius:"50%",

        border:"none",

        background:"white",

        fontSize:22,

        boxShadow:"0 5px 15px rgba(0,0,0,.15)",

        cursor:"pointer"

    }}

>

{liked ? "❤️" : "🤍"}

</button>

</div>

<div className="card-body p-4">
<div
    style={{
        display: "inline-block",
        background: "#2563EB",
        color: "white",
        fontSize: "12px",
        padding: "4px 10px",
        borderRadius: "20px",
        marginBottom: "12px",
        fontWeight: "600"
    }}
>
    NEW
</div>
          <h4
className="fw-bold"
style={{
minHeight:"60px"
}}
>
  

{phone.model}

</h4>

          <div className="price">

{Number(phone.price).toLocaleString()} đ

</div>
<div className="mb-3">

    <div
style={{
marginTop:12,
marginBottom:20,
fontSize:17
}}
>

⭐ ⭐ ⭐ ⭐ ⭐

</div>

    <span
        style={{
            color: "#777",
            marginLeft: "8px"
        }}
    >
        4.8
    </span>

</div>

          <div className="spec">

    💾 RAM:
    <b style={{ marginLeft: "5px" }}>
        {phone.ram}
    </b>

</div>

<div className="spec">

    📦 Storage:
    <b style={{ marginLeft: "5px" }}>
        {phone.storage}
    </b>

</div>

<div className="spec">

    ⚡ Chip:
    <b style={{ marginLeft: "5px" }}>
        {phone.processor}
    </b>

</div>

          

        <div className="d-grid gap-2 mt-3">

    <Link
        to={`/phone/${phone.id}`}
        className="btn btn-primary"
    >
        View Details →
    </Link>

    <button
        className="btn btn-outline-primary"
        onClick={handleCompare}
    >
        ⚖ Compare
    </button>


</div>

        </div>

      </div>
    </div>
    
  );
}


export default PhoneCard;