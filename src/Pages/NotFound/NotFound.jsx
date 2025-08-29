import error from "./../../assets/images/error.svg";

export default function NotFound() {
  return (
    <div className="my-40">
      <img src={error} alt="error" className="mx-auto" />
    </div>
  );
}
