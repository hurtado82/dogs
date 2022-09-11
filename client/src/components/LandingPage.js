import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <section>
      <div>
        <h1>Hi!, welcome to Dogs World</h1>
        <Link to={"/dogs"}>
          <button> More</button>
        </Link>
      </div>
    </section>
  );
}
