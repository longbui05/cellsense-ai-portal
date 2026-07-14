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

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default Admin;