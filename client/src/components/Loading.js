import "../css/Loading.css"
import loading from "../images/loading.gif";

export default function Loading() {
  return (
    <div className="loading">
      <img src={loading} alt="Loading" />
    </div>
  );
}
