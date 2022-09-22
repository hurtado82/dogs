import "../css/LandingPage.css"
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <section className="section">
      <div className="container-landing">
        <h1>Hi!, welcome to Dogs World</h1>
        <Link to={"/dogs"}>
          <button> More</button>
        </Link>
      </div>
    </section>
  );
}
