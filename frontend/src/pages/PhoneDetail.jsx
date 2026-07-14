import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function PhoneDetail() {

    const { id } = useParams();

    const [phone, setPhone] = useState(null);

    useEffect(() => {

        axios
            .get(`http://localhost:5000/api/phones/${id}`)
            .then((res) => {

                setPhone(res.data);

            })
            .catch((err) => {

                console.log(err);

            });

    }, [id]);

    if (!phone) {

        return <h3 className="text-center mt-5">Đang tải...</h3>;

    }

    return (

        <div className="container mt-5">

            <Link
                to="/"
                className="btn btn-secondary mb-4"
            >
                ← Quay lại
            </Link>

            <div className="row">

                <div className="col-md-5">

                    <img
                        src={`http://localhost:5000/uploads/${phone.image}`}
                        alt={phone.model}
                        className="img-fluid rounded shadow"
                    />

                </div>

                <div className="col-md-7">

                    <h2>{phone.model}</h2>

                    <h4 className="text-primary">

                        {Number(phone.price).toLocaleString()} VNĐ

                    </h4>

                    <hr />

                    <p><strong>Hãng:</strong> {phone.brand}</p>

                    <p><strong>Chip:</strong> {phone.processor}</p>

                    <p><strong>RAM:</strong> {phone.ram}</p>

                    <p><strong>Bộ nhớ:</strong> {phone.storage}</p>

                    <p><strong>Camera:</strong> {phone.camera}</p>

                    <p><strong>Pin:</strong> {phone.battery}</p>

                    <p><strong>Màn hình:</strong> {phone.display_screen}</p>

                    <p><strong>Hệ điều hành:</strong> {phone.os}</p>

                    <p><strong>Mô tả:</strong></p>

                    <p>{phone.description}</p>

                </div>

            </div>

        </div>

    );

}

export default PhoneDetail;