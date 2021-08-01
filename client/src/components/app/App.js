import "./App.css";
import { Switch, Route, NavLink } from "react-router-dom";
import HomePage from "../../pages/HomePage.js";
// import AboutPage from "../../pages/AboutPage.js";
import FavsPage from "../../pages/FavsPage.js";
import BooksPage from "../../pages/BooksPage.js";
import BookPage from "../../pages/BookPage.js";
// import BrandLogo from "../../assets/Rick-and-Morty-PNG-250x250.png";
import BrandLogo from "../../assets/2973980108_ed69085414_o.jpg";

function App() {
  return (
    <div className="App">
      <header className="App__header">
        <img id="app_logo" src={BrandLogo} className="BrandLogo" alt=""></img>

        <nav className="App__nav">
          <ul>
            <li>
              <NavLink className="NavLink" exact={true} to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className="NavLink" to="/books">
                Books
              </NavLink>
            </li>
            {/* <li>
              <NavLink className="NavLink" to="/about">
                About
              </NavLink>
            </li> */}
            <li>
              <NavLink className="NavLink" to="/favs">
                Favs
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/books/:id" component={BookPage} />
          <Route path="/books" component={BooksPage} />
          {/* <Route path="/about" component={AboutPage} /> */}
          <Route path="/favs" component={FavsPage} />
          <Route path="*">
            <h2>
              404 - Sorry, my friend of horror, but this page could not be
              found!
            </h2>
          </Route>
        </Switch>
      </main>
      <footer>
        <div>Made with love for books by Chris</div>
      </footer>
    </div>
  );
}

export default App;
