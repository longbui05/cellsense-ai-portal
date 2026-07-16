
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function Admin() {

    const [phones, setPhones] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        axios
        .get("http://localhost:5000/api/admin/phones")
        .then((res) => {

            setPhones(res.data);

        });

    }, []);

    const handleDelete = (id) => {

    if (!window.confirm("Bạn có chắc muốn xóa?")) {

        return;

    }

    axios
        .delete(`http://localhost:5000/api/admin/phones/${id}`)
        .then((res) => {

            alert(res.data.message);

            setPhones(

                phones.filter(
                    (phone) => phone.id !== id
                )

            );

        })
        .catch((err) => {

            console.log(err);

            alert("Xóa thất bại");

        });

};

    return (

        <div className="container mt-5">

            <div className="d-flex justify-content-between align-items-center mb-4">

    <h2>Admin Dashboard</h2>

    <Link
    to="/admin/add-phone"
    className="btn btn-success"
>
    + Thêm điện thoại
</Link>

</div>

            <table className="table table-bordered mt-4">

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Model</th>
                        <th>Brand</th>
                        <th>Price</th>
                        <th>Thao tác</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        phones.map((phone)=>(

                            <tr key={phone.id}>

    <td>{phone.id}</td>

    <td>{phone.model}</td>

    <td>{phone.brand}</td>

    <td>{phone.price}</td>

    <td>

        <button
            className="btn btn-warning me-2"
            onClick={() => navigate(`/admin/edit-phone/${phone.id}`)}
        >
            Sửa
        </button>

        <button
            className="btn btn-danger"
            onClick={() => handleDelete(phone.id)}
        >
            Xóa
        </button>

    </td>

</tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default Admin;