import { useParams } from "react-router-dom";

const Payment = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Payment Success 🎉</h1>
      <p>Transaction ID: {id}</p>
    </div>
  );
};

export default Payment;
