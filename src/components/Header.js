import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import Context from "../context/Context";
import ProfileIcon from "../images/profileIcon.svg";
import SearchIcon from "../images/searchIcon.svg";
import SearchBar from "./SearchBar";
import "./Header.css";

function Header({ name, title, search }) {
  const [searchBar, setSearchBar] = useState(false);
  const { setFilter, filter } = useContext(Context);
  const setSrc = (param) => {
    setFilter({ ...param, src: name });
  };

  const handleClick = () => {
    setSrc(filter);
    setSearchBar(!searchBar);
  };

  const searchButton = (bool) => {
    if (bool === true) {
      return (
        <button className="img-busca"  type="button" onClick={() => handleClick()}>
          <img
            className="img-busca-container"                          
            src={SearchIcon}
            alt="search button"
            data-testid="search-top-btn"
          />
        </button>
      );
    }
  };

  return (
    <header>
      <div className="container-nav">
        <Link to="/perfil">
          <Button type="button">
            <img              
              src={ProfileIcon}
              alt="profile button"
              data-testid="profile-top-btn"
            />
          </Button>
        </Link>
      </div>
      <h1 className="name-search" data-testid="page-title" name={name} id="header">
        {title}
      </h1>
      <div className="container-search">
        {searchButton(search)}
        <SearchBar display={searchBar} />
      </div>
    </header>
  );
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  search: PropTypes.bool.isRequired,
};

export default Header;
