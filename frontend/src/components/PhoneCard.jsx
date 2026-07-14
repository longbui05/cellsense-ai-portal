import { Link } from "react-router-dom";

function PhoneCard({ phone }) {
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
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow">

        <img
          src={`http://localhost:5000/uploads/${phone.image}`}
          className="card-img-top"
          alt={phone.model}
          style={{
            height: "250px",
            objectFit: "contain",
            padding: "10px"
          }}
        />

        <div className="card-body">

          <h5>{phone.model}</h5>

          <p>
            <strong>Giá:</strong> {phone.price} VNĐ
          </p>

          <p>RAM: {phone.ram}</p>

          <p>Bộ nhớ: {phone.storage}</p>

          <p>Chip: {phone.processor}</p>

          <div className="d-flex gap-2">

        <Link
            to={`/phone/${phone.id}`}
            className="btn btn-primary"
        >
            Xem chi tiết
        </Link>

        <button
    className="btn btn-success"
    onClick={() => {
        handleCompare();
    }}
>
    So sánh
</button>

</div>

        </div>

      </div>
    </div>
  );
}


export default PhoneCard;