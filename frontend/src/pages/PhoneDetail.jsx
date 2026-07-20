import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function PhoneDetail() {

    const { id } = useParams();

    const [phone, setPhone] = useState(null);

    const [reviews, setReviews] = useState([]);

    const [rating, setRating] = useState(5);

    const [comment, setComment] = useState("");
   useEffect(() => {

    axios
        .get(`http://localhost:5000/api/phones/${id}`)
        .then((res) => {

            setPhone(res.data);

        })
        .catch((err) => {

            console.log(err);

        });

    axios
        .get(`http://localhost:5000/api/reviews/${id}`)
        .then((res) => {

            setReviews(res.data);

        })
        .catch((err) => {

            console.log(err);

        });

}, [id]);
    const handleReview = () => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {

        alert("Vui lòng đăng nhập");

        return;

    }

    axios.post(

        "http://localhost:5000/api/reviews",

        {

            user_id: user.id,

            phone_id: phone.id,

            rating,

            comment

        }

    ).then(() => {

        alert("Đánh giá thành công");

        setComment("");

        return axios.get(
            `http://localhost:5000/api/reviews/${phone.id}`
        );

    }).then((res) => {

        setReviews(res.data);

    }).catch((err) => {

        console.log(err);

    });

};

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
            <hr className="mt-5" />

<h3>Đánh giá</h3>

<div className="mb-3">

    <label>Số sao</label>

    <select

        className="form-control"

        value={rating}

        onChange={(e) => setRating(e.target.value)}

    >

        <option value="5">★★★★★</option>

        <option value="4">★★★★☆</option>

        <option value="3">★★★☆☆</option>

        <option value="2">★★☆☆☆</option>

        <option value="1">★☆☆☆☆</option>

    </select>

</div>

<div className="mb-3">

    <textarea

        className="form-control"

        rows="4"

        placeholder="Viết đánh giá..."

        value={comment}

        onChange={(e) => setComment(e.target.value)}

    />

</div>

<button

    className="btn btn-primary"

    onClick={handleReview}

>

    Gửi đánh giá

</button>

<hr />

{
    reviews.map((review) => (

        <div

            className="card mb-3"

            key={review.id}

        >

            <div className="card-body">

                <h5>

                    {review.full_name}

                </h5>

                <p>

                    {"★".repeat(review.rating)}

                </p>

                <p>

                    {review.comment}

                </p>

            </div>

        </div>

    ))
}
        </div>
        

    );

}

export default PhoneDetail;