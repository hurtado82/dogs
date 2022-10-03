import "../css/Header.css"
import Search from "./Search"
import { Link } from "react-router-dom";

function Header({ select, clickOnSearch }) {
  return (
    <header className="main-container">
      <div>
        <h1>Dogs World</h1>
      </div>
      <Link to={"create"}>
        <button >Create</button>
      </Link>
      <Search
        select={select}
        clickOnSearch={clickOnSearch} />
    </header>
  );
}

export default Header;
