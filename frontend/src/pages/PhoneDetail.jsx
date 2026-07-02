import { useParams } from "react-router-dom";

function PhoneDetail() {

  const { id } = useParams();

  return (
    <div className="container mt-5">
      <h2>Chi tiết điện thoại</h2>
      <p>ID: {id}</p>
    </div>
  );

}

export default PhoneDetail;