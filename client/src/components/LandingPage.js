import { Link } from "react-router-dom";
import "../css/LandingPage.css"

export default function LandingPage() {
  return (
    // <section className="section">
      <div className="container-landing">
        <h1>Hi!, welcome to Dogs World</h1>
        <Link to={"/dogs"}>
          <button> More</button>
        </Link>
      </div>
    // </section>
  );
}
