import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function PhoneCard({ phone }) {
   const [liked, setLiked] = useState(false);  
    const handleCompare = () => {

  let comparePhones =
    JSON.parse(localStorage.getItem("comparePhones")) || [];

  if (comparePhones.find((item) => item.id === phone.id)) {

    alert("Điện thoại này đã được chọn.");

    return;

  }

  if (comparePhones.length >= 2) {

    alert("Chỉ được chọn tối đa 2 điện thoại.");

    return;

  }

  comparePhones.push(phone);

  localStorage.setItem(
    "comparePhones",
    JSON.stringify(comparePhones)
  );

  alert("Đã thêm vào danh sách so sánh.");

};
const handleFavorite = () => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {

        alert("Vui lòng đăng nhập.");

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

        alert(res.data.message);

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