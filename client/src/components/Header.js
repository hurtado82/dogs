import "../css/Header.css"
import Search from "./Search"
import { Link } from "react-router-dom";

function Header({ select, clickOnSearch }) {
  return (
    <header className="main-container">
      <div className="title-container">
        <Link to={"/"}>  <h1 className="title-landing"> <span>Dogs</span> <span>World</span></h1></Link>
      </div>
      <Search
        select={select}
        clickOnSearch={clickOnSearch} />
    </header>
  );
}

export default Header;
