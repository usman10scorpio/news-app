import React, { useEffect, useState, useCallback } from "react";
import { IoCloseOutline } from "react-icons/io5";
import moment from "moment";
import {
  Button,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setQuery,
  setSource,
  fetchArticles,
  setDate,
  setCategory,
} from "../../store/slices/articlesSlice";
import { sources, newsCategories, capitalizeString } from "../../config/config";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./NavigationBar.css";
import debounce from "lodash.debounce";

function NavigationBar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPath = location.pathname;
  const isPagePersonalized = /\/personalized/.test(currentPath);

  const [searchInputValue, setSearchInputValue] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selectedSource, setSelectedSource] = useState(sources[0]);
  const [startDate, setStartDate] = useState(moment().format("YYYY-MM-DD"));
  const [selectedCategory, setSelectedCategory] = useState(newsCategories[0]);

  const isSearchButtonDisabled = searchInputValue.trim() === "";

  // Helper to dispatch multiple initial actions
  const initializeFilters = useCallback(() => {
    dispatch(setSource(selectedSource));
    dispatch(setDate(startDate));
    dispatch(setCategory(selectedCategory));
    dispatch(setQuery(""));
  }, [dispatch, selectedSource, startDate, selectedCategory]);

  // Fetch initial articles
  useEffect(() => {
    initializeFilters();
    dispatch(fetchArticles({ query: "", source: selectedSource.key, category: selectedCategory, date: startDate }));
  }, [initializeFilters, dispatch]);

  // Debounce for search input
  const debouncedSearch = debounce((query) => {
    dispatch(setQuery(query));
    dispatch(fetchArticles({ query, source: selectedSource.key, category: selectedCategory, date: startDate }));
  }, 300);

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchInputValue(value);
    debouncedSearch(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchArticles({ query: searchInputValue, source: selectedSource.key, category: selectedCategory, date: startDate }));
  };

  const handleSelectSource = (eventKey) => {
    const source = sources.find((item) => item.key === eventKey);
    if (source) {
      setSelectedSource(source);
      dispatch(setSource(source));
    }
  };

  const handleSelectCategory = (eventKey) => {
    const category = newsCategories.find((item) => item === eventKey);
    if (category) {
      setSelectedCategory(category);
      dispatch(setCategory(category));
    }
  };

  const handleDateChange = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    setStartDate(formattedDate);
    dispatch(setDate(formattedDate));
  };

  return (
    <Navbar className="navbar" variant="dark" expand="lg" fixed="top" expanded={!isCollapsed}>
      <Navbar.Brand className="nav-brand" href="/">
        <img
          src="https://seeklogo.com/images/S/svg-logo-A7D0801A11-seeklogo.com.png"
          alt="Logo"
          className="logo"
        />
      </Navbar.Brand>

      {isCollapsed ? (
        <Navbar.Toggle
          className="border-0"
          aria-controls="basic-navbar-nav"
          onClick={() => setIsCollapsed(false)}
        />
      ) : (
        <IoCloseOutline
          size={40}
          className="close-btn"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/" className={!isPagePersonalized ? "active" : ""}>
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/personalized" className={isPagePersonalized ? "active" : ""}>
            Personalized Feed
          </Nav.Link>
          <NavDropdown
            id="category-dropdown"
            title={capitalizeString(selectedCategory)}
            onSelect={handleSelectCategory}
          >
            {newsCategories.map((category, index) => (
              <NavDropdown.Item key={index} eventKey={category}>
                {capitalizeString(category)}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
          <NavDropdown
            id="source-dropdown"
            title={selectedSource.name}
            onSelect={handleSelectSource}
          >
            {sources.map((source, index) => (
              <NavDropdown.Item key={index} eventKey={source.key}>
                {source.name}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
        </Nav>

        <div className="date-picker">
          <DatePicker
            selected={moment(startDate, "YYYY-MM-DD").toDate()}
            onChange={handleDateChange}
          />
        </div>

        <Form className="search-form" onSubmit={handleSubmit}>
          <FormControl
            type="text"
            value={searchInputValue}
            onChange={handleSearchInputChange}
            placeholder="Explore news..."
            className="form-input color-white form-control-lg"
          />
          <Button
            type="submit"
            className="search-btn ml-2"
            disabled={isSearchButtonDisabled}
          >
            Search
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;
