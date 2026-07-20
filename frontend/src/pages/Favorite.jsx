import { useEffect, useState } from "react";
import axios from "axios";

function Favorite() {

    const [phones, setPhones] = useState([]);

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {

        if (!user) return;

        axios.get(

            `http://localhost:5000/api/favorites/${user.id}`

        ).then((res) => {

            setPhones(res.data);

        });

    }, [user]);
    const handleDelete = (id) => {

    axios.delete(

    `http://localhost:5000/api/favorites/${user.id}/${id}`

).then(() => {

        setPhones(

            phones.filter((phone) => phone.id !== id)

        );

        alert("Đã xóa khỏi yêu thích");

    }).catch((err) => {

        console.log(err);

    });

};

    return (

        <div className="container mt-4">

            <h2 className="mb-4">

                ❤️ Danh sách yêu thích

            </h2>

            {

                phones.map((phone) => (

                    <div
                        key={phone.id}
                        className="card mb-3"
                    >

                        <div className="card-body">

    <h5>{phone.model}</h5>

    <p>{phone.price} VNĐ</p>

    <button
        className="btn btn-danger"
        onClick={() => handleDelete(phone.id)}
    >
        Xóa khỏi yêu thích
    </button>

</div>

                    </div>

                ))

            }

        </div>

    );

}

export default Favorite;