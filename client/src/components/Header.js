import Search from "./Search"
import "../css/Header.css"

function Header() {
  return (
    <header className="main-container">
      <div>
        <h1>Dogs World</h1>
      </div>
      <Search />
    </header>
  );
}

export default Header;
