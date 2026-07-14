import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Compare() {

  const [phones, setPhones] = useState([]);
  const removePhone = (id) => {

  const newList = phones.filter(
    (phone) => phone.id !== id
  );

  setPhones(newList);

  localStorage.setItem(
    "comparePhones",
    JSON.stringify(newList)
  );

};
const clearCompare = () => {

  setPhones([]);

  localStorage.removeItem("comparePhones");

};

  useEffect(() => {

    const data =
      JSON.parse(localStorage.getItem("comparePhones")) || [];

    setPhones(data);

  }, []);

  return (

    <div className="container mt-5">

      <div className="d-flex justify-content-between align-items-center mb-4">

  <h2>So sánh điện thoại</h2>

  <div>

  <Link
    to="/"
    className="btn btn-primary me-2"
  >
    Trang chủ
  </Link>

  <button
    className="btn btn-warning"
    onClick={clearCompare}
  >
    Xóa tất cả
  </button>

</div>

</div>

      {
        phones.length === 0 && (
          <h4 className="text-center">
            Chưa có điện thoại nào được chọn.
          </h4>
        )
      }

      <div className="row">

        {phones.map((phone) => (

          <div
            className="col-md-6"
            key={phone.id}
          >

            <div className="card shadow">

              <img
                src={`http://localhost:5000/uploads/${phone.image}`}
                className="card-img-top"
                style={{
                  height: "250px",
                  objectFit: "contain"
                }}
              />

              <div className="card-body">

                <h3>{phone.model}</h3>

                <p><strong>Hãng:</strong> {phone.brand}</p>

                <p><strong>Giá:</strong> {phone.price}</p>

                <p><strong>RAM:</strong> {phone.ram}</p>

                <p><strong>Bộ nhớ:</strong> {phone.storage}</p>

                <p><strong>Chip:</strong> {phone.processor}</p>

                <p><strong>Camera:</strong> {phone.camera}</p>

                <p><strong>Pin:</strong> {phone.battery}</p>

                <p><strong>Màn hình:</strong> {phone.display_screen}</p>

                <p><strong>Hệ điều hành:</strong> {phone.os}</p>

<button
  className="btn btn-danger mt-3"
  onClick={() => removePhone(phone.id)}
>
  Xóa
</button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Compare;