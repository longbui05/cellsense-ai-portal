import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditPhone() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [brandId, setBrandId] = useState("");
    const [model, setModel] = useState("");
    const [price, setPrice] = useState("");
    const [processor, setProcessor] = useState("");
    const [ram, setRam] = useState("");
    const [storage, setStorage] = useState("");
    const [camera, setCamera] = useState("");
    const [battery, setBattery] = useState("");
    const [displayScreen, setDisplayScreen] = useState("");
    const [os, setOs] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);

    useEffect(() => {

        axios
            .get(`http://localhost:5000/api/phones/${id}`)
            .then((res) => {

                const p = res.data;

                setBrandId(p.brand_id);
                setModel(p.model);
                setPrice(p.price);
                setProcessor(p.processor);
                setRam(p.ram);
                setStorage(p.storage);
                setCamera(p.camera);
                setBattery(p.battery);
                setDisplayScreen(p.display_screen);
                setOs(p.os);
                setDescription(p.description);

            });

    }, []);
    const handleUpdate = () => {

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
    formData.append("description", description);

    if(image){

        formData.append("image", image);

    }

    axios.put(

        `http://localhost:5000/api/admin/phones/${id}`,

        formData

    )
    .then(()=>{

        alert("Cập nhật thành công");

        navigate("/admin");

    })
    .catch((err)=>{

        console.log(err);

        alert("Cập nhật thất bại");

    });

};

    return (

        <div className="container mt-5">

            <h2>Sửa điện thoại</h2>

            <input
                className="form-control mb-3"
                value={model}
                onChange={(e)=>setModel(e.target.value)}
            />

            <input
                className="form-control mb-3"
                value={price}
                onChange={(e)=>setPrice(e.target.value)}
            />

            <input
                className="form-control mb-3"
                value={ram}
                onChange={(e)=>setRam(e.target.value)}
            />

            <input
                className="form-control mb-3"
                value={storage}
                onChange={(e)=>setStorage(e.target.value)}
            />
            <input
    className="form-control mb-3"
    placeholder="Processor"
    value={processor}
    onChange={(e)=>setProcessor(e.target.value)}
/>

<input
    className="form-control mb-3"
    placeholder="Camera"
    value={camera}
    onChange={(e)=>setCamera(e.target.value)}
/>

<input
    className="form-control mb-3"
    placeholder="Battery"
    value={battery}
    onChange={(e)=>setBattery(e.target.value)}
/>

<input
    className="form-control mb-3"
    placeholder="Display"
    value={displayScreen}
    onChange={(e)=>setDisplayScreen(e.target.value)}
/>

<input
    className="form-control mb-3"
    placeholder="Operating System"
    value={os}
    onChange={(e)=>setOs(e.target.value)}
/>

<textarea
    className="form-control mb-3"
    placeholder="Description"
    value={description}
    onChange={(e)=>setDescription(e.target.value)}
/>

<input
    type="file"
    className="form-control mb-3"
    onChange={(e)=>setImage(e.target.files[0])}
/>
<button
    className="btn btn-primary"
    onClick={handleUpdate}
>
    Cập nhật
</button>

        </div>

    );

}

export default EditPhone;