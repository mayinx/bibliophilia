import "./BookList.css";
import { useEffect, useState } from "react";
import Book from "./Book.js";
import { useScrollHandler } from "../../hooks/useScrollHandler.js";
import axios from "axios";

export default function BookList() {
  const pluralize = require("pluralize");

  const [resources, setResources] = useState([]);
  const [resourcesCount, setResourcesCount] = useState(0);
  const [totalPages, setTotalPages] = useState();
  // const [page, setPage] = useState(1);
  const [filterObject, setFilterObject] = useState({
    status: "",
    species: "",
    name: "",
    page: 1,
  });

  const [reloadDataSet, setReloadDataSet] = useState(true);

  // const [apiUrl, setApiUrl] = useState("");
  // const apiBaseUri = "https://rickandmortyapi.com/api/book";
  const apiBaseUri = "/api/books";

  // TODO: Refactor into custom hook 'useApiUrlCompiler' or similar
  function compileApiUri(baseUrl, filterObject) {
    let apiFilterParams = new URLSearchParams({});

    Object.entries(filterObject).forEach((filter) => {
      console.log("filter", filter);
      if (filter && filter[1]) {
        console.log("yo - filter thaat by: ", filter[0], filter[1]);
        apiFilterParams.append(filter[0], filter[1]);
      }
    });

    return apiFilterParams.toString()
      ? baseUrl + "/?" + apiFilterParams.toString()
      : baseUrl;
  }

  useEffect(() => {
    axios.get("/api/books").then((res) => {
      console.log(res.data);

      setResources((prevResources) => {
        if (reloadDataSet) {
          setReloadDataSet(false);
          return res.data || [];
        } else {
          return [...prevResources, ...(res.data || [])];
        }
      });
      // TODO!
      setTotalPages(res.data?.info?.pages || 1);
      setResourcesCount(res.data?.info?.count || 0);
    });

    // fetch(compileApiUri(apiBaseUri, filterObject))
    // axios
    //   .get("/api/books")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setResources((prevResources) => {
    //       if (reloadDataSet) {
    //         setReloadDataSet(false);
    //         return data?.results || [];
    //       } else {
    //         return [...prevResources, ...(data?.results || [])];
    //       }
    //     });
    //     setTotalPages(data?.info?.pages || 1);
    //     setResourcesCount(data?.info?.count || 0);
    //   })
    //   .catch((error) => console.log(error));
  }, [filterObject]);

  function renderResources() {
    return resources.map((book) => {
      return <Book book={book} as="ListItem" />;
    });
  }

  function handleLoadMore() {
    if (filterObject.page < totalPages) {
      setFilterObject({ ...filterObject, page: filterObject.page + 1 });
    }
  }

  // Custom Hook to determine if the filer bar should be sticky or not
  // const scroll = useScrollHandler(50, document.querySelector("main"));
  const scroll = useScrollHandler(
    50,
    "scrollTop",
    document.querySelector("main")
  );

  const filterBarClass = `ResourcesList__FilterBar BooksList__FilterBar ${
    scroll && "FilterBarSticky"
  }`;

  // uh - ah
  function handleFilterInputChange(e) {
    // console.log("fired filter + val:", e.target.name, e.target.value);
    setFilterObject({
      ...filterObject,
      [e.target.name]: e.target.value,
      page: 1,
    });

    setReloadDataSet(true);
  }

  // TODO: Extract ResourcesFilterBar-Component
  return (
    <section className="ResourcesList BookList">
      <div className={filterBarClass}>
        <div>
          <select
            id="status-filter"
            className="book-filter form-control"
            name="status"
            onChange={handleFilterInputChange}
          >
            <option select value="">
              -- all statuses --
            </option>
            <option value="Alive">Alive</option>
            <option value="Dead">Dead</option>
            <option value="Unknown">Unknown</option>
          </select>
          <select
            id="species-filter"
            className="book-filter form-control"
            name="species"
            onChange={handleFilterInputChange}
          >
            <option select value="">
              -- all species --
            </option>
            <option value="Human">Human</option>
            <option value="Alien">Alien</option>
          </select>
        </div>
        <div className="ListItemsCount">
          {pluralize("Book", Number(resourcesCount), true)}
        </div>
        <input
          id="name-filter"
          type="text"
          className="book-filter form-control"
          name="name"
          placeholder="Book name"
          onChange={handleFilterInputChange}
        />
      </div>
      <div className="ResourcesList__Items BooksList__Items">
        {renderResources()}
      </div>
      {filterObject.page < totalPages && (
        <button
          className="BooksList__LoadMoreButton btn green rounded"
          onClick={handleLoadMore}
        >
          Load more Books!
        </button>
      )}
    </section>
  );
}
