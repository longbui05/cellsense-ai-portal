import { Link } from "react-router-dom";

function PhoneCard({ phone }) {
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

          <Link
            to={`/phone/${phone.id}`}
            className="btn btn-primary"
          >
            Xem chi tiết
          </Link>

        </div>

      </div>
    </div>
  );
}

export default PhoneCard;