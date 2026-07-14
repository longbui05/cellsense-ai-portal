import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddPhone() {

    const navigate = useNavigate();

    const [brandId, setBrandId] = useState("1");
    const [model, setModel] = useState("");
    const [price, setPrice] = useState("");
    const [processor, setProcessor] = useState("");
    const [ram, setRam] = useState("");
    const [storage, setStorage] = useState("");
    const [camera, setCamera] = useState("");
    const [battery, setBattery] = useState("");
    const [displayScreen, setDisplayScreen] = useState("");
    const [os, setOs] = useState("");
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState("");

    const handleSave = () => {

        const formData = new FormData();

formData.append("brand_id", brandId);
formData.append("model", model);
formData.append("price", price);
formData.append("processor", processor);
formData.append("ram", ram);
formData.append("storage", storage);
formData.append("camera", camera);
formData.append("battery", battery);
formData.append("display_screen", displayScreen);
formData.append("os", os);
formData.append("image", image);
formData.append("description", description);

axios.post(
    "http://localhost:5000/api/admin/phones",
    formData
)
        .then((res) => {

            alert(res.data.message);

            navigate("/admin");

        })
        .catch((err) => {

            console.log(err);

            alert("Thêm thất bại");

        });

    };

    return (

        <div className="container mt-5">

            <h2 className="mb-4">
                Thêm điện thoại
            </h2>

            <select
                className="form-control mb-3"
                value={brandId}
                onChange={(e) => setBrandId(e.target.value)}
            >
                <option value="1">Apple</option>
                <option value="2">Samsung</option>
                <option value="3">Xiaomi</option>
            </select>

            <input
                className="form-control mb-3"
                placeholder="Model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
            />

            <input
                className="form-control mb-3"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />

            <input
                className="form-control mb-3"
                placeholder="Processor"
                value={processor}
                onChange={(e) => setProcessor(e.target.value)}
            />

            <input
                className="form-control mb-3"
                placeholder="RAM"
                value={ram}
                onChange={(e) => setRam(e.target.value)}
            />

            <input
                className="form-control mb-3"
                placeholder="Storage"
                value={storage}
                onChange={(e) => setStorage(e.target.value)}
            />

            <input
                className="form-control mb-3"
                placeholder="Camera"
                value={camera}
                onChange={(e) => setCamera(e.target.value)}
            />

            <input
                className="form-control mb-3"
                placeholder="Battery"
                value={battery}
                onChange={(e) => setBattery(e.target.value)}
            />

            <input
                className="form-control mb-3"
                placeholder="Display"
                value={displayScreen}
                onChange={(e) => setDisplayScreen(e.target.value)}
            />

            <input
                className="form-control mb-3"
                placeholder="OS"
                value={os}
                onChange={(e) => setOs(e.target.value)}
            />

            <input
                type="file"
                className="form-control mb-3"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
            />

            <input
                className="form-control mb-3"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <button
                className="btn btn-success"
                onClick={handleSave}
            >
                Lưu điện thoại
            </button>

        </div>

    );

}

export default AddPhone;